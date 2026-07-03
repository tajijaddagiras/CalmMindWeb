import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AdminArtikel() {
  const session = await getSession();
  if (!session?.userId || session.role !== "ADMIN") redirect("/");

  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { savedBy: true } } },
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-text-main mb-6">Kelola Artikel</h2>
      <div className="space-y-4">
        {articles.length === 0 ? (
          <p className="text-sm text-text-secondary text-center py-8">Belum ada artikel.</p>
        ) : (
          articles.map((a) => (
            <div key={a.id} className="bg-white rounded-2xl shadow-sm border border-lavender-soft/50 p-5">
              <span className="bg-lavender-soft text-purple-accent text-[10px] px-2 py-1 rounded-full font-semibold">
                {a.category}
              </span>
              <h3 className="font-semibold text-text-main mt-2 mb-1">{a.title}</h3>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-lavender-soft/30 text-xs text-text-secondary">
                <span>Disimpan: <strong className="text-purple-accent">{a._count.savedBy}x</strong></span>
                <span>
                  {new Date(a.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
