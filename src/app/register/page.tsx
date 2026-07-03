"use client";

import { useActionState } from "react";
import { register } from "@/app/actions/auth";
import { Smile, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [state, action, isPending] = useActionState(register, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-neutral-bg">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-lavender-soft rounded-full flex items-center justify-center mb-4 shadow-sm">
            <Smile size={32} className="text-purple-accent" />
          </div>
          <h1 className="text-2xl font-bold text-text-main">Buat Akun</h1>
          <p className="text-sm text-text-secondary mt-1 text-center">
            Bergabung dengan CalmMind dan mulai perjalananmu
          </p>
        </div>

        {/* Card */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-lavender-soft/50">
          <form action={action} className="space-y-4">
            {/* Nama */}
            <div>
              <label className="block text-sm font-medium text-text-main mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Nama kamu"
                className="w-full px-4 py-3 rounded-xl border border-lavender-soft focus:outline-none focus:ring-2 focus:ring-purple-accent/50 bg-neutral-bg text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-text-main mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="nama@email.com"
                className="w-full px-4 py-3 rounded-xl border border-lavender-soft focus:outline-none focus:ring-2 focus:ring-purple-accent/50 bg-neutral-bg text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-text-main mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Min. 6 karakter"
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-lavender-soft focus:outline-none focus:ring-2 focus:ring-purple-accent/50 bg-neutral-bg text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-purple-accent transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Konfirmasi Password */}
            <div>
              <label className="block text-sm font-medium text-text-main mb-1">
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  required
                  placeholder="Ulangi password"
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-lavender-soft focus:outline-none focus:ring-2 focus:ring-purple-accent/50 bg-neutral-bg text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-purple-accent transition"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {state?.error && (
              <div className="p-3 text-sm text-coral-soft bg-coral-soft/10 rounded-xl border border-coral-soft/20">
                {state.error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-purple-accent text-white py-3 rounded-xl font-semibold hover:bg-purple-accent/90 transition disabled:opacity-50 mt-2"
            >
              {isPending ? "Membuat akun..." : "Daftar Sekarang"}
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <p className="text-center text-sm text-text-secondary mt-6">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="text-purple-accent font-semibold hover:underline"
          >
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
