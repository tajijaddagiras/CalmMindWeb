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
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Kelola Psikolog</h2>
      <div className="grid gap-4">
        {psychologists.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-lavender-soft rounded-full flex items-center justify-center text-lg font-bold text-purple-accent">
                {p.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{p.name}</h3>
                <p className="text-sm text-gray-500">{p.specialization} · {p.experience} tahun</p>
                <p className="text-sm font-semibold text-purple-accent mt-1">{formatPrice(p.price)}/sesi</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-yellow-500 text-sm font-bold">⭐ {p.rating}</p>
              <p className="text-xs text-gray-400 mt-1">{p._count.sessions} sesi</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
