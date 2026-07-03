import BottomNav from "@/components/BottomNav";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-neutral-bg flex justify-center">
      <div className="w-full max-w-md h-screen flex flex-col bg-white shadow-[0_0_40px_rgba(0,0,0,0.08)] overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
