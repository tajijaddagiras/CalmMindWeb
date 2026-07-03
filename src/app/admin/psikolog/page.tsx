import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

import PsikologAdminClient from "./PsikologAdminClient";

export default async function AdminPsikolog() {
  const session = await getSession();
  if (!session?.userId || session.role !== "ADMIN") redirect("/");

  const psychologists = await prisma.psychologist.findMany({
    orderBy: { rating: "desc" },
    include: { _count: { select: { sessions: true } } },
  });

  return <PsikologAdminClient psychologists={psychologists} />;
}
