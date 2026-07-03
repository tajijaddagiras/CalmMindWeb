"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, BookOpen, ShieldCheck } from "lucide-react";

export default function BottomNavAdmin() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Pengguna", path: "/admin/users", icon: Users },
    { name: "Artikel", path: "/admin/artikel", icon: BookOpen },
    { name: "Psikolog", path: "/admin/psikolog", icon: ShieldCheck },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-lavender-soft z-50">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.path === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.path);

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? "text-purple-accent" : "text-text-secondary"
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
