"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Book, Users, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Beranda", path: "/", icon: Home },
    { name: "Jurnal", path: "/jurnal", icon: Book },
    { name: "Calm Circle", path: "/calm-circle", icon: Users },
    { name: "Profil", path: "/profil", icon: User },
  ];

  return (
    <div className="bg-white/95 backdrop-blur-md border-t border-lavender-soft/60 z-50 rounded-t-3xl shadow-[0_-4px_24px_rgba(149,103,226,0.12)] shrink-0">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.path === "/"
              ? pathname === "/"
              : pathname.startsWith(item.path);
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive ? "text-purple-accent" : "text-text-secondary"
                }`}
            >
              <Icon size={24} className={isActive ? "fill-lavender-soft/30" : ""} />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
