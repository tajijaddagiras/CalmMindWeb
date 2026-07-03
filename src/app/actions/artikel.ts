"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function toggleSaveArticle(articleId: string) {
  const session = await getSession();
  if (!session?.userId) throw new Error("Unauthorized");

  const existing = await prisma.savedArticle.findUnique({
    where: { userId_articleId: { userId: session.userId, articleId } },
  });

  if (existing) {
    await prisma.savedArticle.delete({ where: { id: existing.id } });
  } else {
    await prisma.savedArticle.create({
      data: { userId: session.userId, articleId },
    });
  }

  revalidatePath("/artikel");
}
