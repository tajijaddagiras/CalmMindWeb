"use client";

import { useActionState, useEffect } from "react";
import { login } from "@/app/actions/auth";
import { Smile } from "lucide-react";

export default function LoginPage() {
  const [state, action, isPending] = useActionState(login, undefined);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-neutral-bg">
      <div className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-sm border border-lavender-soft/50">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-lavender-soft rounded-full flex items-center justify-center mb-4">
            <Smile size={32} className="text-purple-accent" />
          </div>
          <h1 className="text-2xl font-bold text-text-main">CalmMind</h1>
          <p className="text-sm text-text-secondary mt-1 text-center">
            Tempat aman untuk menenangkan pikiran
          </p>
        </div>

        <form action={action} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="nama@email.com"
              className="w-full px-4 py-3 rounded-xl border border-lavender-soft focus:outline-none focus:ring-2 focus:ring-purple-accent/50 bg-neutral-bg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-lavender-soft focus:outline-none focus:ring-2 focus:ring-purple-accent/50 bg-neutral-bg"
            />
          </div>

          {state?.error && (
            <div className="p-3 text-sm text-coral-soft bg-coral-soft/10 rounded-xl">
              {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-purple-accent text-white py-3 rounded-xl font-semibold hover:bg-purple-accent/90 transition disabled:opacity-50 mt-4"
          >
            {isPending ? "Masuk..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
