import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import JurnalClient from "./JurnalClient";
import { redirect } from "next/navigation";

export default async function JurnalServerPage() {
  const session = await getSession();
  if (!session || !session.userId) {
    redirect("/login");
  }

  const journals = await prisma.journalEntry.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
  });

  return <JurnalClient journals={journals} />;
}
