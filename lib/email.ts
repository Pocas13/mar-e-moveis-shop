import { Resend } from "resend";

const REMETENTE =
  process.env.EMAIL_FROM ?? "Mar e Móveis <onboarding@resend.dev>";

/**
 * Envio de emails transacionais.
 * Em desenvolvimento, quando RESEND_API_KEY não está configurada, o envio é
 * ignorado sem impedir o arranque ou a compilação da aplicação.
 */
async function enviar(destinatario: string, assunto: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.info(
      `[email não enviado — falta RESEND_API_KEY] para ${destinatario}: ${assunto}`,
    );
    return { enviado: false as const };
  }

  const resend = new Resend(apiKey);
  const resposta = await resend.emails.send({
    from: REMETENTE,
    to: destinatario,
    subject: assunto,
    html,
  });

  return { enviado: true as const, resposta };
}

export async function emailConfirmacaoEncomenda(
  email: string,
  numeroEncomenda: string,
) {
  return enviar(
    email,
    `Encomenda ${numeroEncomenda} confirmada`,
    `<p>Recebemos o teu pagamento. A encomenda <strong>${numeroEncomenda}</strong> está a ser preparada.</p>`,
  );
}

export async function emailMudancaEstadoEncomenda(
  email: string,
  numeroEncomenda: string,
  estado: string,
) {
  return enviar(
    email,
    `Encomenda ${numeroEncomenda}: atualização`,
    `<p>O estado da tua encomenda <strong>${numeroEncomenda}</strong> mudou para: <strong>${estado}</strong>.</p>`,
  );
}
