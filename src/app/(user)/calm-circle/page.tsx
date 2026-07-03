import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import CalmCircleClient from "./CalmCircleClient";

export default async function CalmCirclePage({
  searchParams,
}: {
  searchParams: Promise<{ groupId?: string }>;
}) {
  const session = await getSession();
  if (!session?.userId) redirect("/login");

  const { groupId } = await searchParams;

  const groups = await prisma.communityGroup.findMany({
    orderBy: { createdAt: "asc" },
    include: { _count: { select: { posts: true } } },
  });

  const activeGroupId = groupId || groups[0]?.id;

  const posts = activeGroupId
    ? await prisma.communityPost.findMany({
        where: { groupId: activeGroupId },
        orderBy: { createdAt: "desc" },
        include: {
          _count: { select: { comments: true } },
          comments: {
            orderBy: { createdAt: "asc" },
            select: {
              id: true,
              content: true,
              isAnonymous: true,
              createdAt: true,
            },
          },
        },
      })
    : [];

  return (
    <CalmCircleClient
      groups={groups}
      posts={posts}
      activeGroupId={activeGroupId || ""}
      currentUserId={session.userId}
    />
  );
}
