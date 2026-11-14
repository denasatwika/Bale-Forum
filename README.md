# Balé — Ruang Paruman Krama

Balé adalah aplikasi forum diskusi yang dibingkai sebagai **balé banjar**, yaitu balai pertemuan warga di Bali / tempat krama (anggota) bermusyawarah. Aplikasi ini memakai [Dicoding Forum API](https://forum-api.dicoding.dev/v1/).

**Demo:** https://bale-forum.vercel.app

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

**Aplikasi**

- React 18 dengan TypeScript, dibangun menggunakan Vite
- Bootstrap 5, dengan tema Balé didefinisikan sebagai variabel CSS
- Redux (`@reduxjs/toolkit` untuk `configureStore`, action dan reducer ditulis manual) dan React Redux
- React Router
- `react-redux-loading-bar`

**Pengujian dan kualitas kode**

- Vitest, jsdom, React Testing Library, dan `user-event` untuk unit dan integration test
- Cypress untuk end-to-end test
- ESLint dengan [Dicoding Academy JavaScript Style Guide](https://github.com/dicodingacademy/javascript-style-guide) dan `eslint-plugin-cypress`

**CI/CD**

- GitHub Actions untuk Continuous Integration
- Vercel untuk Continuous Deployment

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
├── utils/        → wrapper API, helper vote, format waktu dan teks
└── setupTests.ts → konfigurasi Vitest (matcher jest-dom dan cleanup DOM)

cypress/
└── e2e/          → skenario end-to-end (*.cy.ts)
```

Setiap file pengujian unit dan integration diletakkan di folder `_test` di dalam folder unit yang diujinya, misalnya `src/states/threads/_test/reducer.test.ts` dan `src/components/auth/_test/LoginInput.test.tsx`.

## Menjalankan Proyek

Prasyarat: Node.js versi 22.12 atau lebih baru.

```bash
npm install
npm run dev
```

Aplikasi berjalan di `http://localhost:5173`.

## Skrip

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Menjalankan server pengembangan di port 5173 |
| `npm run build` | Pemeriksaan tipe lalu build produksi ke folder `dist` |
| `npm run preview` | Menjalankan hasil build secara lokal |
| `npm run lint` | Memeriksa kode dengan ESLint |
| `npm run typecheck` | Memeriksa tipe TypeScript |
| `npm test` | Menjalankan unit dan integration test sekali jalan |
| `npm run test:watch` | Menjalankan Vitest dalam mode watch |
| `npm run e2e` | Menjalankan end-to-end test; server pengembangan dinyalakan dan dimatikan otomatis |
| `npm run cypress:open` | Membuka dashboard Cypress interaktif (server pengembangan harus sudah berjalan) |

## Pengujian

Pengujian disusun bertingkat. Setiap file pengujian diawali blok komentar berisi skenario yang diuji.

| Tingkat | Cakupan | Alat |
|---|---|---|
| Unit | Reducer `threadDetail`, `threads`, `authUser`, `isPreload`, `leaderboards`; helper `utils` | Vitest |
| Integration | Thunk `asyncSetAuthUser`, `asyncToggleVoteThread`, `asyncPreloadProcess`, `asyncPopulateUsersAndThreads`, `asyncAddComment` | Vitest dengan test double (dummy, stub, spy, mock) |
| Komponen | `Avatar`, `LoginInput`, `VoteControl`, `BanjarList` | React Testing Library dan `user-event` |
| End-to-end | Alur login: tampilan halaman, validasi email kosong, kredensial salah, login berhasil | Cypress |

Test thunk tidak pernah memanggil API sungguhan; setiap method `utils/api.ts` diganti test double dan dikembalikan otomatis setelah setiap test (`restoreMocks`).

Test end-to-end berjalan terhadap Dicoding Forum API sungguhan. Untuk skenario login berhasil, test mendaftarkan akun baru lewat API setiap kali dijalankan, sehingga tidak membutuhkan kredensial atau persiapan apa pun. Dicoding Forum API menghapus akun baru secara otomatis setelah sekitar 20 menit, sehingga akun-akun test ini tidak menumpuk.

## CI/CD

**Continuous Integration.** Workflow GitHub Actions di `.github/workflows/ci.yml` berjalan pada setiap pull request ke `main`. Job `automation-test-job` menjalankan `npm test`, lalu `npm run lint`, lalu `npm run build`.

Test end-to-end tidak dijalankan di CI. Dicoding Forum API menolak request dari runner GitHub Actions (respons 202 dan `Failed to fetch`), sehingga CI hanya menjalankan pengujian yang tidak bergantung pada server luar. Test end-to-end dijalankan secara lokal dengan `npm run e2e`.

**Branch protection.** Branch `main` diproteksi: setiap perubahan wajib melalui pull request, dan status check `automation-test-job` harus lolos sebelum pull request dapat di-merge.

**Continuous Deployment.** Repositori terhubung dengan Vercel. Setiap pull request mendapat preview deployment, dan setiap perubahan pada `main` otomatis diterbitkan ke production. Berkas `vercel.json` mengarahkan semua path ke `index.html` agar rute seperti `/paruman/:id` tetap dapat dibuka langsung atau di-refresh.

## Rute

| Path | Halaman |
|---|---|
| `/` | Paruman (daftar thread) |
| `/paruman/:id` | Detail paruman |
| `/paruman/baru` | Ajukan paruman baru (wajib masuk) |
| `/krama-teraktif` | Krama Teraktif |
| `/masuk` | Masuk |
| `/daftar` | Daftar |