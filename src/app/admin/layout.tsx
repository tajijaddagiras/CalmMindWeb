import BottomNavAdmin from "@/components/BottomNavAdmin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-neutral-bg flex justify-center">
      <div className="w-full max-w-md h-screen flex flex-col bg-white shadow-[0_0_40px_rgba(0,0,0,0.08)] overflow-hidden font-body">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
        <BottomNavAdmin />
      </div>
    </div>
  );
}
