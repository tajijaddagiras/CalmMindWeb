import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Users, BookOpen, Activity, LogOut, ShieldAlert } from "lucide-react";
import { logout } from "@/app/actions/auth";

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session?.userId || session.role !== "ADMIN") redirect("/");

  const [userCount, moodCount, journalCount, articleCount, psychoCount, postCount] =
    await Promise.all([
      prisma.user.count({ where: { role: "USER" } }),
      prisma.moodCheck.count(),
      prisma.journalEntry.count(),
      prisma.article.count(),
      prisma.psychologist.count(),
      prisma.communityPost.count(),
    ]);

  const recentUsers = await prisma.user.findMany({
    where: { role: "USER" },
    orderBy: { createdAt: "desc" },
    take: 5,
    select: { id: true, name: true, email: true, createdAt: true },
  });

  const stats = [
    { label: "Total Pengguna", value: userCount, color: "text-purple-accent" },
    { label: "Mood Check", value: moodCount, color: "text-green-soft" },
    { label: "Jurnal", value: journalCount, color: "text-yellow-soft" },
    { label: "Artikel", value: articleCount, color: "text-purple-accent" },
    { label: "Psikolog", value: psychoCount, color: "text-green-soft" },
    { label: "Post Komunitas", value: postCount, color: "text-coral-soft" },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-text-main">Dashboard Admin</h2>
          <p className="text-sm text-text-secondary mt-1">Ringkasan sistem CalmMind</p>
        </div>
        <form action={logout}>
          <button type="submit" className="flex items-center space-x-1 text-xs text-coral-soft hover:bg-coral-soft/10 px-3 py-2 rounded-lg transition border border-coral-soft/30">
            <LogOut size={14} />
            <span>Keluar</span>
          </button>
        </form>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-lavender-soft/20 p-4 rounded-2xl border border-lavender-soft/50 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-text-secondary mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {/* Recent Users */}
        <div className="bg-white rounded-2xl shadow-sm border border-lavender-soft/50 p-5">
          <h3 className="font-bold text-sm text-text-main mb-4 flex items-center">
            <Users size={16} className="mr-2 text-purple-accent" />
            Pengguna Terbaru
          </h3>
          {recentUsers.length === 0 ? (
            <p className="text-xs text-text-secondary text-center py-2">Belum ada pengguna.</p>
          ) : (
            <div className="space-y-4">
              {recentUsers.map((u) => (
                <div key={u.id} className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-lavender-soft rounded-full flex items-center justify-center text-sm font-bold text-purple-accent flex-shrink-0">
                    {(u.name || u.email).charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text-main truncate">{u.name || "—"}</p>
                    <p className="text-xs text-text-secondary truncate">{u.email}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-2xl shadow-sm border border-lavender-soft/50 p-5">
          <h3 className="font-bold text-sm text-text-main mb-3 flex items-center">
            <Activity size={16} className="mr-2 text-purple-accent" />
            Akses Cepat
          </h3>
          <div className="space-y-2">
            <Link href="/admin/users" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-lavender-soft/20 transition text-sm text-text-main font-medium border border-transparent hover:border-lavender-soft/50">
              <Users size={18} className="text-purple-accent" />
              <span>Kelola Pengguna</span>
            </Link>
            <Link href="/admin/artikel" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-lavender-soft/20 transition text-sm text-text-main font-medium border border-transparent hover:border-lavender-soft/50">
              <BookOpen size={18} className="text-purple-accent" />
              <span>Kelola Artikel</span>
            </Link>
            <Link href="/admin/psikolog" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-lavender-soft/20 transition text-sm text-text-main font-medium border border-transparent hover:border-lavender-soft/50">
              <ShieldAlert size={18} className="text-purple-accent" />
              <span>Kelola Psikolog</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
