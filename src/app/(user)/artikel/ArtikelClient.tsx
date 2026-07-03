"use client";

import { useState, useTransition } from "react";
import { toggleSaveArticle } from "@/app/actions/artikel";
import { Bookmark, Search, X, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type Article = {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: Date;
};

export default function ArtikelClient({
  articles,
  savedIds,
  categories,
  activeCategory,
  searchQuery,
}: {
  articles: Article[];
  savedIds: string[];
  categories: string[];
  activeCategory: string;
  searchQuery: string;
}) {
  const router = useRouter();
  const [saved, setSaved] = useState<Set<string>>(new Set(savedIds));
  const [selected, setSelected] = useState<Article | null>(null);
  const [search, setSearch] = useState(searchQuery);
  const [isPending, startTransition] = useTransition();

  const handleSave = (articleId: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(articleId) ? next.delete(articleId) : next.add(articleId);
      return next;
    });
    startTransition(() => toggleSaveArticle(articleId));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (activeCategory) params.set("category", activeCategory);
    router.push(`/artikel?${params.toString()}`);
  };

  const filterByCategory = (cat: string) => {
    const params = new URLSearchParams();
    if (cat && cat !== activeCategory) params.set("category", cat);
    if (search) params.set("q", search);
    router.push(`/artikel?${params.toString()}`);
  };

  if (selected) {
    return (
      <div className="p-6 min-h-screen bg-white">
        <button
          onClick={() => setSelected(null)}
          className="flex items-center text-text-secondary hover:text-purple-accent mb-6 mt-4"
        >
          <ChevronLeft size={20} />
          <span className="ml-1 text-sm font-medium">Kembali</span>
        </button>
        <span className="text-xs font-semibold text-purple-accent bg-lavender-soft px-3 py-1 rounded-full">
          {selected.category}
        </span>
        <h1 className="text-xl font-bold mt-3 mb-4 text-text-main">{selected.title}</h1>
        <div className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
          {selected.content}
        </div>
        <button
          onClick={() => handleSave(selected.id)}
          className={`mt-8 w-full flex items-center justify-center space-x-2 py-3 rounded-full border font-semibold transition ${
            saved.has(selected.id)
              ? "bg-purple-accent text-white border-purple-accent"
              : "border-lavender-soft text-purple-accent"
          }`}
        >
          <Bookmark size={18} />
          <span>{saved.has(selected.id) ? "Tersimpan" : "Simpan Artikel"}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-semibold mt-4 mb-6">Artikel</h1>

      {/* Search */}
      <form onSubmit={handleSearch} className="relative mb-5">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari artikel..."
          className="w-full pl-10 pr-4 py-3 rounded-full border border-lavender-soft bg-neutral-bg text-sm focus:outline-none focus:ring-2 focus:ring-purple-accent/50"
        />
      </form>

      {/* Categories */}
      <div className="flex space-x-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        <button
          onClick={() => filterByCategory("")}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${
            !activeCategory
              ? "bg-purple-accent text-white"
              : "bg-neutral-bg text-text-secondary border border-lavender-soft"
          }`}
        >
          Semua
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => filterByCategory(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${
              activeCategory === cat
                ? "bg-purple-accent text-white"
                : "bg-neutral-bg text-text-secondary border border-lavender-soft"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles */}
      <div className="space-y-4">
        {articles.length === 0 ? (
          <div className="text-center py-10 text-text-secondary text-sm">
            Tidak ada artikel ditemukan.
          </div>
        ) : (
          articles.map((article) => (
            <div
              key={article.id}
              className="bg-white border border-lavender-soft/50 rounded-2xl p-5 shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-semibold text-purple-accent bg-lavender-soft px-3 py-1 rounded-full">
                  {article.category}
                </span>
                <button
                  onClick={() => handleSave(article.id)}
                  className={`transition ${saved.has(article.id) ? "text-purple-accent" : "text-text-secondary hover:text-purple-accent"}`}
                >
                  <Bookmark size={18} fill={saved.has(article.id) ? "currentColor" : "none"} />
                </button>
              </div>
              <h2 className="font-semibold text-text-main text-sm leading-snug mb-2">
                {article.title}
              </h2>
              <p className="text-xs text-text-secondary line-clamp-2 mb-3">
                {article.content.substring(0, 100)}...
              </p>
              <button
                onClick={() => setSelected(article)}
                className="text-xs font-semibold text-purple-accent hover:underline"
              >
                Baca Selengkapnya →
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
