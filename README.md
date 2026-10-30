# Gungsuju.github.io

Situs statis berbasis React + Radix UI + Tailwind CSS **tanpa build step** (tanpa Node/npm/bundler) dan tanpa Bootstrap. Langsung jalan di GitHub Pages.

## Struktur

| File | Fungsi |
| --- | --- |
| `index.html` | Titik masuk: Tailwind (Play CDN) + konfigurasi, warna aksen, dan import map library JS (esm.sh) |
| `js/data.js` | **Isi konten** (nama, proyek, skill, FAQ, tautan). File yang paling sering diedit |
| `js/app.js` | Komponen React (Tabs, Dialog, Accordion, Switch, Tooltip dari Radix UI) yang diberi gaya dengan class Tailwind |

## Cara edit

- Ganti teks, proyek, skill, FAQ: edit `js/data.js`.
- Ganti warna aksen: ubah `--accent` (angka RGB) di blok `<style>` pada `index.html`.
- Ubah tampilan: ganti class Tailwind di `js/app.js`. Kelas yang dipakai berulang (tombol, kartu, tag) ada di bagian atas file.
- Komponen memakai `htm`: sintaks mirip JSX tanpa kompilasi.
- Edit langsung di GitHub (ikon pensil) atau jalankan lokal: `python3 -m http.server`, lalu buka `http://localhost:8000`.

## Catatan

- Tailwind dimuat lewat Play CDN (versi dikunci). Cocok untuk situs kecil; Tailwind sendiri menyebutnya untuk pengembangan, bukan produksi skala besar.
- Library dimuat dari CDN (`cdn.tailwindcss.com` dan `esm.sh`), jadi perlu koneksi internet saat halaman dibuka.
- Aktifkan GitHub Pages: Settings → Pages → Deploy from a branch → `main` / root.
