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
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard Admin</h2>
          <p className="text-sm text-gray-500 mt-1">Ringkasan sistem CalmMind</p>
        </div>
        <form action={logout}>
          <button type="submit" className="flex items-center space-x-2 text-sm text-coral-soft hover:bg-red-50 px-4 py-2 rounded-lg transition">
            <LogOut size={16} />
            <span>Keluar</span>
          </button>
        </form>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-2">{s.label}</p>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-700 mb-4 flex items-center">
            <Users size={18} className="mr-2 text-purple-accent" />
            Pengguna Terbaru
          </h3>
          {recentUsers.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">Belum ada pengguna.</p>
          ) : (
            <div className="space-y-3">
              {recentUsers.map((u) => (
                <div key={u.id} className="flex items-center space-x-3">
                  <div className="w-9 h-9 bg-lavender-soft rounded-full flex items-center justify-center text-sm font-bold text-purple-accent">
                    {(u.name || u.email).charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{u.name || "—"}</p>
                    <p className="text-xs text-gray-400">{u.email}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-700 mb-4 flex items-center">
            <Activity size={18} className="mr-2 text-purple-accent" />
            Pengelolaan Data
          </h3>
          <div className="space-y-2">
            <Link href="/admin/users" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition text-sm text-gray-700">
              <Users size={16} className="text-purple-accent" />
              <span>Kelola Pengguna</span>
            </Link>
            <Link href="/admin/artikel" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition text-sm text-gray-700">
              <BookOpen size={16} className="text-purple-accent" />
              <span>Kelola Artikel</span>
            </Link>
            <Link href="/admin/psikolog" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition text-sm text-gray-700">
              <ShieldAlert size={16} className="text-purple-accent" />
              <span>Kelola Psikolog</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
