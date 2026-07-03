"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function bookSession(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session?.userId) return { error: "Silakan login terlebih dahulu." };

  const psychologistId = formData.get("psychologistId") as string;
  const dateStr = formData.get("date") as string;

  if (!psychologistId || !dateStr)
    return { error: "Pilih psikolog dan tanggal sesi." };

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return { error: "Format tanggal tidak valid." };

  await prisma.consultationSession.create({
    data: {
      userId: session.userId,
      psychologistId,
      date,
      status: "SCHEDULED",
    },
  });

  revalidatePath("/konsultasi");
  return { success: true };
}
