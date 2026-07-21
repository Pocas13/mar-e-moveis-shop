export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { requireStripe } from "@/lib/stripe";
import { cotacaoEstimativaDHL } from "@/lib/integracoes/dhl/shipping";

const checkoutSchema = z.object({
  clienteNome: z.string().trim().min(2).max(160),
  clienteEmail: z.string().trim().email(),
  clienteTelefone: z.string().trim().min(6).max(40),
  moradaEntrega: z.string().trim().min(5),
  cidade: z.string().trim().min(2),
  codigoPostal: z.string().regex(/^\d{4}-\d{3}$/),
  nifFatura: z.string().trim().max(20).optional(),
  metodoEntrega: z.enum(["LEVANTAMENTO", "ENTREGA_LOJA", "TRANSPORTADORA"]),
  metodoPagamento: z.enum(["CARTAO", "MBWAY", "MULTIBANCO"]).default("CARTAO"),
  aceitouTermos: z.literal(true),
});

export async function POST(req: Request) {
  let encomendaId: string | undefined;
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ erro: "Não autenticado." }, { status: 401 });
    if (!process.env.STRIPE_SECRET_KEY?.trim()) return NextResponse.json({ erro: "O pagamento Stripe ainda não está configurado." }, { status: 503 });
    const stripe = requireStripe();

    const dados = checkoutSchema.parse(await req.json());
    const userId = (session.user as { id: string }).id;
    const itens = await prisma.carrinhoItem.findMany({ where: { userId }, include: { produto: true } });
    if (!itens.length) return NextResponse.json({ erro: "O carrinho está vazio." }, { status: 400 });

    const indisponivel = itens.find(item => !item.produto.ativo || item.produto.stock < item.quantidade);
    if (indisponivel) return NextResponse.json({ erro: `Stock insuficiente para ${indisponivel.produto.nome}. Atualize o carrinho.` }, { status: 409 });

    const subtotal = itens.reduce((soma, item) => soma + Number(item.produto.preco) * item.quantidade, 0);
    let portes = 0;
    let descricaoPortes = "Levantamento no ponto Mar e Móveis";

    if (dados.metodoEntrega === "TRANSPORTADORA") {
      const volumes = itens.map(item => ({
        pesoKg: item.produto.pesoKg ?? 10,
        comprimentoCm: item.produto.largura_cm ?? 80,
        larguraCm: item.produto.profundidade_cm ?? 60,
        alturaCm: item.produto.altura_cm ?? 60,
      }));
      portes = cotacaoEstimativaDHL(dados.codigoPostal, volumes, false).preco;
      descricaoPortes = "Envio por transportadora";
    } else if (dados.metodoEntrega === "ENTREGA_LOJA") {
      // Valor provisório até ser definida a tabela comercial por zona.
      portes = 0;
      descricaoPortes = "Entrega pela equipa Mar e Móveis (custo provisório)";
    }

    const numero = `ENC-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    const encomenda = await prisma.$transaction(async tx => {
      await tx.user.update({
        where: { id: userId },
        data: { nome: dados.clienteNome, email: dados.clienteEmail.toLowerCase(), telefone: dados.clienteTelefone, nif: dados.nifFatura || undefined },
      });
      return tx.encomenda.create({
        data: {
          numero, userId, subtotal, portes, desconto: 0, total: subtotal + portes,
          clienteNome: dados.clienteNome,
          clienteEmail: dados.clienteEmail.toLowerCase(),
          clienteTelefone: dados.clienteTelefone,
          metodoEntrega: dados.metodoEntrega,
          moradaEntrega: `${dados.moradaEntrega} | ${dados.codigoPostal} ${dados.cidade}`,
          nifFatura: dados.nifFatura || undefined,
          metodoPagamento: dados.metodoPagamento,
          itens: { create: itens.map(item => ({ produtoId: item.produtoId, quantidade: item.quantidade, precoUnitario: item.produto.preco })) },
        },
      });
    });
    encomendaId = encomenda.id;

    const paymentMethodTypes = dados.metodoPagamento === "MBWAY" ? (["mb_way"] as const) : dados.metodoPagamento === "MULTIBANCO" ? (["multibanco"] as const) : (["card"] as const);
    const siteUrl = process.env.NEXTAUTH_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3004";
    const lineItems = itens.map(item => ({
      price_data: { currency: "eur", product_data: { name: item.produto.nome }, unit_amount: Math.round(Number(item.produto.preco) * 100) },
      quantity: item.quantidade,
    }));
    if (portes > 0) lineItems.push({ price_data: { currency: "eur", product_data: { name: descricaoPortes }, unit_amount: Math.round(portes * 100) }, quantity: 1 });

    const checkout = await stripe.checkout.sessions.create({
      mode: "payment", payment_method_types: [...paymentMethodTypes], line_items: lineItems,
      metadata: { encomendaId: encomenda.id, metodoEntrega: dados.metodoEntrega },
      customer_email: dados.clienteEmail,
      success_url: `${siteUrl}/checkout/sucesso?encomenda=${encomenda.numero}`,
      cancel_url: `${siteUrl}/checkout`,
    });
    if (!checkout.url) throw new Error("O Stripe não devolveu um endereço de pagamento.");
    return NextResponse.json({ url: checkout.url });
  } catch (erro) {
    if (encomendaId) await prisma.encomenda.delete({ where: { id: encomendaId } }).catch(() => undefined);
    console.error("Erro ao iniciar checkout", erro);
    if (erro instanceof z.ZodError) return NextResponse.json({ erro: "Confirme os dados pessoais, a entrega e a aceitação dos termos." }, { status: 400 });
    return NextResponse.json({ erro: erro instanceof Error ? erro.message : "Erro no checkout." }, { status: 400 });
  }
}
