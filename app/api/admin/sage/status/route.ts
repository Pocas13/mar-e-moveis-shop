import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== "ADMIN") return NextResponse.json({ erro: "Não autorizado" }, { status: 401 });
  return NextResponse.json({
    configurado: Boolean(process.env.SAGE_ACCESS_TOKEN && process.env.SAGE_SIGNING_SECRET),
    accessToken: Boolean(process.env.SAGE_ACCESS_TOKEN),
    signingSecret: Boolean(process.env.SAGE_SIGNING_SECRET),
    modo: process.env.SAGE_MODE || "desativado",
  });
}
