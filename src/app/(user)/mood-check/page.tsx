"use client";

import { useState } from "react";
import { saveMood } from "@/app/actions/mood";
import { Smile, Frown, Angry, Meh, Heart } from "lucide-react";
import Link from "next/link";

const moodOptions = [
  { id: "senang", label: "Senang", icon: Heart, color: "text-green-soft", bg: "bg-green-soft/20" },
  { id: "netral", label: "Netral", icon: Meh, color: "text-purple-accent", bg: "bg-lavender-soft" },
  { id: "sedih", label: "Sedih", icon: Frown, color: "text-coral-soft", bg: "bg-coral-soft/20" },
  { id: "cemas", label: "Cemas", icon: Smile, color: "text-yellow-soft", bg: "bg-yellow-soft/20" },
  { id: "marah", label: "Marah", icon: Angry, color: "text-coral-soft", bg: "bg-coral-soft/20" },
];

export default function MoodCheckPage() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  return (
    <div className="p-6 min-h-screen flex flex-col">
      <header className="mb-8 mt-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Mood Check</h1>
        <Link href="/" className="text-text-secondary hover:text-purple-accent text-sm">Batal</Link>
      </header>

      <div className="flex-1">
        <h2 className="text-xl font-medium text-center mb-8">Bagaimana perasaanmu saat ini?</h2>
        
        <form action={saveMood} className="flex flex-col h-full">
          <div className="grid grid-cols-2 gap-4 mb-8">
            {moodOptions.map((mood) => {
              const Icon = mood.icon;
              const isSelected = selectedMood === mood.id;
              
              return (
                <button
                  key={mood.id}
                  type="button"
                  onClick={() => setSelectedMood(mood.id)}
                  className={`flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all ${
                    isSelected 
                      ? "border-purple-accent bg-purple-accent/5 shadow-md scale-105" 
                      : "border-transparent bg-neutral-bg hover:bg-lavender-soft/30"
                  }`}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${mood.bg} ${mood.color}`}>
                    <Icon size={32} />
                  </div>
                  <span className={`font-medium ${isSelected ? "text-purple-accent" : "text-text-main"}`}>
                    {mood.label}
                  </span>
                </button>
              );
            })}
          </div>

          <input type="hidden" name="mood" value={selectedMood || ""} />

          {selectedMood && (
            <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Ingin cerita sedikit? (Opsional)
              </label>
              <textarea
                name="note"
                rows={3}
                placeholder="Aku merasa begini karena..."
                className="w-full px-4 py-3 rounded-2xl border border-lavender-soft focus:outline-none focus:ring-2 focus:ring-purple-accent/50 bg-neutral-bg text-sm resize-none"
              ></textarea>
            </div>
          )}

          <div className="mt-auto pb-6">
            <button
              type="submit"
              disabled={!selectedMood}
              className="w-full bg-purple-accent text-white py-4 rounded-full font-semibold hover:bg-purple-accent/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Simpan Mood
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
