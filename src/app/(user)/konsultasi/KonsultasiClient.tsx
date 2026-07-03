"use client";

import { useState, useActionState, useEffect } from "react";
import { bookSession } from "@/app/actions/konsultasi";
import { Star, ChevronLeft, Calendar, Clock, CheckCircle2 } from "lucide-react";

type Psychologist = {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  price: number;
  experience: number;
  about: string;
  photoUrl: string | null;
};

type Session = {
  id: string;
  date: Date;
  status: string;
  psychologist: { name: string };
};

const timeSlots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];

export default function KonsultasiClient({
  psychologists,
  sessions,
}: {
  psychologists: Psychologist[];
  sessions: Session[];
}) {
  const [selectedPsycho, setSelectedPsycho] = useState<Psychologist | null>(null);
  const [bookingStep, setBookingStep] = useState<"detail" | "booking" | "success">("detail");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [state, action, isPending] = useActionState(bookSession, undefined);

  useEffect(() => {
    if (state?.success) setBookingStep("success");
  }, [state]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(price);

  // === SUCCESS SCREEN ===
  if (bookingStep === "success") {
    return (
      <div className="p-6 min-h-screen flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-green-soft/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={48} className="text-green-soft" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Sesi Terjadwal!</h1>
        <p className="text-text-secondary mb-8 max-w-xs">
          Sesi konsultasimu bersama <strong>{selectedPsycho?.name}</strong> telah dikonfirmasi. Kamu akan mendapat notifikasi pengingat sebelum sesi dimulai.
        </p>
        <button
          onClick={() => { setSelectedPsycho(null); setBookingStep("detail"); }}
          className="w-full max-w-xs bg-purple-accent text-white py-4 rounded-full font-semibold"
        >
          Kembali ke Konsultasi
        </button>
      </div>
    );
  }

  // === BOOKING FORM ===
  if (selectedPsycho && bookingStep === "booking") {
    const today = new Date().toISOString().split("T")[0];
    const dateTimeValue = selectedDate && selectedTime ? `${selectedDate}T${selectedTime}:00` : "";

    return (
      <div className="p-6 min-h-screen flex flex-col">
        <button onClick={() => setBookingStep("detail")} className="flex items-center text-text-secondary hover:text-purple-accent mt-4 mb-6">
          <ChevronLeft size={20} />
          <span className="text-sm font-medium ml-1">Kembali</span>
        </button>
        <h1 className="text-xl font-bold mb-1">Pilih Jadwal</h1>
        <p className="text-sm text-text-secondary mb-6">Pilih tanggal dan waktu yang tersedia</p>

        <form action={action} className="flex flex-col flex-1">
          <input type="hidden" name="psychologistId" value={selectedPsycho.id} />
          <input type="hidden" name="date" value={dateTimeValue} />

          <label className="text-sm font-medium text-text-main mb-2">Tanggal Sesi</label>
          <input
            type="date"
            min={today}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-lavender-soft bg-neutral-bg text-sm focus:outline-none focus:ring-2 focus:ring-purple-accent/50 mb-6"
          />

          <label className="text-sm font-medium text-text-main mb-3">Waktu Sesi</label>
          <div className="grid grid-cols-4 gap-2 mb-8">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedTime(slot)}
                className={`py-2 px-3 rounded-xl text-sm font-medium border transition ${
                  selectedTime === slot
                    ? "bg-purple-accent text-white border-purple-accent"
                    : "bg-neutral-bg text-text-secondary border-lavender-soft hover:border-purple-accent"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-lavender-soft/30 rounded-2xl p-4 mb-6">
            <h3 className="font-semibold text-sm mb-3">Ringkasan Sesi</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Psikolog</span>
                <span className="font-medium text-text-main">{selectedPsycho.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Tanggal</span>
                <span className="font-medium text-text-main">{selectedDate || "Belum dipilih"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Waktu</span>
                <span className="font-medium text-text-main">{selectedTime || "Belum dipilih"}</span>
              </div>
              <div className="flex justify-between border-t border-lavender-soft pt-2 mt-2">
                <span className="text-text-secondary">Biaya</span>
                <span className="font-bold text-purple-accent">{formatPrice(selectedPsycho.price)}/sesi</span>
              </div>
            </div>
          </div>

          {state?.error && <p className="text-coral-soft text-sm mb-4">{state.error}</p>}

          <button
            type="submit"
            disabled={isPending || !selectedDate || !selectedTime}
            className="w-full bg-purple-accent text-white py-4 rounded-full font-semibold hover:bg-purple-accent/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Memproses..." : "Konfirmasi Pemesanan"}
          </button>
        </form>
      </div>
    );
  }

  // === DETAIL PSYCHOLOGIST ===
  if (selectedPsycho) {
    return (
      <div className="min-h-screen flex flex-col">
        <button onClick={() => setSelectedPsycho(null)} className="flex items-center text-text-secondary hover:text-purple-accent p-6 pt-8">
          <ChevronLeft size={20} />
          <span className="text-sm font-medium ml-1">Kembali</span>
        </button>

        <div className="px-6 flex flex-col items-center text-center mb-6">
          <div className="w-24 h-24 bg-lavender-soft rounded-full flex items-center justify-center mb-4 text-4xl font-bold text-purple-accent">
            {selectedPsycho.name.charAt(0)}
          </div>
          <h1 className="text-xl font-bold text-text-main">{selectedPsycho.name}</h1>
          <p className="text-sm text-text-secondary mt-1">{selectedPsycho.specialization}</p>
          <div className="flex items-center space-x-4 mt-3 text-sm">
            <span className="flex items-center text-yellow-soft">
              <Star size={14} fill="currentColor" />
              <span className="ml-1 font-semibold">{selectedPsycho.rating}</span>
            </span>
            <span className="text-text-secondary">{selectedPsycho.experience} tahun pengalaman</span>
          </div>
        </div>

        <div className="px-6 flex-1">
          <div className="bg-neutral-bg rounded-2xl p-4 mb-4">
            <h3 className="font-semibold text-sm mb-2">Tentang</h3>
            <p className="text-sm text-text-secondary leading-relaxed">{selectedPsycho.about}</p>
          </div>
          <div className="bg-lavender-soft/30 rounded-2xl p-4 mb-6 flex justify-between items-center">
            <div>
              <p className="text-xs text-text-secondary">Biaya per sesi</p>
              <p className="text-xl font-bold text-purple-accent">{formatPrice(selectedPsycho.price)}</p>
            </div>
            <div className="flex items-center space-x-2 text-text-secondary text-xs">
              <Clock size={14} />
              <span>60 menit</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <button
            onClick={() => setBookingStep("booking")}
            className="w-full bg-purple-accent text-white py-4 rounded-full font-semibold hover:bg-purple-accent/90 transition"
          >
            Pesan Sesi
          </button>
        </div>
      </div>
    );
  }

  // === LIST ===
  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-semibold mt-4 mb-2">Konsultasi</h1>
      <p className="text-sm text-text-secondary mb-6">Pilih psikolog yang tepat untukmu</p>

      <div className="space-y-4 mb-8">
        {psychologists.map((p) => (
          <button
            key={p.id}
            onClick={() => { setSelectedPsycho(p); setBookingStep("detail"); }}
            className="w-full bg-white border border-lavender-soft/50 rounded-2xl p-5 shadow-sm text-left flex items-start space-x-4 hover:border-purple-accent/40 transition"
          >
            <div className="w-14 h-14 bg-lavender-soft rounded-full flex items-center justify-center flex-shrink-0 text-xl font-bold text-purple-accent">
              {p.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-sm text-text-main truncate">{p.name}</h2>
              <p className="text-xs text-text-secondary mt-0.5">{p.specialization}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="flex items-center text-xs text-yellow-soft">
                  <Star size={12} fill="currentColor" />
                  <span className="ml-1 font-semibold">{p.rating}</span>
                </span>
                <span className="text-xs font-semibold text-purple-accent">{formatPrice(p.price)}/sesi</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Riwayat Sesi */}
      {sessions.length > 0 && (
        <>
          <h2 className="font-semibold text-lg mb-4">Riwayat Sesi</h2>
          <div className="space-y-3">
            {sessions.map((s) => (
              <div key={s.id} className="bg-neutral-bg border border-lavender-soft/50 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-text-main">{s.psychologist.name}</p>
                  <p className="text-xs text-text-secondary flex items-center mt-1">
                    <Calendar size={11} className="mr-1" />
                    {new Date(s.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  s.status === "SCHEDULED" ? "bg-lavender-soft text-purple-accent" :
                  s.status === "COMPLETED" ? "bg-green-soft/20 text-green-soft" :
                  "bg-coral-soft/20 text-coral-soft"
                }`}>
                  {s.status === "SCHEDULED" ? "Terjadwal" : s.status === "COMPLETED" ? "Selesai" : "Dibatalkan"}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
