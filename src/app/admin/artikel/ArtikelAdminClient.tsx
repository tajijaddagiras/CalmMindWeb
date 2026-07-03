"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { createArticle, updateArticle, deleteArticle } from "@/app/actions/admin";

type Article = {
  id: string;
  title: string;
  category: string;
  content: string;
  _count: { savedBy: number };
  createdAt: Date;
};

export default function ArtikelAdminClient({ articles }: { articles: Article[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isPending, setIsPending] = useState(false);

  const openCreate = () => {
    setEditingArticle(null);
    setIsModalOpen(true);
  };

  const openEdit = (article: Article) => {
    setEditingArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingArticle(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.currentTarget);
    
    if (editingArticle) {
      await updateArticle(editingArticle.id, formData);
    } else {
      await createArticle(formData);
    }
    
    setIsPending(false);
    closeModal();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
      setIsPending(true);
      await deleteArticle(id);
      setIsPending(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-text-main">Kelola Artikel</h2>
        <button 
          onClick={openCreate}
          className="bg-purple-accent text-white p-2 rounded-full shadow-sm hover:bg-purple-accent/90 transition"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {articles.length === 0 ? (
          <p className="text-sm text-text-secondary text-center py-8">Belum ada artikel.</p>
        ) : (
          articles.map((a) => (
            <div key={a.id} className="bg-white rounded-2xl shadow-sm border border-lavender-soft/50 p-5 relative overflow-hidden group">
              <div className="flex justify-between items-start pr-12">
                <div>
                  <span className="bg-lavender-soft text-purple-accent text-[10px] px-2 py-1 rounded-full font-semibold">
                    {a.category}
                  </span>
                  <h3 className="font-semibold text-text-main mt-2 mb-1 leading-snug line-clamp-2">{a.title}</h3>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-lavender-soft/30 text-xs text-text-secondary">
                <span>Disimpan: <strong className="text-purple-accent">{a._count.savedBy}x</strong></span>
                <span>
                  {new Date(a.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <button onClick={() => openEdit(a)} className="text-text-secondary hover:text-purple-accent transition bg-neutral-bg p-1.5 rounded-full">
                  <Edit2 size={14} />
                </button>
                <button onClick={() => handleDelete(a.id)} className="text-text-secondary hover:text-coral-soft transition bg-neutral-bg p-1.5 rounded-full">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={closeModal} className="absolute top-4 right-4 text-text-secondary hover:text-coral-soft">
              <X size={20} />
            </button>
            <h3 className="text-lg font-bold mb-4">{editingArticle ? "Edit Artikel" : "Tambah Artikel"}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Judul Artikel</label>
                <input 
                  type="text" 
                  name="title"
                  defaultValue={editingArticle?.title}
                  required 
                  className="w-full px-4 py-2 border border-lavender-soft rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-accent/50" 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Kategori</label>
                <select 
                  name="category"
                  defaultValue={editingArticle?.category || "Overthinking"}
                  className="w-full px-4 py-2 border border-lavender-soft rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-accent/50 bg-white"
                >
                  <option value="Overthinking">Overthinking</option>
                  <option value="Manajemen Stres">Manajemen Stres</option>
                  <option value="Pengembangan Diri">Pengembangan Diri</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Konten</label>
                <textarea 
                  name="content"
                  defaultValue={editingArticle?.content}
                  required 
                  rows={8}
                  className="w-full px-4 py-2 border border-lavender-soft rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-accent/50 resize-none" 
                />
              </div>
              <button 
                type="submit" 
                disabled={isPending}
                className="w-full bg-purple-accent text-white py-3 rounded-full font-semibold hover:bg-purple-accent/90 transition disabled:opacity-50"
              >
                {isPending ? "Menyimpan..." : "Simpan"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
