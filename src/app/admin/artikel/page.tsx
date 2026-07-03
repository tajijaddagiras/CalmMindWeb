import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

import ArtikelAdminClient from "./ArtikelAdminClient";

export default async function AdminArtikel() {
  const session = await getSession();
  if (!session?.userId || session.role !== "ADMIN") redirect("/");

  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { savedBy: true } } },
  });

  return <ArtikelAdminClient articles={articles} />;
}
