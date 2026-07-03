import Link from "next/link";
import { Smile, Frown, Angry, Meh, Heart, Info } from "lucide-react";

export default async function MoodFeedbackPage({
  searchParams,
}: {
  searchParams: Promise<{ mood: string }>;
}) {
  const { mood } = await searchParams;

  const moodConfig: Record<string, { title: string; message: string; action: string; path: string; icon: any; color: string; bg: string }> = {
    senang: {
      title: "Luar Biasa! ✨",
      message: "Senang melihatmu merasa bahagia hari ini. Jaga semangat positif ini dan mungkin kamu bisa menuliskannya di jurnal agar tidak lupa momen manis ini.",
      action: "Tulis Jurnal",
      path: "/jurnal",
      icon: Heart,
      color: "text-green-soft",
      bg: "bg-green-soft/20",
    },
    netral: {
      title: "Semoga Harimu Damai 🍃",
      message: "Tidak ada emosi berlebih hari ini, dan itu sangat tidak apa-apa. Tetap jaga keseimbangan dirimu.",
      action: "Lanjut Jelajah",
      path: "/",
      icon: Meh,
      color: "text-purple-accent",
      bg: "bg-lavender-soft",
    },
    sedih: {
      title: "Tidak Apa-apa Merasa Sedih 🫂",
      message: "Kesedihan adalah emosi yang valid. Jangan dipendam sendirian. Apakah kamu mau mendengarkan musik relaksasi untuk sedikit menenangkan diri?",
      action: "Mulai Meditasi",
      path: "/meditasi",
      icon: Frown,
      color: "text-coral-soft",
      bg: "bg-coral-soft/20",
    },
    cemas: {
      title: "Tarik Napas Perlahan... 🌬️",
      message: "Kecemasan bisa terasa sangat berat. Mari kita luangkan waktu sejenak untuk menenangkan detak jantung dan merilekskan pikiran.",
      action: "Latihan Pernapasan",
      path: "/meditasi?type=breathe",
      icon: Smile, // Wait, Smile for Cemas? Let's use a different icon but just follow the previous page
      color: "text-yellow-soft",
      bg: "bg-yellow-soft/20",
    },
    marah: {
      title: "Keluarkan Secara Sehat 🌋",
      message: "Wajar jika kamu merasa marah. Coba tuangkan segala kekesalanmu di ruang jurnal privat tanpa takut dihakimi.",
      action: "Tulis Jurnal",
      path: "/jurnal",
      icon: Angry,
      color: "text-coral-soft",
      bg: "bg-coral-soft/20",
    },
  };

  const config = moodConfig[mood] || moodConfig["netral"];
  const Icon = config.icon;

  return (
    <div className="p-6 min-h-screen flex flex-col items-center justify-center text-center">
      <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 mx-auto ${config.bg} ${config.color}`}>
        <Icon size={56} />
      </div>
      
      <h1 className="text-2xl font-bold mb-4">{config.title}</h1>
      <p className="text-text-secondary mb-8 leading-relaxed max-w-sm">
        {config.message}
      </p>

      <div className="w-full max-w-xs space-y-3">
        <Link 
          href={config.path}
          className="block w-full bg-purple-accent text-white py-4 rounded-full font-semibold hover:bg-purple-accent/90 transition"
        >
          {config.action}
        </Link>
        <Link 
          href="/"
          className="block w-full bg-neutral-bg border border-lavender-soft text-purple-accent py-4 rounded-full font-semibold hover:bg-lavender-soft/30 transition"
        >
          Kembali ke Beranda
        </Link>
      </div>

      {(mood === "sedih" || mood === "cemas" || mood === "marah") && (
        <div className="mt-8 flex items-start space-x-2 bg-yellow-soft/10 p-4 rounded-2xl text-left border border-yellow-soft/30 max-w-sm">
          <Info size={20} className="text-yellow-soft flex-shrink-0 mt-0.5" />
          <p className="text-xs text-text-secondary">
            Jika kamu merasa tidak bisa menangani ini sendirian, jangan ragu untuk mencari bantuan profesional di menu <Link href="/konsultasi" className="font-semibold text-purple-accent">Konsultasi</Link>.
          </p>
        </div>
      )}
    </div>
  );
}
