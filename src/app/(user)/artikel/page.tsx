import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import ArtikelClient from "./ArtikelClient";

export default async function ArtikelPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string; saved?: string }>;
}) {
  const session = await getSession();
  if (!session?.userId) redirect("/login");

  const { category, q, saved } = await searchParams;

  const savedArticles = await prisma.savedArticle.findMany({
    where: { userId: session.userId },
    select: { articleId: true },
  });

  const savedIds = savedArticles.map((s) => s.articleId);

  const articles = await prisma.article.findMany({
    where: {
      ...(category ? { category } : {}),
      ...(q ? { title: { contains: q, mode: "insensitive" } } : {}),
      ...(saved === "true" ? { id: { in: savedIds } } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  const categories = ["Overthinking", "Manajemen Stres", "Pengembangan Diri"];

  return (
    <ArtikelClient
      articles={articles}
      savedIds={savedIds}
      categories={categories}
      activeCategory={category || ""}
      searchQuery={q || ""}
      showOnlySaved={saved === "true"}
    />
  );
}
