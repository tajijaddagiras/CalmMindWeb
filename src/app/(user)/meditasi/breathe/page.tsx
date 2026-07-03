"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function BreathePage() {
  const [phase, setPhase] = useState<"idle" | "inhale" | "hold" | "exhale">("idle");
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (phase === "idle") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Switch phases
          if (phase === "inhale") {
            setPhase("hold");
            return 7;
          } else if (phase === "hold") {
            setPhase("exhale");
            return 8;
          } else if (phase === "exhale") {
            setPhase("inhale");
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  const startBreathing = () => {
    setPhase("inhale");
    setTimeLeft(4);
  };

  const stopBreathing = () => {
    setPhase("idle");
    setTimeLeft(0);
  };

  return (
    <div className="p-6 min-h-screen flex flex-col bg-purple-accent/5">
      <header className="mb-8 mt-4">
        <Link href="/meditasi" className="text-text-secondary hover:text-purple-accent flex items-center w-fit">
          <ChevronLeft size={20} /> <span className="ml-1 text-sm font-medium">Kembali</span>
        </Link>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center -mt-20">
        <h1 className="text-2xl font-bold mb-2">
          {phase === "idle" ? "Latihan Napas" : 
           phase === "inhale" ? "Tarik Napas..." : 
           phase === "hold" ? "Tahan..." : "Embuskan..."}
        </h1>
        <p className="text-text-secondary text-sm mb-12 h-6">
          {phase === "idle" ? "Fokus pada lingkaran di bawah ini" : `Sisa ${timeLeft} detik`}
        </p>

        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Animated Circle */}
          <div 
            className={`absolute bg-lavender-primary/30 rounded-full transition-all ease-in-out`}
            style={{
              width: phase === "idle" ? "120px" : phase === "inhale" || phase === "hold" ? "256px" : "120px",
              height: phase === "idle" ? "120px" : phase === "inhale" || phase === "hold" ? "256px" : "120px",
              transitionDuration: phase === "inhale" ? "4000ms" : phase === "exhale" ? "8000ms" : "0ms",
            }}
          ></div>
          
          <div className="absolute w-24 h-24 bg-purple-accent rounded-full shadow-lg flex items-center justify-center z-10">
            <span className="text-white font-semibold text-lg">{timeLeft > 0 ? timeLeft : "Siap"}</span>
          </div>
        </div>
      </div>

      <div className="mt-auto pb-6">
        {phase === "idle" ? (
          <button 
            onClick={startBreathing}
            className="w-full bg-purple-accent text-white py-4 rounded-full font-semibold hover:bg-purple-accent/90 transition"
          >
            Mulai Latihan
          </button>
        ) : (
          <button 
            onClick={stopBreathing}
            className="w-full bg-white border border-lavender-soft text-purple-accent py-4 rounded-full font-semibold hover:bg-lavender-soft/30 transition"
          >
            Hentikan
          </button>
        )}
      </div>
    </div>
  );
}
