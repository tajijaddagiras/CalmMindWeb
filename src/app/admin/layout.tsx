import { logout } from "@/app/actions/auth";
import { LayoutDashboard, Users, Activity, LogOut, BookOpen, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-body">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="p-6 border-b border-gray-100 flex items-center space-x-3">
          <div className="w-10 h-10 bg-lavender-soft rounded-xl flex items-center justify-center">
            <Activity className="text-purple-accent" size={20} />
          </div>
          <div>
            <h1 className="font-bold text-lg text-text-main">CalmMind</h1>
            <p className="text-xs text-text-secondary">Admin Portal</p>
          </div>
        </div>
        
        <nav className="p-4 space-y-1">
          <Link href="/admin" className="flex items-center space-x-3 px-4 py-3 text-purple-accent bg-purple-50 rounded-lg font-medium">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/users" className="flex items-center space-x-3 px-4 py-3 text-text-secondary hover:bg-gray-50 rounded-lg font-medium transition">
            <Users size={20} />
            <span>Data Pengguna</span>
          </Link>
          <Link href="/admin/artikel" className="flex items-center space-x-3 px-4 py-3 text-text-secondary hover:bg-gray-50 rounded-lg font-medium transition">
            <BookOpen size={20} />
            <span>Artikel</span>
          </Link>
          <Link href="/admin/psikolog" className="flex items-center space-x-3 px-4 py-3 text-text-secondary hover:bg-gray-50 rounded-lg font-medium transition">
            <ShieldCheck size={20} />
            <span>Psikolog</span>
          </Link>
        </nav>

        <div className="p-4 mt-auto md:absolute md:bottom-0 md:w-64 border-t border-gray-100">
          <form action={logout}>
            <button type="submit" className="flex items-center space-x-3 px-4 py-3 w-full text-coral-soft hover:bg-red-50 rounded-lg font-medium transition">
              <LogOut size={20} />
              <span>Keluar</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
