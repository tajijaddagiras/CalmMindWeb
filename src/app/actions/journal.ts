"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function saveJournal(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session || !session.userId) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!content) return { error: "Konten tidak boleh kosong." };

  await prisma.journalEntry.create({
    data: {
      userId: session.userId,
      title: title || "Tanpa Judul",
      content,
    },
  });

  revalidatePath("/jurnal");
  return { success: true };
}
