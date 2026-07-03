"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, Star } from "lucide-react";
import { createPsychologist, updatePsychologist, deletePsychologist } from "@/app/actions/admin";

type Psychologist = {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  price: number;
  experience: number;
  about: string;
  _count: { sessions: number };
};

export default function PsikologAdminClient({ psychologists }: { psychologists: Psychologist[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPsycho, setEditingPsycho] = useState<Psychologist | null>(null);
  const [isPending, setIsPending] = useState(false);

  const openCreate = () => {
    setEditingPsycho(null);
    setIsModalOpen(true);
  };

  const openEdit = (psycho: Psychologist) => {
    setEditingPsycho(psycho);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPsycho(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.currentTarget);
    
    if (editingPsycho) {
      await updatePsychologist(editingPsycho.id, formData);
    } else {
      await createPsychologist(formData);
    }
    
    setIsPending(false);
    closeModal();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus psikolog ini? (Semua sesi terkait akan dihapus)")) {
      setIsPending(true);
      await deletePsychologist(id);
      setIsPending(false);
    }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(price);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-text-main">Kelola Psikolog</h2>
        <button 
          onClick={openCreate}
          className="bg-purple-accent text-white p-2 rounded-full shadow-sm hover:bg-purple-accent/90 transition"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {psychologists.length === 0 ? (
          <p className="text-sm text-text-secondary text-center py-8">Belum ada psikolog.</p>
        ) : (
          psychologists.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-lavender-soft/50 p-5">
              {/* Row 1: Avatar + Info */}
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-lavender-soft rounded-full flex items-center justify-center text-lg font-bold text-purple-accent flex-shrink-0">
                  {p.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-text-main text-sm">{p.name}</h3>
                  <p className="text-xs text-text-secondary mt-0.5 truncate">{p.specialization} · {p.experience} thn</p>
                  <p className="text-xs font-semibold text-purple-accent mt-1">{formatPrice(p.price)}/sesi</p>
                </div>
              </div>

              {/* Row 2: Stats + Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-lavender-soft/30">
                <div className="flex items-center space-x-3 text-xs text-text-secondary">
                  <span className="flex items-center space-x-1 text-yellow-soft font-semibold">
                    <Star size={12} fill="currentColor" />
                    <span>{p.rating}</span>
                  </span>
                  <span className="text-lavender-soft">·</span>
                  <span>{p._count.sessions} sesi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openEdit(p)}
                    className="flex items-center space-x-1 text-xs text-purple-accent border border-purple-accent/30 bg-lavender-soft/20 hover:bg-lavender-soft/50 px-3 py-1.5 rounded-full transition"
                  >
                    <Edit2 size={12} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="flex items-center space-x-1 text-xs text-coral-soft border border-coral-soft/30 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full transition"
                  >
                    <Trash2 size={12} />
                    <span>Hapus</span>
                  </button>
                </div>
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
            <h3 className="text-lg font-bold mb-4">{editingPsycho ? "Edit Psikolog" : "Tambah Psikolog"}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Nama Psikolog</label>
                <input 
                  type="text" 
                  name="name"
                  defaultValue={editingPsycho?.name}
                  required 
                  className="w-full px-4 py-2 border border-lavender-soft rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-accent/50" 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Spesialisasi</label>
                <input 
                  type="text" 
                  name="specialization"
                  defaultValue={editingPsycho?.specialization}
                  required 
                  className="w-full px-4 py-2 border border-lavender-soft rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-accent/50" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">Pengalaman (Tahun)</label>
                  <input 
                    type="number" 
                    name="experience"
                    defaultValue={editingPsycho?.experience}
                    required 
                    className="w-full px-4 py-2 border border-lavender-soft rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-accent/50" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">Rating (Mis. 4.8)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    max="5.0"
                    name="rating"
                    defaultValue={editingPsycho?.rating}
                    required 
                    className="w-full px-4 py-2 border border-lavender-soft rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-accent/50" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Biaya per Sesi (Rp)</label>
                <input 
                  type="number" 
                  name="price"
                  defaultValue={editingPsycho?.price}
                  required 
                  className="w-full px-4 py-2 border border-lavender-soft rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-accent/50" 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Tentang Psikolog</label>
                <textarea 
                  name="about"
                  defaultValue={editingPsycho?.about}
                  required 
                  rows={4}
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
