import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const DE = process.env.EMAIL_FROM ?? "Mar e Móveis <onboarding@resend.dev>";

/**
 * Envio de emails transacionais. Precisa de RESEND_API_KEY no .env
 * (cria conta grátis em https://resend.com). Em dev, sem chave configurada,
 * os envios falham silenciosamente e ficam só registados na consola.
 */
async function enviar(destinatario: string, assunto: string, html: string) {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[email não enviado — falta RESEND_API_KEY] para ${destinatario}: ${assunto}`);
    return;
  }
  await resend.emails.send({ from: DE, to: destinatario, subject: assunto, html });
}

export async function emailConfirmacaoEncomenda(email: string, numeroEncomenda: string) {
  await enviar(
    email,
    `Encomenda ${numeroEncomenda} confirmada`,
    `<p>Recebemos o teu pagamento. A encomenda <strong>${numeroEncomenda}</strong> está a ser preparada.</p>`
  );
}

export async function emailMudancaEstadoEncomenda(email: string, numeroEncomenda: string, estado: string) {
  await enviar(
    email,
    `Encomenda ${numeroEncomenda}: atualização`,
    `<p>O estado da tua encomenda <strong>${numeroEncomenda}</strong> mudou para: <strong>${estado}</strong>.</p>`
  );
}
