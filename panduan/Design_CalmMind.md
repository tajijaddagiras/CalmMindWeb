# Design Document
## CalmMind — Panduan Desain & Pengalaman Pengguna

| | |
|---|---|
| **Versi Dokumen** | 1.0 |
| **Tanggal** | 3 Juli 2026 |
| **Status** | Draft |
| **Terkait** | PRD_CalmMind.md |

---

## Daftar Isi
1. [Filosofi Desain & Identitas Merek](#1-filosofi-desain--identitas-merek)
2. [Prinsip Desain](#2-prinsip-desain)
3. [Palet Warna](#3-palet-warna)
4. [Tipografi](#4-tipografi)
5. [Ikonografi & Ilustrasi](#5-ikonografi--ilustrasi)
6. [Tata Letak & Sistem Spasi](#6-tata-letak--sistem-spasi)
7. [Arsitektur Informasi & Navigasi](#7-arsitektur-informasi--navigasi)
8. [Alur Layar per Fitur](#8-alur-layar-per-fitur)
9. [Komponen UI](#9-komponen-ui)
10. [Aksesibilitas](#10-aksesibilitas)
11. [Rekomendasi Tambahan](#11-rekomendasi-tambahan)

---

## 1. Filosofi Desain & Identitas Merek

**Nama & Makna** — "CalmMind" berarti pikiran yang tenang. Tagline: *"Tempat aman untuk menenangkan pikiran."*

**Logo** — Bentuk hati bertumpuk dengan ikon senyuman di dalamnya, melambangkan kasih sayang pada diri sendiri dan kedamaian batin.

**Ilustrasi Utama** — Sosok wanita dengan posisi tangan di dada, merepresentasikan kedamaian diri, penerimaan, dan rasa aman.

**Kepribadian Merek** — Hangat, lembut, tidak menghakimi, suportif, dan tepercaya. Setiap elemen visual maupun tekstual harus terasa seperti "teman yang mendengarkan", bukan sistem klinis yang dingin.

## 2. Prinsip Desain

1. **Ketenangan visual** — minim clutter, banyak ruang kosong (white space), transisi lembut.
2. **Tidak menghakimi** — bahasa dan visual netral serta hangat, hindari nada yang terkesan mendiagnosis.
3. **Privasi lebih dulu** — elemen visual dengan jelas menandakan area privat (jurnal) vs. area anonim publik (Calm Circle).
4. **Aksesibel dan inklusif** — dapat digunakan nyaman oleh pengguna dalam kondisi emosi yang rentan.

## 3. Palet Warna

Warna ungu muda/lavender dipilih karena secara psikologis memberikan efek menenangkan, mengurangi stres, dan menciptakan atmosfer teduh.

| Nama | Hex | Penggunaan |
|---|---|---|
| Lavender Primer | `#B7A4E0` | Warna utama brand, ikon aktif, elemen penekanan |
| Ungu Aksen Dalam | `#6A4C93` | Judul penting, tombol utama (hover/pressed state) |
| Lavender Lembut | `#D9CCF0` | Latar sekunder, kartu, badge |
| Latar Netral | `#F6F2FB` | Latar belakang layar utama |
| Putih | `#FFFFFF` | Latar kartu, ruang kosong |
| Teks Utama | `#3A2E4D` | Judul dan teks isi utama |
| Teks Sekunder | `#7A6E8C` | Keterangan, placeholder, metadata |
| Hijau Lembut (Positif) | `#A8D5BA` | Status positif, mood senang, konfirmasi berhasil |
| Kuning Lembut (Peringatan) | `#F5D399` | Notifikasi ringan, pengingat |
| Koral Lembut (Perhatian) | `#F2A0A0` | Mood cemas/negatif, validasi error — tetap lembut, tidak agresif |

*Catatan: seluruh warna dipilih dalam nuansa pastel agar tetap konsisten dengan efek menenangkan, termasuk warna status (sukses/peringatan/error) yang biasanya lebih tajam pada aplikasi umum.*

## 4. Tipografi

- **Judul (Heading)** — *Poppins* (rounded, modern, ramah) — SemiBold/Bold.
- **Isi (Body)** — *Nunito Sans* — Regular/Medium, mudah dibaca dalam sesi membaca panjang (jurnal, artikel).

| Level | Font & Berat | Ukuran (referensi mobile) |
|---|---|---|
| H1 | Poppins Bold | 28px |
| H2 | Poppins SemiBold | 22px |
| H3 | Poppins SemiBold | 18px |
| Body | Nunito Sans Regular | 16px |
| Caption | Nunito Sans Regular | 13px |

## 5. Ikonografi & Ilustrasi

- Ikon bergaya *rounded line* dengan ketebalan garis konsisten (2px), sudut tumpul agar terasa lembut.
- Ilustrasi mengikuti gaya flat dengan gradasi lavender lembut, konsisten dengan ilustrasi wanita pada logo/branding.
- Hindari ikon/ilustrasi tajam, kontras keras, atau bertema medis-klinis yang terkesan dingin.

## 6. Tata Letak & Sistem Spasi

- Sistem grid berbasis kelipatan **8px** untuk konsistensi jarak antar elemen.
- Sudut kartu dan tombol menggunakan radius besar (**16px**) untuk kesan lembut dan aman.
- Layout berbasis kartu (*card-based*) khususnya untuk grid enam menu utama di Beranda.

## 7. Arsitektur Informasi & Navigasi

```
Splash Screen
   └─ Onboarding (opsional: Mood Check pertama)
        └─ Beranda (Home)
             ├─ Grid 6 Menu Utama:
             │    ├─ Mood Check
             │    ├─ Jurnal Harian
             │    ├─ Meditasi
             │    ├─ Artikel
             │    ├─ Calm Circle
             │    └─ Konsultasi
             └─ Bottom Navigation:
                  ├─ Beranda
                  ├─ Jurnal
                  ├─ Calm Circle
                  └─ Profil
```

Mood Check ditempatkan sebagai titik masuk pertama setelah onboarding, sesuai perannya sebagai "langkah awal interogasi emosi" pada dokumen konsep.

## 8. Alur Layar per Fitur

**Mood Check**
1. Pengguna membuka Beranda → tap kartu Mood Check
2. Pilih indikator perasaan (ikon emosi)
3. Sistem menampilkan umpan balik instan + rekomendasi (napas dalam/relaksasi bila cemas)
4. Opsi lanjut ke Meditasi atau kembali ke Beranda

**Jurnal Harian**
1. Buka menu Jurnal → tampilan kalender/riwayat entri
2. Tap "Tulis Baru" → area teks bebas
3. Simpan otomatis → entri tersimpan pada tanggal berjalan
4. Tinjau entri lama dari daftar riwayat

**Meditasi**
1. Buka menu Meditasi → pilih Musik atau Panduan Pernapasan
2. **Musik:** pilih track (piano/suara alam) → pemutar dengan timer
3. **Pernapasan:** animasi lingkaran mengembang/mengempis mengikuti hitungan tarik–tahan–embuskan napas

**Artikel**
1. Buka menu Artikel → daftar artikel per kategori
2. Filter/cari berdasarkan topik
3. Baca artikel → opsi simpan (bookmark)

**Calm Circle**
1. Buka menu Calm Circle → daftar grup berdasarkan topik kecemasan
2. Pilih grup → lihat feed cerita anonim
3. Posting cerita/komentar secara anonim atau beri dukungan pada postingan lain
4. Tombol lapor tersedia pada setiap postingan untuk moderasi

**Konsultasi**
1. Buka menu Konsultasi → daftar psikolog (foto, rating, tarif)
2. Pilih psikolog → lihat profil detail
3. Pilih jadwal via kalender interaktif
4. Konfirmasi pemesanan (ringkasan + pembayaran)
5. Notifikasi konfirmasi & pengingat
6. Sesi panggilan video di dalam aplikasi pada waktu terjadwal

## 9. Komponen UI

| Komponen | Deskripsi | Konteks Penggunaan |
|---|---|---|
| Kartu Menu | Kartu rounded dengan ikon + label | Grid 6 menu di Beranda |
| Mood Selector | Deretan ikon emosi berbentuk pil/lingkaran | Layar Mood Check |
| Tombol Utama | Isi warna Lavender Primer, teks putih, rounded penuh | Aksi utama (Simpan, Konfirmasi, Pesan) |
| Tombol Sekunder | Outline lavender, latar transparan | Aksi alternatif (Batal, Lewati) |
| Area Input Jurnal | Text area lembut dengan placeholder suportif (mis. "Apa yang kamu rasakan hari ini?") | Jurnal Harian |
| Kartu Psikolog | Foto, nama, rating bintang, tarif, tombol "Pilih" | Daftar Konsultasi |
| Kalender Interaktif | Grid tanggal dengan slot waktu tersedia disorot | Penjadwalan Konsultasi |
| Animasi Lingkaran Napas | Lingkaran yang mengembang/mengempis mengikuti ritme napas | Panduan Pernapasan |
| Avatar Anonim | Avatar generik/inisial tanpa identitas asli | Calm Circle |
| Navigasi Bawah | 4 ikon utama tetap terlihat di seluruh layar inti | Navigasi global |

## 10. Aksesibilitas

- Kontras warna teks terhadap latar tetap memenuhi standar **WCAG AA** meski menggunakan palet pastel (mis. teks `#3A2E4D` di atas latar `#F6F2FB`/`#D9CCF0`).
- Ukuran teks dapat diperbesar tanpa merusak tata letak.
- Seluruh ikon memiliki label deskriptif untuk pembaca layar (screen reader).
- Hindari animasi berkedip cepat atau transisi mendadak yang berpotensi mengganggu pengguna dengan kondisi sensitif.
- Bahasa antarmuka bernada suportif dan personal, hindari istilah klinis yang terkesan menghakimi (mis. gunakan "Bagaimana perasaanmu hari ini?" bukan "Laporkan status emosi").

## 11. Rekomendasi Tambahan

*Bagian ini merupakan rekomendasi tim desain di luar cakupan dokumen konsep awal, namun relevan untuk aplikasi kesehatan mental:*

- **Akses cepat bantuan krisis** — tombol/menu yang selalu terlihat (mis. di Beranda dan Profil) menuju informasi hotline kesehatan mental resmi, untuk situasi darurat di luar kapasitas aplikasi.
- **Mode Privasi/Samar** — opsi menyamarkan tampilan aplikasi dengan cepat (mis. ikon/nama netral di app switcher) mengingat sensitivitas topik yang dibahas pengguna.
- **Mode Gelap Lavender** — varian palet lavender gelap untuk kenyamanan penggunaan malam hari, tetap mempertahankan nuansa menenangkan.
