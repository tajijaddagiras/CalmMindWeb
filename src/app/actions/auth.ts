"use server";

import { createSession } from "@/lib/session";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { error: "Email atau password salah." };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return { error: "Email atau password salah." };
  }

  await createSession(user.id, user.role);

  if (user.role === "ADMIN") {
    redirect("/admin");
  } else {
    redirect("/");
  }
}

export async function logout() {
  const { deleteSession } = await import("@/lib/session");
  await deleteSession();
  redirect("/login");
}
