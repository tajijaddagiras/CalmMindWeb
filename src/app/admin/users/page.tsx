import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AdminUsers() {
  const session = await getSession();
  if (!session?.userId || session.role !== "ADMIN") redirect("/");

  const users = await prisma.user.findMany({
    where: { role: "USER" },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { moodChecks: true, journals: true } },
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Data Pengguna</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Nama</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-center">Mood Check</th>
              <th className="px-6 py-3 text-center">Jurnal</th>
              <th className="px-6 py-3 text-left">Bergabung</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-400">Belum ada pengguna.</td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-medium text-gray-800">{u.name || "—"}</td>
                  <td className="px-6 py-4 text-gray-500">{u.email}</td>
                  <td className="px-6 py-4 text-center">{u._count.moodChecks}</td>
                  <td className="px-6 py-4 text-center">{u._count.journals}</td>
                  <td className="px-6 py-4 text-gray-400">
                    {new Date(u.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
