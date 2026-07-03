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
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Kelola Artikel</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Judul</th>
              <th className="px-6 py-3 text-left">Kategori</th>
              <th className="px-6 py-3 text-center">Disimpan</th>
              <th className="px-6 py-3 text-left">Tanggal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {articles.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4 font-medium text-gray-800 max-w-xs truncate">{a.title}</td>
                <td className="px-6 py-4">
                  <span className="bg-lavender-soft text-purple-accent text-xs px-2 py-1 rounded-full font-medium">{a.category}</span>
                </td>
                <td className="px-6 py-4 text-center">{a._count.savedBy}</td>
                <td className="px-6 py-4 text-gray-400">
                  {new Date(a.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
