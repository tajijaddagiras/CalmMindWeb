import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import ArtikelClient from "./ArtikelClient";

export default async function ArtikelPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const session = await getSession();
  if (!session?.userId) redirect("/login");

  const { category, q } = await searchParams;

  const [articles, savedArticles] = await Promise.all([
    prisma.article.findMany({
      where: {
        ...(category ? { category } : {}),
        ...(q ? { title: { contains: q, mode: "insensitive" } } : {}),
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.savedArticle.findMany({
      where: { userId: session.userId },
      select: { articleId: true },
    }),
  ]);

  const savedIds = new Set(savedArticles.map((s) => s.articleId));
  const categories = ["Overthinking", "Manajemen Stres", "Pengembangan Diri"];

  return (
    <ArtikelClient
      articles={articles}
      savedIds={[...savedIds]}
      categories={categories}
      activeCategory={category || ""}
      searchQuery={q || ""}
    />
  );
}
