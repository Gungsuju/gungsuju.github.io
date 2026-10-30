# Gungsuju.github.io

Situs statis berbasis React + Radix UI **tanpa build step** (tanpa Node/npm/bundler) dan tanpa Bootstrap. Langsung jalan di GitHub Pages.

## Struktur

| File | Fungsi |
| --- | --- |
| `index.html` | Titik masuk + import map (daftar library dari CDN esm.sh) |
| `css/styles.css` | Semua gaya. Warna/ukuran ada di variabel `:root` bagian atas |
| `js/data.js` | **Isi konten** (nama, proyek, skill, FAQ, tautan). File yang paling sering diedit |
| `js/app.js` | Komponen React (Tabs, Dialog, Accordion, Switch, Tooltip dari Radix UI) |

## Cara edit

- Ganti teks, proyek, skill, FAQ: edit `js/data.js`.
- Ganti warna/font/jarak: edit variabel di `css/styles.css`.
- Ubah tampilan/komponen: edit `js/app.js` (memakai `htm`: sintaks mirip JSX tanpa kompilasi).
- Edit langsung di GitHub (ikon pensil) atau jalankan lokal: `python3 -m http.server`, lalu buka `http://localhost:8000`.

## Catatan

- Library dimuat dari `https://esm.sh`, jadi perlu koneksi internet saat halaman dibuka.
- Versi library dikunci di import map pada `index.html`.
- Aktifkan GitHub Pages: Settings → Pages → Deploy from a branch → `main` / root.
