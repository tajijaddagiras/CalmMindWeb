# Product Requirements Document (PRD)
## CalmMind — Aplikasi Kesehatan Mental Digital

| | |
|---|---|
| **Versi Dokumen** | 1.0 |
| **Tanggal** | 3 Juli 2026 |
| **Status** | Draft |
| **Sumber** | Dokumen Konsep Prototipe CalmMind (SIK_5) |
| **Tagline** | "Tempat aman untuk menenangkan pikiran" |

---

## Daftar Isi
1. [Ringkasan Eksekutif](#1-ringkasan-eksekutif)
2. [Latar Belakang & Masalah](#2-latar-belakang--masalah)
3. [Tujuan Produk](#3-tujuan-produk)
4. [Target Pengguna & Persona](#4-target-pengguna--persona)
5. [Ruang Lingkup](#5-ruang-lingkup)
6. [Kebutuhan Fungsional](#6-kebutuhan-fungsional)
7. [Kebutuhan Non-Fungsional](#7-kebutuhan-non-fungsional)
8. [Model Bisnis](#8-model-bisnis)
9. [Metrik Keberhasilan](#9-metrik-keberhasilan)
10. [Fase Pengembangan (Roadmap)](#10-fase-pengembangan-roadmap)
11. [Asumsi & Batasan](#11-asumsi--batasan)
12. [Risiko & Mitigasi](#12-risiko--mitigasi)
13. [Dampak yang Diharapkan](#13-dampak-yang-diharapkan)

---

## 1. Ringkasan Eksekutif

CalmMind adalah aplikasi kesehatan mental digital yang berfungsi sebagai ruang aman terintegrasi bagi pengguna untuk mengenali emosi, merefleksikan pikiran, menenangkan diri, terhubung dengan komunitas sebaya, dan mengakses layanan psikolog profesional — semua dalam satu platform yang dapat diakses kapan saja secara privat.

Produk ini dibangun di atas enam fitur inti yang saling melengkapi: **Mood Check**, **Jurnal Harian**, **Meditasi**, **Artikel**, **Calm Circle**, dan **Konsultasi**. Identitas visual menggunakan nuansa lavender yang menenangkan secara psikologis, dengan logo hati bertumpuk berisi ikon senyuman sebagai simbol kedamaian dan penerimaan diri.

## 2. Latar Belakang & Masalah

Tekanan kerja, tuntutan akademik, dan kecemasan sosial dalam kehidupan modern membuat kesehatan mental menjadi perhatian utama masyarakat. Empat masalah inti yang mendasari kebutuhan produk ini:

- **Kesulitan mengenali emosi** — banyak individu bingung mengidentifikasi apa yang sedang mereka rasakan.
- **Stigma sosial** — rasa takut dan malu membuat orang enggan mencari bantuan profesional secara terbuka.
- **Rasa terisolasi** — minimnya ruang aman untuk berbagi cerita tanpa takut dihakimi.
- **Hambatan akses layanan profesional** — jarak, biaya, dan waktu membatasi akses ke psikolog klinis.

## 3. Tujuan Produk

| ID | Tujuan |
|---|---|
| O1 | Memungkinkan pengguna melacak kondisi psikologis harian secara mandiri melalui pelacakan emosi. |
| O2 | Menyediakan ruang aman digital untuk berbagi cerita tanpa dihakimi melalui dukungan kelompok sepadan. |
| O3 | Meningkatkan aksesibilitas konsultasi psikolog klinis secara daring tanpa hambatan jarak. |
| O4 | Menyediakan alat bantu pereda stres instan (relaksasi, pernapasan). |
| O5 | Meningkatkan literasi kesehatan mental masyarakat secara umum. |

## 4. Target Pengguna & Persona

**Persona 1 — Sarah, Mahasiswa Tingkat Akhir (22 tahun)**
- *Latar belakang:* Tekanan akademik tinggi menjelang kelulusan, sering overthinking di malam hari.
- *Tujuan:* Ingin cara cepat menenangkan diri sebelum tidur dan memahami pola emosinya.
- *Frustrasi:* Tidak punya waktu/biaya untuk konsultasi rutin ke psikolog.
- *Peran CalmMind:* Meditasi & Jurnal Harian sebagai outlet harian yang cepat diakses.

**Persona 2 — Bima, Profesional Muda (27 tahun)**
- *Latar belakang:* Beban kerja tinggi, stres kronis namun jarang menyadarinya.
- *Tujuan:* Memantau kondisi emosinya secara konsisten dan mendapat rekomendasi penanganan awal.
- *Frustrasi:* Ragu terbuka pada rekan kerja/keluarga soal stres yang dialami.
- *Peran CalmMind:* Mood Check harian + Konsultasi psikolog saat kondisi memburuk.

**Persona 3 — Dinda, Individu dengan Kecemasan Sosial (30 tahun)**
- *Latar belakang:* Mengalami kecemasan sosial, enggan mencari bantuan karena stigma di lingkungannya.
- *Tujuan:* Ingin merasa tidak sendirian dan terhubung dengan orang yang mengalami hal serupa, secara anonim.
- *Frustrasi:* Takut dihakimi jika bercerita secara terbuka.
- *Peran CalmMind:* Calm Circle sebagai ruang komunitas anonim berbasis topik kecemasan spesifik.

## 5. Ruang Lingkup

### 5.1 Dalam Lingkup (Versi 1.0)
Enam fitur inti: Mood Check, Jurnal Harian, Meditasi, Artikel, Calm Circle, Konsultasi (telehealth).

### 5.2 Di Luar Lingkup (Versi Awal)
*Catatan: bagian ini merupakan asumsi tim produk untuk membatasi cakupan MVP, karena tidak dirinci dalam dokumen konsep awal.*
- Diagnosis klinis otomatis berbasis AI
- Integrasi asuransi kesehatan
- Layanan tanggap darurat real-time (di luar rujukan ke hotline krisis eksternal)
- Dukungan multi-bahasa (fase awal berfokus Bahasa Indonesia)

## 6. Kebutuhan Fungsional

### 6.1 Mood Check (FR-1)
Langkah awal interogasi emosi pengguna dengan umpan balik instan.

- **FR-1.1** — Pengguna dapat memilih indikator perasaan (mis. senang, cemas, sedih, marah, netral) dari daftar visual.
- **FR-1.2** — Sistem menampilkan umpan balik instan sesuai mood yang dipilih (tips penanganan awal).
- **FR-1.3** — Jika pengguna memilih mood cemas/negatif, sistem merekomendasikan teknik napas dalam atau relaksasi instan.
- **FR-1.4** — Riwayat mood tersimpan dan dapat dilihat dalam bentuk tren harian/mingguan.

*Kriteria Penerimaan:* Pengguna dapat menyelesaikan satu siklus Mood Check dalam ≤ 3 tap, dan menerima rekomendasi relevan tanpa jeda signifikan.

### 6.2 Jurnal Harian (FR-2)
Ruang refleksi pribadi tertulis.

- **FR-2.1** — Pengguna dapat menulis entri jurnal bebas dengan teks tanpa batas format kaku.
- **FR-2.2** — Entri tersimpan otomatis dan terorganisir berdasarkan tanggal.
- **FR-2.3** — Pengguna dapat meninjau kembali entri sebelumnya untuk melacak pola pikir dari waktu ke waktu.
- **FR-2.4** — Entri jurnal bersifat privat, hanya dapat diakses oleh pemilik akun.

### 6.3 Meditasi (FR-3)
Relaksasi instan melalui dua menu utama.

- **FR-3.1 (Terapi Musik)** — Pengguna dapat memutar instrumen musik (piano akustik, suara alam) untuk relaksasi.
- **FR-3.2 (Panduan Pernapasan)** — Sistem menyediakan panduan pernapasan interaktif dengan visual hitungan tarik–tahan–embuskan napas.
- **FR-3.3** — Sesi meditasi memiliki durasi yang dapat dipilih pengguna (mis. 3, 5, 10 menit).

### 6.4 Artikel (FR-4)
Konten edukatif kuratif.

- **FR-4.1** — Sistem menampilkan daftar artikel terkategori (overthinking, manajemen stres, pengembangan diri).
- **FR-4.2** — Pengguna dapat mencari dan memfilter artikel berdasarkan kategori/topik.
- **FR-4.3** — Pengguna dapat menyimpan (bookmark) artikel untuk dibaca kembali.

### 6.5 Calm Circle (FR-5)
Ruang diskusi komunitas berbasis topik kecemasan spesifik, anonim.

- **FR-5.1** — Pengguna dapat bergabung ke grup diskusi berdasarkan topik kecemasan spesifik.
- **FR-5.2** — Pengguna dapat memposting cerita/komentar secara anonim (identitas asli disembunyikan).
- **FR-5.3** — Pengguna dapat memberi dukungan (reaksi/balasan) pada postingan pengguna lain.
- **FR-5.4** — Tersedia fitur lapor (report) konten untuk moderasi keamanan komunitas.
- **FR-5.5** — Sistem memiliki mekanisme moderasi konten (otomatis dan/atau manual) untuk mencegah konten berbahaya.

### 6.6 Konsultasi (FR-6)
Layanan premium telehealth dengan psikolog berlisensi.

- **FR-6.1** — Pengguna dapat menelusuri daftar psikolog berlisensi berdasarkan rating dan tarif.
- **FR-6.2** — Pengguna dapat melihat profil detail psikolog (spesialisasi, pengalaman, ulasan).
- **FR-6.3** — Pengguna dapat memilih jadwal melalui kalender interaktif sesuai slot yang tersedia.
- **FR-6.4** — Sistem menampilkan konfirmasi pemesanan (ringkasan sesi, biaya, metode pembayaran).
- **FR-6.5** — Sistem mengirim notifikasi konfirmasi dan pengingat sebelum sesi dimulai.
- **FR-6.6** — Sesi konsultasi berlangsung melalui panggilan video di dalam aplikasi untuk menjaga privasi.

## 7. Kebutuhan Non-Fungsional

| Kategori | Kebutuhan |
|---|---|
| **Keamanan & Privasi Data** | Enkripsi data pengguna (khususnya data emosi, jurnal, dan riwayat konsultasi) sesuai UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP), mengingat data kesehatan mental tergolong data pribadi yang bersifat spesifik. |
| **Anonimitas** | Identitas pengguna di Calm Circle tidak boleh terekspos ke pengguna lain tanpa persetujuan eksplisit. |
| **Performa** | Waktu muat halaman utama < 2 detik; kualitas panggilan video stabil pada koneksi minimum 3G/4G. |
| **Skalabilitas** | Arsitektur mampu menangani pertumbuhan pengguna aktif tanpa penurunan performa signifikan. |
| **Aksesibilitas** | Memenuhi standar kontras warna WCAG AA, mendukung pembesaran teks, kompatibel dengan pembaca layar. |
| **Ketersediaan Platform** | Tersedia di iOS dan Android (asumsi berbasis deskripsi aplikasi mobile pada dokumen konsep). |
| **Keandalan** | Uptime tinggi khususnya untuk fitur Konsultasi (booking & video call) agar tidak mengganggu sesi terjadwal. |

## 8. Model Bisnis

*Rekomendasi berdasarkan istilah "layanan premium" pada fitur Konsultasi di dokumen konsep.*

- **Model Freemium** — Mood Check, Jurnal Harian, Meditasi, Artikel, dan Calm Circle tersedia gratis sebagai fondasi literasi dan dukungan mandiri.
- **Layanan Berbayar** — Konsultasi psikolog dikenakan biaya per sesi, dengan opsi tarif bervariasi sesuai psikolog yang dipilih.
- **Potensi ke Depan** — Paket langganan bulanan yang mencakup diskon sesi konsultasi atau konten premium tambahan.

## 9. Metrik Keberhasilan

| Metrik | Deskripsi |
|---|---|
| DAU/MAU | Rasio pengguna aktif harian terhadap bulanan, indikator keterlibatan rutin. |
| Frekuensi Mood Check | Rata-rata jumlah Mood Check per pengguna per minggu. |
| Retensi Jurnal | Persentase pengguna yang menulis jurnal secara konsisten (mis. ≥ 3x/minggu). |
| Tingkat Konversi Konsultasi | Persentase pengguna yang menyelesaikan pemesanan sesi konsultasi. |
| Engagement Calm Circle | Jumlah postingan, balasan, dan reaksi per pengguna aktif. |
| Skor Kepuasan (CSAT/NPS) | Umpan balik kepuasan pengguna terhadap fitur secara berkala. |
| Indikator Kesejahteraan | Perubahan skor kecemasan self-report dari waktu ke waktu (melalui survei ringan dalam aplikasi). |

## 10. Fase Pengembangan (Roadmap)

*Rekomendasi pentahapan MVP, tidak tercantum eksplisit pada dokumen konsep asli.*

| Fase | Fitur | Fokus |
|---|---|---|
| **Fase 1 (MVP)** | Mood Check, Jurnal Harian, Meditasi | Validasi kebutuhan dasar deteksi & relaksasi mandiri |
| **Fase 2** | Artikel, Calm Circle | Membangun literasi dan komunitas dukungan sebaya |
| **Fase 3** | Konsultasi | Onboarding psikolog berlisensi, sistem pembayaran, dan infrastruktur video call |

## 11. Asumsi & Batasan

- Aplikasi diasumsikan berbentuk aplikasi mobile (iOS/Android) berdasarkan gaya deskripsi UI pada dokumen konsep.
- Proses verifikasi lisensi psikolog dilakukan di luar aplikasi (kerja sama dengan lembaga/asosiasi psikologi resmi) sebelum psikolog dapat onboarding.
- Sistem pembayaran pihak ketiga (payment gateway) diperlukan namun belum ditentukan pada tahap konsep ini.
- Bahasa dan konten awal berfokus pada pengguna berbahasa Indonesia.

## 12. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Konten berbahaya di Calm Circle (mis. konten self-harm) | Tinggi | Moderasi konten otomatis + tim moderator manusia + fitur lapor pengguna |
| Pengguna dalam krisis akut tidak mendapat bantuan tepat waktu | Tinggi | Sediakan akses cepat ke hotline krisis kesehatan mental yang selalu terlihat di layar utama |
| Kebocoran data kesehatan mental yang sensitif | Tinggi | Enkripsi end-to-end, kepatuhan terhadap UU PDP, kontrol akses ketat |
| Psikolog dengan kredensial tidak valid | Sedang | Proses verifikasi lisensi wajib sebelum onboarding ke platform |
| Ketergantungan berlebih pada aplikasi tanpa penanganan profesional saat dibutuhkan | Sedang | Sistem mendorong rujukan ke Konsultasi/psikolog saat pola mood menunjukkan tren negatif berkelanjutan |

## 13. Dampak yang Diharapkan

- **Individu** — Peningkatan kesadaran emosi diri, penurunan tingkat kecemasan harian, pertolongan pertama cepat saat serangan panik.
- **Sosial** — Berkurangnya stigma negatif seputar kesehatan mental melalui ekosistem komunitas yang lebih empatik.
- **Layanan Kesehatan** — Peningkatan efisiensi akses masyarakat terhadap bantuan psikolog profesional tanpa terkendala jarak, waktu, maupun rasa canggung menuju klinik fisik.
