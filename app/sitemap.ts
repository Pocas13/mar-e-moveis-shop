import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3004";
  const produtos = await prisma.produto.findMany({ where: { ativo: true }, select: { slug: true, updatedAt: true } });
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/entregas`, changeFrequency: "monthly", priority: .5 },
    { url: `${base}/trocas-e-devolucoes`, changeFrequency: "monthly", priority: .5 },
    ...produtos.map((p) => ({ url: `${base}/produtos/${p.slug}`, lastModified: p.updatedAt, changeFrequency: "weekly" as const, priority: .8 })),
  ];
}
