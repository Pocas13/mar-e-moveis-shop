import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function criarCategoria(nome: string, slug: string, subnomes: { nome: string; slug: string }[] = []) {
  const pai = await prisma.categoria.upsert({
    where: { slug },
    update: {},
    create: { nome, slug },
  });

  const subs = await Promise.all(
    subnomes.map((s) =>
      prisma.categoria.upsert({
        where: { slug: s.slug },
        update: {},
        create: { nome: s.nome, slug: s.slug, parentId: pai.id },
      })
    )
  );

  return { pai, subs };
}

async function main() {
  // Admin de exemplo — muda a password depois!
  const adminPasswordHash = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@marmoveis.pt" },
    update: {},
    create: {
      nome: "Administrador Mar e Móveis",
      email: "admin@marmoveis.pt",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
    },
  });

  const sofas = await criarCategoria("Sofás", "sofas", [
    { nome: "Sofás 2 Lugares", slug: "sofas-2-lugares" },
    { nome: "Sofás 3 Lugares", slug: "sofas-3-lugares" },
    { nome: "Cantos / Chaise Longue", slug: "cantos-chaise-longue" },
  ]);

  const cadeiras = await criarCategoria("Cadeiras", "cadeiras", [
    { nome: "Cadeiras de Jantar", slug: "cadeiras-jantar" },
    { nome: "Cadeiras Lounge", slug: "cadeiras-lounge" },
    { nome: "Cadeiras de Escritório", slug: "cadeiras-escritorio" },
  ]);

  const mesas = await criarCategoria("Mesas", "mesas", [
    { nome: "Mesas de Jantar", slug: "mesas-jantar" },
    { nome: "Mesas de Centro", slug: "mesas-centro" },
    { nome: "Mesas de Apoio", slug: "mesas-apoio" },
  ]);

  const camas = await criarCategoria("Camas", "camas", [
    { nome: "Cama de Casal", slug: "cama-casal" },
    { nome: "Cama de Solteiro", slug: "cama-solteiro" },
    { nome: "Camas Articuladas", slug: "camas-articuladas" },
  ]);

  await criarCategoria("Arrumação", "arrumacao", [
    { nome: "Roupeiros", slug: "roupeiros" },
    { nome: "Cómodas", slug: "comodas" },
    { nome: "Estantes e Bibliotecas", slug: "estantes-bibliotecas" },
  ]);

  await criarCategoria("Consolas e Móveis de TV", "consolas-moveis-tv", [
    { nome: "Consolas", slug: "consolas" },
    { nome: "Móveis de TV", slug: "moveis-tv" },
  ]);

  await criarCategoria("Iluminação", "iluminacao", [
    { nome: "Candeeiros de Pé", slug: "candeeiros-pe" },
    { nome: "Candeeiros de Mesa", slug: "candeeiros-mesa" },
    { nome: "Suspensões", slug: "suspensoes" },
  ]);

  await criarCategoria("Decoração", "decoracao", [
    { nome: "Espelhos", slug: "espelhos" },
    { nome: "Tapetes", slug: "tapetes" },
    { nome: "Têxteis", slug: "texteis" },
  ]);

  await prisma.produto.upsert({
    where: { sku: "SOF-001" },
    update: {},
    create: {
      nome: "Sofá Maré 3 Lugares",
      slug: "sofa-mare-3-lugares",
      descricao: "Sofá de 3 lugares em tecido bouclé, estrutura em madeira maciça de pinho.",
      sku: "SOF-001",
      categoriaId: sofas.subs[1].id,
      preco: 749.0,
      stock: 15,
      material: "Bouclé / Pinho maciço",
      largura_cm: 210,
      altura_cm: 85,
      profundidade_cm: 95,
      imagens: ["/placeholders/sofa.svg"],
    },
  });

  await prisma.produto.upsert({
    where: { sku: "CAD-001" },
    update: {},
    create: {
      nome: "Cadeira Lounge Brisa",
      slug: "cadeira-lounge-brisa",
      descricao: "Cadeira lounge com estrutura em carvalho e estofo em veludo.",
      sku: "CAD-001",
      categoriaId: cadeiras.subs[1].id,
      preco: 459.0,
      stock: 20,
      material: "Veludo / Carvalho",
      largura_cm: 75,
      altura_cm: 90,
      profundidade_cm: 80,
      imagens: ["/placeholders/cadeira-lounge.svg"],
    },
  });

  await prisma.produto.upsert({
    where: { sku: "MJT-001" },
    update: {},
    create: {
      nome: "Mesa de Jantar Costa",
      slug: "mesa-jantar-costa",
      descricao: "Mesa de jantar para 6 lugares, tampo em nogueira.",
      sku: "MJT-001",
      categoriaId: mesas.subs[0].id,
      preco: 990.0,
      stock: 8,
      material: "Nogueira",
      largura_cm: 200,
      altura_cm: 76,
      profundidade_cm: 100,
      imagens: ["/placeholders/mesa-jantar.svg"],
    },
  });

  await prisma.produto.upsert({
    where: { sku: "CAM-001" },
    update: {},
    create: {
      nome: "Cama Brisa Casal",
      slug: "cama-brisa-casal",
      descricao: "Cama de casal com cabeceira estofada, estrutura em madeira maciça.",
      sku: "CAM-001",
      categoriaId: camas.subs[0].id,
      preco: 590.0,
      stock: 10,
      material: "Tecido / Madeira maciça",
      largura_cm: 160,
      altura_cm: 120,
      profundidade_cm: 210,
      imagens: [],
    },
  });

  console.log("Seed concluído. Login admin: admin@marmoveis.pt / admin123");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
