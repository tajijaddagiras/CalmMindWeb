import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { User, TrendingUp, BookOpen, Star, LogOut, ChevronRight } from "lucide-react";

export default async function ProfilPage() {
  const session = await getSession();
  if (!session?.userId) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      _count: {
        select: {
          moodChecks: true,
          journals: true,
          savedArticles: true,
        },
      },
    },
  });

  if (!user) redirect("/login");

  const recentMoods = await prisma.moodCheck.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
    take: 7,
    select: { mood: true, createdAt: true },
  });

  const moodEmoji: Record<string, string> = {
    senang: "😊",
    netral: "😐",
    sedih: "😢",
    cemas: "😰",
    marah: "😠",
  };

  const joinedDate = new Date(user.createdAt).toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="p-6 min-h-screen">
      {/* Header Profile */}
      <div className="flex flex-col items-center mt-6 mb-8">
        <div className="w-20 h-20 bg-lavender-soft rounded-full flex items-center justify-center mb-4">
          <User size={36} className="text-purple-accent" />
        </div>
        <h1 className="text-xl font-bold text-text-main">{user.name || "Pengguna"}</h1>
        <p className="text-sm text-text-secondary mt-1">{user.email}</p>
        <p className="text-xs text-text-secondary mt-1">Bergabung sejak {joinedDate}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="bg-lavender-soft/30 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-purple-accent">{user._count.moodChecks}</p>
          <p className="text-xs text-text-secondary mt-1">Mood Check</p>
        </div>
        <div className="bg-lavender-soft/30 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-purple-accent">{user._count.journals}</p>
          <p className="text-xs text-text-secondary mt-1">Jurnal</p>
        </div>
        <div className="bg-lavender-soft/30 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-purple-accent">{user._count.savedArticles}</p>
          <p className="text-xs text-text-secondary mt-1">Artikel Tersimpan</p>
        </div>
      </div>

      {/* Recent Mood Timeline */}
      {recentMoods.length > 0 && (
        <div className="bg-white border border-lavender-soft/50 rounded-2xl p-5 mb-6 shadow-sm">
          <h3 className="font-semibold text-sm flex items-center mb-4">
            <TrendingUp size={16} className="mr-2 text-purple-accent" />
            Mood 7 Hari Terakhir
          </h3>
          <div className="flex items-end space-x-2 overflow-x-auto scrollbar-hide pb-1">
            {recentMoods.reverse().map((m, i) => (
              <div key={i} className="flex flex-col items-center flex-shrink-0">
                <span className="text-2xl">{moodEmoji[m.mood] || "😐"}</span>
                <span className="text-xs text-text-secondary mt-1">
                  {new Date(m.createdAt).toLocaleDateString("id-ID", { weekday: "short" })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Menu */}
      <div className="bg-white border border-lavender-soft/50 rounded-2xl overflow-hidden shadow-sm mb-6">
        <Link href="/artikel?saved=true" className="w-full flex items-center justify-between p-4 border-b border-lavender-soft/30 hover:bg-lavender-soft/10 transition">
          <div className="flex items-center space-x-3">
            <BookOpen size={20} className="text-purple-accent" />
            <span className="text-sm font-medium text-text-main">Artikel Tersimpan</span>
          </div>
          <ChevronRight size={16} className="text-text-secondary" />
        </Link>
        <Link href="/konsultasi?history=true" className="w-full flex items-center justify-between p-4 hover:bg-lavender-soft/10 transition">
          <div className="flex items-center space-x-3">
            <Star size={20} className="text-purple-accent" />
            <span className="text-sm font-medium text-text-main">Riwayat Konsultasi</span>
          </div>
          <ChevronRight size={16} className="text-text-secondary" />
        </Link>
      </div>

      {/* Logout */}
      <form action={logout}>
        <button
          type="submit"
          className="w-full flex items-center justify-center space-x-2 bg-coral-soft/10 text-coral-soft border border-coral-soft/30 py-4 rounded-full font-semibold hover:bg-coral-soft/20 transition"
        >
          <LogOut size={18} />
          <span>Keluar</span>
        </button>
      </form>
    </div>
  );
}
