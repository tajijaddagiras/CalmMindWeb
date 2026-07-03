import BottomNav from "@/components/BottomNav";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pb-20">
      <main className="max-w-md mx-auto min-h-screen bg-white shadow-sm relative overflow-x-hidden">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
