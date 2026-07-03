"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveMood(formData: FormData) {
  const session = await getSession();
  if (!session || !session.userId) {
    throw new Error("Unauthorized");
  }

  const mood = formData.get("mood") as string;
  const note = formData.get("note") as string;

  if (!mood) return;

  await prisma.moodCheck.create({
    data: {
      userId: session.userId,
      mood,
      note,
    },
  });

  revalidatePath("/");
  redirect(`/mood-check/feedback?mood=${mood}`);
}
