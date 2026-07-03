"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

async function checkAdmin() {
  const session = await getSession();
  if (!session?.userId || session.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
}

// === ARTIKEL CRUD ===

export async function createArticle(formData: FormData) {
  await checkAdmin();
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const content = formData.get("content") as string;

  if (!title || !category || !content) return { error: "Semua field harus diisi" };

  await prisma.article.create({
    data: { title, category, content },
  });

  revalidatePath("/admin/artikel");
  revalidatePath("/artikel");
  return { success: true };
}

export async function updateArticle(id: string, formData: FormData) {
  await checkAdmin();
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const content = formData.get("content") as string;

  if (!title || !category || !content) return { error: "Semua field harus diisi" };

  await prisma.article.update({
    where: { id },
    data: { title, category, content },
  });

  revalidatePath("/admin/artikel");
  revalidatePath("/artikel");
  return { success: true };
}

export async function deleteArticle(id: string) {
  await checkAdmin();
  await prisma.savedArticle.deleteMany({ where: { articleId: id } });
  await prisma.article.delete({ where: { id } });

  revalidatePath("/admin/artikel");
  revalidatePath("/artikel");
  return { success: true };
}

// === PSIKOLOG CRUD ===

export async function createPsychologist(formData: FormData) {
  await checkAdmin();
  const name = formData.get("name") as string;
  const specialization = formData.get("specialization") as string;
  const experience = parseInt(formData.get("experience") as string);
  const price = parseFloat(formData.get("price") as string);
  const rating = parseFloat(formData.get("rating") as string);
  const about = formData.get("about") as string;

  if (!name || !specialization || !about || isNaN(experience) || isNaN(price) || isNaN(rating)) {
    return { error: "Data tidak valid atau kurang lengkap" };
  }

  await prisma.psychologist.create({
    data: { name, specialization, experience, price, rating, about },
  });

  revalidatePath("/admin/psikolog");
  revalidatePath("/konsultasi");
  return { success: true };
}

export async function updatePsychologist(id: string, formData: FormData) {
  await checkAdmin();
  const name = formData.get("name") as string;
  const specialization = formData.get("specialization") as string;
  const experience = parseInt(formData.get("experience") as string);
  const price = parseFloat(formData.get("price") as string);
  const rating = parseFloat(formData.get("rating") as string);
  const about = formData.get("about") as string;

  if (!name || !specialization || !about || isNaN(experience) || isNaN(price) || isNaN(rating)) {
    return { error: "Data tidak valid atau kurang lengkap" };
  }

  await prisma.psychologist.update({
    where: { id },
    data: { name, specialization, experience, price, rating, about },
  });

  revalidatePath("/admin/psikolog");
  revalidatePath("/konsultasi");
  return { success: true };
}

export async function deletePsychologist(id: string) {
  await checkAdmin();
  await prisma.consultationSession.deleteMany({ where: { psychologistId: id } });
  await prisma.psychologist.delete({ where: { id } });

  revalidatePath("/admin/psikolog");
  revalidatePath("/konsultasi");
  return { success: true };
}
