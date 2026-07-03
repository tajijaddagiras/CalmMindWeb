import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import KonsultasiClient from "./KonsultasiClient";

export default async function KonsultasiPage({
  searchParams,
}: {
  searchParams: Promise<{ history?: string }>;
}) {
  const session = await getSession();
  if (!session?.userId) redirect("/login");

  const { history } = await searchParams;

  const [psychologists, sessions] = await Promise.all([
    prisma.psychologist.findMany({ orderBy: { rating: "desc" } }),
    prisma.consultationSession.findMany({
      where: { userId: session.userId },
      include: { psychologist: { select: { name: true } } },
      orderBy: { date: "desc" },
    }),
  ]);

  return (
    <KonsultasiClient 
      psychologists={psychologists} 
      sessions={sessions} 
      showOnlyHistory={history === "true"} 
    />
  );
}
