# Balé — Ruang Paruman Krama

Balé adalah aplikasi forum diskusi yang dibingkai sebagai **balé banjar**, yaitu balai pertemuan warga di Bali / tempat krama (anggota) bermusyawarah. Aplikasi ini memakai [Dicoding Forum API](https://forum-api.dicoding.dev/v1/).

## Konsep

Setiap fitur forum diberi padanan dari kehidupan banjar:

| Forum umum | Balé | Makna |
|---|---|---|
| Thread | Paruman | Rapat atau musyawarah warga |
| Kategori | Topik | Pokok bahasan sebuah paruman |
| Komentar | Tanggapan | Pendapat krama dalam paruman |
| Pengguna | Krama | Anggota banjar |
| Leaderboard | Krama Teraktif | Prasasti krama paling aktif |

Identitas visual diambil dari motif kain poleng, warna tanah dan batu padas, serta warna prada keemasan sebagai aksen.

## Fitur

- Daftar akun dan masuk dengan sesi yang tetap tersimpan setelah halaman di-refresh.
- Daftar paruman berisi judul, cuplikan isi, topik, waktu, jumlah tanggapan, serta nama dan avatar pembuat.
- Filter paruman berdasarkan topik, dilakukan sepenuhnya di sisi front-end.
- Detail paruman beserta seluruh tanggapan.
- Membuat paruman baru dan memberi tanggapan.
- Vote (setuju/tidak setuju) pada paruman dan tanggapan dengan *optimistic update* dan *rollback* jika gagal.
- Halaman Krama Teraktif bergaya prasasti.
- Loading indicator setiap kali memuat data dari API.

## Hak Akses

| Aksi | Tamu | Krama (sudah masuk) |
|---|---|---|
| Melihat paruman, detail, tanggapan, Krama Teraktif | ✅ | ✅ |
| Membuka halaman Masuk dan Daftar | ✅ | ❌ dialihkan ke beranda |
| Membuat paruman | ❌ dialihkan ke Masuk | ✅ |
| Memberi tanggapan | ❌ | ✅ |
| Memberi vote | ❌ | ✅ |

Hak akses ditegakkan oleh server melalui token Bearer pada setiap request yang mengubah data. Di sisi front-end, status masuk ditentukan oleh `authUser` di Redux store dan dipakai untuk mengatur routing, tampilan, dan pemeriksaan di thunk. Isi paruman dan tanggapan dari pengguna lain dirender sebagai teks biasa untuk mencegah XSS.

## Teknologi

- React 18 dengan TypeScript, dibangun menggunakan Vite
- Redux (`@reduxjs/toolkit` untuk `configureStore`, action dan reducer ditulis manual) dan React Redux
- React Router
- `react-redux-loading-bar`
- ESLint dengan [Dicoding Academy JavaScript Style Guide](https://github.com/dicodingacademy/javascript-style-guide)

## Arsitektur

Data mengalir satu arah. Komponen tidak pernah memanggil API secara langsung.

```
Page/Component ──dispatch(thunk)──► Thunk ──► utils/api.ts ──► Dicoding Forum API
      ▲                               │
      │                          dispatch(action)
useAppSelector                        ▼
      └──────── Redux Store ◄──── Reducer
```

```
src/
├── components/   → komponen UI reusable (auth, banjar, common, krama, layout, paruman, response)
├── hooks/        → custom hook (useInput)
├── pages/        → halaman yang terhubung ke store
├── states/       → Redux: satu folder per slice (action.ts + reducer.ts), store, typed hooks
├── types/        → tipe data API
└── utils/        → wrapper API, helper vote, format waktu dan teks
```

## Menjalankan Proyek

Prasyarat: Node.js versi 20 atau lebih baru.

```bash
npm install
npm run dev
```

Aplikasi berjalan di `http://localhost:5173`.

## Skrip

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Menjalankan server pengembangan |
| `npm run build` | Pemeriksaan tipe lalu build produksi ke folder `dist` |
| `npm run preview` | Menjalankan hasil build secara lokal |
| `npm run lint` | Memeriksa kode dengan ESLint |
| `npm run typecheck` | Memeriksa tipe TypeScript |

## Rute

| Path | Halaman |
|---|---|
| `/` | Paruman (daftar thread) |
| `/paruman/:id` | Detail paruman |
| `/paruman/baru` | Ajukan paruman baru (wajib masuk) |
| `/krama-teraktif` | Krama Teraktif |
| `/masuk` | Masuk |
| `/daftar` | Daftar |
