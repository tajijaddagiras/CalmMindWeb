"use client";

import { useState, useActionState, useEffect } from "react";
import { createPost, createComment } from "@/app/actions/community";
import { Users, MessageCircle, PenTool, ChevronLeft, AlertCircle, Send } from "lucide-react";
import { useRouter } from "next/navigation";

type Group = { id: string; name: string; topic: string; _count: { posts: number } };
type Comment = {
  id: string;
  content: string;
  isAnonymous: boolean;
  createdAt: Date;
};
type Post = {
  id: string;
  content: string;
  isAnonymous: boolean;
  authorId: string;
  createdAt: Date;
  _count: { comments: number };
  comments?: Comment[];
};

export default function CalmCircleClient({
  groups,
  posts,
  activeGroupId,
  currentUserId,
}: {
  groups: Group[];
  posts: Post[];
  activeGroupId: string;
  currentUserId: string;
}) {
  const router = useRouter();
  const [isWriting, setIsWriting] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postState, postAction, isPosting] = useActionState(createPost, undefined);
  const [commentState, commentAction, isCommenting] = useActionState(createComment, undefined);

  useEffect(() => {
    if (postState?.success) setIsWriting(false);
  }, [postState]);

  useEffect(() => {
    if (commentState?.success) {
      // Refresh to show new comment
      router.refresh();
    }
  }, [commentState]);

  const switchGroup = (id: string) => {
    setSelectedPost(null);
    router.push(`/calm-circle?groupId=${id}`);
  };

  const activeGroup = groups.find((g) => g.id === activeGroupId);

  // === WRITE POST VIEW ===
  if (isWriting) {
    return (
      <div className="p-6 min-h-screen bg-white flex flex-col">
        <header className="mb-6 mt-4 flex items-center">
          <button onClick={() => setIsWriting(false)} className="flex items-center text-text-secondary hover:text-purple-accent">
            <ChevronLeft size={20} />
            <span className="text-sm font-medium ml-1">Batal</span>
          </button>
        </header>

        <div className="bg-lavender-soft/30 border border-lavender-soft rounded-2xl p-4 mb-6 flex items-start space-x-2">
          <AlertCircle size={16} className="text-purple-accent flex-shrink-0 mt-0.5" />
          <p className="text-xs text-text-secondary">
            Postinganmu akan dibagikan secara <strong>anonim</strong>. Identitas aslimu tidak akan terlihat oleh anggota lain.
          </p>
        </div>

        <form action={postAction} className="flex flex-col flex-1">
          <input type="hidden" name="groupId" value={activeGroupId} />
          <textarea
            name="content"
            placeholder={`Ceritakan apa yang ada di pikiranmu di "${activeGroup?.name}"...`}
            rows={8}
            autoFocus
            className="w-full p-4 rounded-2xl border border-lavender-soft bg-neutral-bg text-sm focus:outline-none focus:ring-2 focus:ring-purple-accent/50 resize-none mb-4"
          />
          {postState?.error && (
            <p className="text-coral-soft text-sm mb-4">{postState.error}</p>
          )}
          <button
            type="submit"
            disabled={isPosting}
            className="w-full bg-purple-accent text-white py-4 rounded-full font-semibold hover:bg-purple-accent/90 transition disabled:opacity-50"
          >
            {isPosting ? "Memposting..." : "Bagikan Cerita"}
          </button>
        </form>
      </div>
    );
  }

  // === POST DETAIL + COMMENTS VIEW ===
  if (selectedPost) {
    const post = posts.find((p) => p.id === selectedPost.id) || selectedPost;
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <header className="p-6 pb-4 mt-4 flex items-center border-b border-lavender-soft/30">
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center text-text-secondary hover:text-purple-accent"
          >
            <ChevronLeft size={20} />
            <span className="text-sm font-medium ml-1">Kembali</span>
          </button>
        </header>

        {/* Original Post */}
        <div className="p-6 border-b border-lavender-soft/30">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-9 h-9 bg-lavender-soft rounded-full flex items-center justify-center flex-shrink-0">
              <Users size={16} className="text-purple-accent" />
            </div>
            <div>
              <p className="text-xs font-semibold text-text-main">Pengguna Anonim</p>
              <p className="text-xs text-text-secondary">
                {new Date(post.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric", month: "long", year: "numeric",
                  hour: "2-digit", minute: "2-digit",
                })}
              </p>
            </div>
          </div>
          <p className="text-sm text-text-main leading-relaxed">{post.content}</p>
          <div className="mt-3 flex items-center space-x-1 text-text-secondary">
            <MessageCircle size={14} />
            <span className="text-xs">{post._count.comments} balasan</span>
          </div>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {!post.comments || post.comments.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle size={32} className="text-lavender-soft mx-auto mb-2" />
              <p className="text-sm text-text-secondary">Belum ada balasan.</p>
              <p className="text-xs text-text-secondary mt-1">Jadilah yang pertama merespons!</p>
            </div>
          ) : (
            post.comments.map((c) => (
              <div key={c.id} className="flex items-start space-x-3">
                <div className="w-7 h-7 bg-neutral-bg rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Users size={12} className="text-text-secondary" />
                </div>
                <div className="flex-1 bg-neutral-bg rounded-2xl px-4 py-3">
                  <p className="text-[10px] font-semibold text-text-secondary mb-1">Anonim</p>
                  <p className="text-sm text-text-main leading-relaxed">{c.content}</p>
                  <p className="text-[10px] text-text-secondary mt-1">
                    {new Date(c.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Comment Input */}
        <div className="p-4 border-t border-lavender-soft/30 bg-white">
          <form action={commentAction} className="flex items-center space-x-3">
            <input type="hidden" name="postId" value={post.id} />
            <input
              type="text"
              name="content"
              placeholder="Tulis balasan anonimmu..."
              required
              className="flex-1 px-4 py-3 rounded-full border border-lavender-soft bg-neutral-bg text-sm focus:outline-none focus:ring-2 focus:ring-purple-accent/50"
            />
            <button
              type="submit"
              disabled={isCommenting}
              className="w-10 h-10 bg-purple-accent text-white rounded-full flex items-center justify-center hover:bg-purple-accent/90 transition disabled:opacity-50 flex-shrink-0"
            >
              <Send size={16} />
            </button>
          </form>
          {commentState?.error && (
            <p className="text-coral-soft text-xs mt-2 px-4">{commentState.error}</p>
          )}
        </div>
      </div>
    );
  }

  // === MAIN LIST VIEW ===
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-6 pb-0 mt-4">
        <h1 className="text-2xl font-semibold mb-1">Calm Circle</h1>
        <p className="text-sm text-text-secondary">Ruang aman untuk berbagi secara anonim</p>
      </header>

      {/* Groups horizontal scroll */}
      <div className="flex space-x-3 px-6 py-4 overflow-x-auto scrollbar-hide">
        {groups.map((group) => (
          <button
            key={group.id}
            onClick={() => switchGroup(group.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition border ${
              activeGroupId === group.id
                ? "bg-purple-accent text-white border-purple-accent"
                : "bg-white text-text-secondary border-lavender-soft hover:bg-lavender-soft/30"
            }`}
          >
            {group.name}
          </button>
        ))}
      </div>

      {/* Active group info */}
      {activeGroup && (
        <div className="mx-6 mb-4 bg-lavender-soft/30 rounded-2xl p-4 flex justify-between items-center">
          <div>
            <p className="font-semibold text-sm text-text-main">{activeGroup.name}</p>
            <p className="text-xs text-text-secondary">{activeGroup.topic} · {activeGroup._count.posts} cerita</p>
          </div>
          <button
            onClick={() => setIsWriting(true)}
            className="flex items-center space-x-2 bg-purple-accent text-white px-4 py-2 rounded-full text-xs font-semibold"
          >
            <PenTool size={14} />
            <span>Cerita</span>
          </button>
        </div>
      )}

      {/* Posts */}
      <div className="flex-1 px-6 pb-6 space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-lavender-soft">
            <Users size={40} className="text-lavender-primary mx-auto mb-3" />
            <p className="text-sm text-text-secondary">Belum ada cerita di sini.</p>
            <p className="text-xs text-text-secondary mt-1">Jadilah yang pertama berbagi!</p>
          </div>
        ) : (
          posts.map((post) => (
            <button
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="w-full text-left bg-white border border-lavender-soft/50 rounded-2xl p-5 shadow-sm hover:border-purple-accent/30 hover:shadow-md transition-all"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-lavender-soft rounded-full flex items-center justify-center">
                  <Users size={16} className="text-purple-accent" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-text-main">
                    {post.isAnonymous ? "Pengguna Anonim" : "Pengguna"}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {new Date(post.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <p className="text-sm text-text-main leading-relaxed line-clamp-3">{post.content}</p>
              <div className="mt-3 flex items-center space-x-1 text-text-secondary">
                <MessageCircle size={14} />
                <span className="text-xs">{post._count.comments} balasan</span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
