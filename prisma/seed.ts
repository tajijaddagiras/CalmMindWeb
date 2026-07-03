import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // ── Users ──────────────────────────────────────────────
  const existingAdmin = await prisma.user.findUnique({ where: { email: 'admin@calmind.com' } });
  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        name: 'Super Admin',
        email: 'admin@calmind.com',
        password: await bcrypt.hash('admin123', 10),
        role: 'ADMIN',
      },
    });
    console.log('✅ Akun Admin dibuat: admin@calmind.com / admin123');
  } else {
    console.log('ℹ️  Akun Admin sudah ada.');
  }

  const existingUser = await prisma.user.findUnique({ where: { email: 'user@calmind.com' } });
  if (!existingUser) {
    await prisma.user.create({
      data: {
        name: 'Pengguna Uji Coba',
        email: 'user@calmind.com',
        password: await bcrypt.hash('user123', 10),
        role: 'USER',
      },
    });
    console.log('✅ Akun User dibuat: user@calmind.com / user123');
  } else {
    console.log('ℹ️  Akun User sudah ada.');
  }

  // ── Artikel ────────────────────────────────────────────
  const articleCount = await prisma.article.count();
  if (articleCount === 0) {
    await prisma.article.createMany({
      data: [
        {
          title: '5 Tanda Kamu Sedang Overthinking dan Cara Mengatasinya',
          category: 'Overthinking',
          content: `Overthinking adalah kondisi di mana pikiran terus berputar tanpa henti, menganalisis skenario buruk yang belum tentu terjadi. Ciri-cirinya meliputi: sulit tidur karena pikiran aktif, selalu memikirkan "bagaimana jika", merasa lelah mental meski tidak banyak bergerak, dan terlalu menganalisis perkataan orang lain.\n\nCara mengatasi:\n1. Sadar dan akui bahwa kamu sedang overthinking\n2. Tulis kekhawatiranmu di jurnal\n3. Latihan pernapasan 4-7-8 setiap hari\n4. Batasi konsumsi media sosial\n5. Bicarakan dengan orang yang kamu percaya atau profesional`,
        },
        {
          title: 'Manajemen Stres: Teknik Sederhana untuk Hari yang Berat',
          category: 'Manajemen Stres',
          content: `Stres adalah respons alami tubuh terhadap tekanan. Namun stres yang tidak dikelola bisa merusak kesehatan fisik dan mental jangka panjang.\n\nTeknik manajemen stres yang efektif:\n1. Teknik STOP (Stop, Take a breath, Observe, Proceed)\n2. Olahraga ringan 30 menit sehari\n3. Tidur 7-8 jam setiap malam\n4. Praktik mindfulness dan meditasi\n5. Prioritaskan pekerjaan dengan metode Eisenhower Matrix\n6. Jangan ragu meminta bantuan`,
        },
        {
          title: 'Membangun Rutinitas Pagi yang Mendukung Kesehatan Mental',
          category: 'Pengembangan Diri',
          content: `Pagi hari adalah fondasi untuk keseluruhan harimu. Rutinitas pagi yang baik dapat secara signifikan meningkatkan suasana hati, produktivitas, dan ketahanan mental.\n\nRutinitas pagi yang direkomendasikan:\n1. Bangun di waktu yang konsisten\n2. Hindari ponsel di 30 menit pertama\n3. Minum segelas air putih\n4. Luangkan 10 menit untuk bersyukur atau menulis jurnal\n5. Olahraga ringan atau peregangan\n6. Sarapan bergizi`,
        },
        {
          title: 'Mengenal Kecemasan Sosial: Kamu Tidak Sendirian',
          category: 'Overthinking',
          content: `Kecemasan sosial bukan sekadar rasa malu biasa. Ini adalah kondisi nyata yang membuat seseorang merasa sangat takut dihakimi, dipermalukan, atau ditolak dalam situasi sosial.\n\nGejala umum:\n- Detak jantung cepat saat bertemu orang baru\n- Menghindari situasi sosial\n- Terlalu menganalisis interaksi setelah kejadian\n- Takut berbicara di depan umum\n\nApa yang bisa dilakukan:\n1. Mulai kecil: sapa satu orang baru per hari\n2. Latih pernapasan sebelum situasi sosial\n3. Bergabung dengan komunitas yang aman seperti Calm Circle\n4. Pertimbangkan terapi dengan psikolog`,
        },
        {
          title: 'Self-Compassion: Belajar Menjadi Teman Bagi Diri Sendiri',
          category: 'Pengembangan Diri',
          content: `Self-compassion (kasih sayang pada diri sendiri) bukan berarti memanjakan diri atau melarikan diri dari tanggung jawab. Ini adalah sikap memperlakukan diri sendiri dengan kebaikan yang sama seperti kamu memperlakukan sahabat baik.\n\nTiga komponen self-compassion:\n1. Kindness to Self – tidak menyalahkan diri berlebihan\n2. Common Humanity – menyadari penderitaan adalah bagian dari pengalaman manusia\n3. Mindfulness – menghadapi perasaan dengan seimbang\n\nLatihan self-compassion:\n- Tulis surat untuk dirimu sendiri saat merasa gagal\n- Ucapkan afirmasi positif setiap pagi\n- Berikan dirimu izin untuk beristirahat`,
        },
        {
          title: 'Seni Menetapkan Batasan (Boundaries) yang Sehat',
          category: 'Manajemen Stres',
          content: `Batasan yang sehat adalah fondasi dari hubungan yang sehat — baik dengan orang lain maupun dengan diri sendiri. Tanpa batasan, kita rentan terhadap kelelahan emosional dan rasa kesal yang menumpuk.\n\nJenis batasan:\n- Batasan emosional: tidak bertanggung jawab atas perasaan orang lain\n- Batasan waktu: melindungi waktu dan energimu\n- Batasan digital: kapan kamu tersedia dan tidak\n\nCara memulai:\n1. Identifikasi apa yang terasa tidak nyaman\n2. Komunikasikan dengan jelas dan tanpa permintaan maaf berlebihan\n3. Konsisten dalam menegakkan batasanmu`,
        },
      ],
    });
    console.log('✅ 6 artikel berhasil dibuat.');
  } else {
    console.log('ℹ️  Artikel sudah ada.');
  }

  // ── Calm Circle Groups ─────────────────────────────────
  const groupCount = await prisma.communityGroup.count();
  if (groupCount === 0) {
    await prisma.communityGroup.createMany({
      data: [
        { name: 'Ruang Kecemasan', topic: 'Kecemasan & Overthinking' },
        { name: 'Berbagi Rasa', topic: 'Curhat & Dukungan Emosional' },
        { name: 'Burnout & Kerja', topic: 'Stres Pekerjaan & Akademik' },
        { name: 'Tumbuh Bersama', topic: 'Pengembangan Diri & Positivity' },
      ],
    });
    console.log('✅ 4 grup Calm Circle berhasil dibuat.');
  } else {
    console.log('ℹ️  Grup Calm Circle sudah ada.');
  }

  // ── Psychologists ──────────────────────────────────────
  const psychoCount = await prisma.psychologist.count();
  if (psychoCount === 0) {
    await prisma.psychologist.createMany({
      data: [
        {
          name: 'Dr. Anisa Rahmawati, M.Psi.',
          specialization: 'Kecemasan & Depresi',
          rating: 4.9,
          price: 150000,
          experience: 8,
          about: 'Spesialis dalam penanganan gangguan kecemasan, depresi, dan trauma. Menggunakan pendekatan CBT dan Mindfulness-Based Therapy. Berpengalaman menangani klien dari berbagai latar belakang.',
        },
        {
          name: 'Budi Santoso, M.Psi., Psikolog',
          specialization: 'Stres Kerja & Burnout',
          rating: 4.8,
          price: 120000,
          experience: 6,
          about: 'Berfokus pada penanganan stres pekerjaan, burnout, dan work-life balance. Telah membantu ratusan profesional muda menemukan kembali semangat kerja dan keseimbangan hidup.',
        },
        {
          name: 'Siti Nurhaliza, M.Psi.',
          specialization: 'Kecemasan Sosial & Hubungan',
          rating: 4.7,
          price: 100000,
          experience: 5,
          about: 'Ahli dalam menangani kecemasan sosial, fobia, dan masalah hubungan interpersonal. Menggunakan pendekatan humanistik dan solution-focused therapy untuk membantu klien menemukan kekuatan mereka.',
        },
        {
          name: 'Dr. Reza Pratama, M.Psi.',
          specialization: 'Trauma & PTSD',
          rating: 4.9,
          price: 175000,
          experience: 10,
          about: 'Psikolog klinis berpengalaman dalam penanganan trauma, PTSD, dan grief. Certified EMDR therapist. Menciptakan ruang yang aman dan tidak menghakimi untuk setiap klien.',
        },
      ],
    });
    console.log('✅ 4 psikolog berhasil dibuat.');
  } else {
    console.log('ℹ️  Data psikolog sudah ada.');
  }

  console.log('\n🎉 Seeding selesai!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
