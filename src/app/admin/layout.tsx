import BottomNavAdmin from "@/components/BottomNavAdmin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pb-20 bg-neutral-bg">
      <main className="max-w-md mx-auto min-h-screen bg-white shadow-sm relative overflow-x-hidden font-body pb-10">
        {children}
      </main>
      <BottomNavAdmin />
    </div>
  );
}
