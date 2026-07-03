import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AdminPsikolog() {
  const session = await getSession();
  if (!session?.userId || session.role !== "ADMIN") redirect("/");

  const psychologists = await prisma.psychologist.findMany({
    orderBy: { rating: "desc" },
    include: { _count: { select: { sessions: true } } },
  });

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(price);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-text-main mb-6">Kelola Psikolog</h2>
      <div className="grid gap-4">
        {psychologists.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-lavender-soft/50 p-5 flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-lavender-soft rounded-full flex items-center justify-center text-lg font-bold text-purple-accent flex-shrink-0">
                {p.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-text-main text-sm truncate">{p.name}</h3>
                <p className="text-xs text-text-secondary truncate mt-0.5">{p.specialization} · {p.experience} thn</p>
                <p className="text-xs font-semibold text-purple-accent mt-1.5">{formatPrice(p.price)}/sesi</p>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-yellow-soft text-xs font-bold flex items-center justify-end">⭐ {p.rating}</p>
              <p className="text-[10px] text-text-secondary mt-1">{p._count.sessions} sesi</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
