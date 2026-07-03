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
    <div className="p-6">
      <h2 className="text-2xl font-bold text-text-main mb-6">Data Pengguna</h2>
      <div className="space-y-4">
        {users.length === 0 ? (
          <p className="text-sm text-text-secondary text-center py-8">Belum ada pengguna.</p>
        ) : (
          users.map((u) => (
            <div key={u.id} className="bg-white rounded-2xl shadow-sm border border-lavender-soft/50 p-5">
              <div className="flex items-center space-x-3 mb-3 pb-3 border-b border-lavender-soft/30">
                <div className="w-10 h-10 bg-lavender-soft rounded-full flex items-center justify-center text-sm font-bold text-purple-accent flex-shrink-0">
                  {(u.name || u.email).charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-text-main truncate">{u.name || "—"}</p>
                  <p className="text-xs text-text-secondary truncate">{u.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-neutral-bg p-2 rounded-lg text-center">
                  <p className="text-text-secondary">Mood Check</p>
                  <p className="font-semibold text-text-main">{u._count.moodChecks}</p>
                </div>
                <div className="bg-neutral-bg p-2 rounded-lg text-center">
                  <p className="text-text-secondary">Jurnal</p>
                  <p className="font-semibold text-text-main">{u._count.journals}</p>
                </div>
              </div>
              <p className="text-[10px] text-text-secondary mt-3 text-center">
                Bergabung: {new Date(u.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric", month: "long", year: "numeric",
                })}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
