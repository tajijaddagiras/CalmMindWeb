import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Smile, BookHeart, Headphones, FileText, UsersRound, Stethoscope, Phone } from "lucide-react";

const menus = [
  { name: "Mood Check", path: "/mood-check", icon: Smile },
  { name: "Jurnal Harian", path: "/jurnal", icon: BookHeart },
  { name: "Meditasi", path: "/meditasi", icon: Headphones },
  { name: "Artikel", path: "/artikel", icon: FileText },
  { name: "Calm Circle", path: "/calm-circle", icon: UsersRound },
  { name: "Konsultasi", path: "/konsultasi", icon: Stethoscope },
];

export default async function Home() {
  const session = await getSession();
  if (!session?.userId) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { name: true },
  });

  const latestMood = await prisma.moodCheck.findFirst({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
    select: { mood: true, createdAt: true },
  });

  const moodGreeting: Record<string, string> = {
    senang: "Senang melihatmu bahagia hari ini! 😊",
    netral: "Semoga harimu menyenangkan ya! 🍃",
    sedih: "Tidak apa-apa merasa sedih, kamu tidak sendiri 🫂",
    cemas: "Tarik napas pelan-pelan, semuanya akan baik-baik saja 🌬️",
    marah: "Wajar jika kamu merasa marah, luapkan secara sehat ya 💙",
  };

  const isToday =
    latestMood &&
    new Date(latestMood.createdAt).toDateString() === new Date().toDateString();

  return (
    <div className="p-6">
      {/* Header */}
      <header className="mb-6 mt-4">
        <h1 className="text-2xl font-semibold text-text-main">
          Halo, {user?.name?.split(" ")[0] || "Teman"} 👋
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          {isToday && latestMood
            ? moodGreeting[latestMood.mood] || "Bagaimana perasaanmu hari ini?"
            : "Bagaimana perasaanmu hari ini?"}
        </p>
      </header>

      {/* Hero Banner */}
      {!isToday ? (
        <Link
          href="/mood-check"
          className="block bg-lavender-soft rounded-3xl p-5 mb-8 flex items-center justify-between shadow-sm hover:shadow-md transition"
        >
          <div>
            <h2 className="font-semibold text-lg mb-1">Cek Perasaanmu</h2>
            <p className="text-sm text-text-secondary mb-3 max-w-[180px]">
              Luangkan 1 menit untuk refleksi diri hari ini.
            </p>
            <span className="inline-block bg-purple-accent text-white px-4 py-2 rounded-full text-sm font-medium">
              Mulai Sekarang →
            </span>
          </div>
          <div className="w-20 h-20 bg-lavender-primary/30 rounded-full flex items-center justify-center flex-shrink-0">
            <Smile size={40} className="text-purple-accent" />
          </div>
        </Link>
      ) : (
        <div className="bg-green-soft/20 border border-green-soft/40 rounded-3xl p-5 mb-8">
          <p className="text-sm font-semibold text-text-main">✅ Mood Check Selesai Hari Ini</p>
          <p className="text-xs text-text-secondary mt-1">
            Kamu sudah cek mood hari ini. Lanjut eksplorasi fitur lainnya!
          </p>
        </div>
      )}

      {/* Hotline Banner */}
      <div className="bg-coral-soft/10 border border-coral-soft/30 rounded-2xl p-4 mb-8 flex items-center space-x-3">
        <Phone size={18} className="text-coral-soft flex-shrink-0" />
        <div>
          <p className="text-xs font-semibold text-text-main">Butuh Bantuan Darurat?</p>
          <p className="text-xs text-text-secondary">
            Hubungi Into The Light Indonesia: <span className="font-semibold">119 ext 8</span>
          </p>
        </div>
      </div>

      {/* Menu Grid */}
      <section>
        <h3 className="font-semibold text-lg mb-4">Eksplorasi</h3>
        <div className="grid grid-cols-2 gap-4">
          {menus.map((menu) => {
            const Icon = menu.icon;
            return (
              <Link
                key={menu.name}
                href={menu.path}
                className="flex flex-col items-center justify-center bg-neutral-bg border border-lavender-soft/50 rounded-3xl p-5 transition-transform hover:scale-105 active:scale-95"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm text-purple-accent">
                  <Icon size={24} />
                </div>
                <span className="text-sm font-medium text-center text-text-main">{menu.name}</span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
