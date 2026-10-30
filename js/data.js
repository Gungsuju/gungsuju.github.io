// ============================================================
//  ISI KONTEN — edit file ini saja untuk mengganti teks halaman.
//  Semua data di bawah adalah contoh; ganti sesuai kebutuhan.
// ============================================================

export const site = {
  name: "Gungsuju",
  tagline: "Membangun hal-hal kecil yang berguna di web.",
  intro:
    "Halo! Ini situs pribadiku. Di sini ada proyek, skill, dan cara menghubungiku.",
};

export const links = [
  { label: "GitHub", href: "https://github.com/Gungsuju", hint: "Lihat kode saya" },
  // { label: "LinkedIn", href: "https://linkedin.com/in/...", hint: "Profil profesional" },
];

// category dipakai untuk tab filter. Tambah/hapus proyek sesuka hati.
export const projects = [
  {
    title: "Proyek Contoh Satu",
    category: "Web",
    summary: "Ringkasan singkat proyek yang tampil di kartu.",
    detail:
      "Penjelasan lengkap proyek. Muncul di jendela dialog saat kartu diklik. Ceritakan masalah, solusi, dan hasilnya.",
    tags: ["JavaScript", "CSS"],
    href: "https://github.com/Gungsuju",
  },
  {
    title: "Proyek Contoh Dua",
    category: "Web",
    summary: "Halaman statis yang ringan dan cepat.",
    detail: "Detail proyek kedua. Ganti dengan ceritamu sendiri.",
    tags: ["HTML", "React"],
  },
  {
    title: "Proyek Contoh Tiga",
    category: "Tools",
    summary: "Skrip kecil untuk mengotomatiskan pekerjaan.",
    detail: "Detail proyek ketiga. Ganti dengan ceritamu sendiri.",
    tags: ["Python"],
  },
];

export const skills = [
  { name: "Frontend", items: ["HTML", "CSS", "JavaScript", "React"] },
  { name: "Tools", items: ["Git", "GitHub Pages", "VS Code"] },
];

export const faq = [
  {
    q: "Bagaimana cara menghubungi saya?",
    a: "Lewat tautan GitHub di bagian atas atau bawah halaman.",
  },
  {
    q: "Bagaimana cara mengedit halaman ini?",
    a: "Ubah teks di js/data.js, warna di css/styles.css, lalu commit. GitHub Pages memperbarui situs otomatis.",
  },
];
