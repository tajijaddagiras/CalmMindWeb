"use client";

import { useState, useActionState, useEffect } from "react";
import { saveJournal } from "@/app/actions/journal";
import { PenTool, ChevronLeft, Calendar, FileText } from "lucide-react";
import Link from "next/link";
import { JournalEntry } from "@prisma/client";

export default function JurnalPage({
  journals,
}: {
  journals?: JournalEntry[]; // In a real app, fetch via RSC and pass down, but since this is client component, we'll assume we pass it or fetch it.
}) {
  const [isWriting, setIsWriting] = useState(false);
  const [state, action, isPending] = useActionState(saveJournal, undefined);

  useEffect(() => {
    if (state?.success) {
      setIsWriting(false);
    }
  }, [state]);

  if (isWriting) {
    return (
      <div className="p-6 min-h-screen flex flex-col bg-white">
        <header className="mb-6 mt-4 flex items-center justify-between">
          <button onClick={() => setIsWriting(false)} className="text-text-secondary hover:text-purple-accent flex items-center">
            <ChevronLeft size={20} /> <span className="ml-1 text-sm font-medium">Kembali</span>
          </button>
          <span className="text-xs text-text-secondary">{new Date().toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </header>

        <form action={action} className="flex flex-col flex-1">
          <input 
            type="text" 
            name="title"
            placeholder="Judul jurnal hari ini..." 
            className="text-2xl font-bold mb-4 focus:outline-none placeholder:text-lavender-primary text-text-main"
          />
          <textarea 
            name="content"
            placeholder="Apa yang ada di pikiranmu? Tuliskan semuanya di sini, tempat ini aman dan rahasia..."
            className="flex-1 w-full text-base leading-relaxed focus:outline-none resize-none placeholder:text-lavender-soft/80 text-text-main bg-transparent"
            autoFocus
          ></textarea>

          {state?.error && <p className="text-coral-soft text-sm mt-2">{state.error}</p>}

          <div className="pt-6 mt-auto">
            <button 
              type="submit" 
              disabled={isPending}
              className="w-full bg-purple-accent text-white py-4 rounded-full font-semibold hover:bg-purple-accent/90 transition disabled:opacity-50"
            >
              {isPending ? "Menyimpan..." : "Simpan Entri"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen flex flex-col">
      <header className="mb-8 mt-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Jurnal Harian</h1>
      </header>

      <div className="flex-1">
        <button 
          onClick={() => setIsWriting(true)}
          className="w-full bg-purple-accent/10 border-2 border-dashed border-purple-accent/30 text-purple-accent p-6 rounded-3xl flex flex-col items-center justify-center hover:bg-purple-accent/20 transition mb-8"
        >
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm">
            <PenTool size={20} />
          </div>
          <span className="font-semibold">Tulis Jurnal Baru</span>
          <span className="text-xs mt-1 text-purple-accent/70">Ruang aman untuk bercerita</span>
        </button>

        <h3 className="font-semibold text-lg mb-4">Riwayat Jurnal</h3>
        
        <div className="space-y-4">
          {journals && journals.length > 0 ? (
            journals.map((journal) => (
              <div key={journal.id} className="bg-white p-5 rounded-2xl border border-lavender-soft/50 shadow-sm flex items-start space-x-4">
                <div className="w-10 h-10 bg-lavender-soft rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText size={18} className="text-purple-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-main">{journal.title}</h4>
                  <p className="text-xs text-text-secondary flex items-center mt-1 mb-2">
                    <Calendar size={12} className="mr-1" /> 
                    {new Date(journal.createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                  <p className="text-sm text-text-secondary line-clamp-2">
                    {journal.content}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 bg-neutral-bg rounded-2xl border border-dashed border-lavender-soft">
              <p className="text-text-secondary text-sm">Belum ada jurnal. Mulai tulis ceritamu hari ini.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
