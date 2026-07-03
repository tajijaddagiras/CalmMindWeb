"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function createPost(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session?.userId) return { error: "Unauthorized" };

  const groupId = formData.get("groupId") as string;
  const content = formData.get("content") as string;

  if (!content || content.trim().length < 10)
    return { error: "Cerita minimal 10 karakter ya." };

  await prisma.communityPost.create({
    data: {
      groupId,
      authorId: session.userId,
      content,
      isAnonymous: true,
    },
  });

  revalidatePath("/calm-circle");
  return { success: true };
}

export async function createComment(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session?.userId) return { error: "Unauthorized" };

  const postId = formData.get("postId") as string;
  const content = formData.get("content") as string;

  if (!content || content.trim().length < 2)
    return { error: "Komentar tidak boleh kosong." };

  await prisma.communityComment.create({
    data: {
      postId,
      authorId: session.userId,
      content,
      isAnonymous: true,
    },
  });

  revalidatePath("/calm-circle");
  return { success: true };
}
