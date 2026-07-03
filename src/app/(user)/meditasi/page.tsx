import Link from "next/link";
import { Music, Wind, ChevronLeft } from "lucide-react";

export default function MeditasiPage() {
  return (
    <div className="p-6 min-h-screen flex flex-col">
      <header className="mb-8 mt-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Meditasi</h1>
      </header>

      <div className="flex-1 space-y-6">
        <Link 
          href="/meditasi/breathe"
          className="block w-full bg-lavender-soft/30 border border-lavender-soft p-6 rounded-3xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
            <Wind size={28} className="text-purple-accent" />
          </div>
          <h2 className="font-semibold text-lg mb-1">Panduan Pernapasan</h2>
          <p className="text-sm text-text-secondary">Latihan napas 4-7-8 untuk menenangkan pikiran dan meredakan panik.</p>
        </Link>

        <Link
          href="/meditasi/musik"
          className="block w-full bg-lavender-soft/20 border border-lavender-soft p-6 rounded-3xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
            <Music size={28} className="text-purple-accent" />
          </div>
          <h2 className="font-semibold text-lg mb-1">Terapi Musik</h2>
          <p className="text-sm text-text-secondary">Dengarkan piano akustik, hujan, dan suara alam untuk relaksasi.</p>
        </Link>
      </div>
    </div>
  );
}
