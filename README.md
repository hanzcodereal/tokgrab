# TokGrab

Aplikasi Next.js (App Router) + TypeScript untuk mengunduh video, foto, dan audio TikTok tanpa watermark.

## Struktur Project

```
app/
  layout.tsx              Root layout, font, metadata
  globals.css              Semua styling
  page.tsx                 Halaman utama (form input link)
  result/
    page.tsx                Route hasil, membungkus ResultView dengan Suspense
  api/
    download/tiktok/
      route.ts               Endpoint GET /api/download/tiktok?url=...
    proxy/
      route.ts               Endpoint GET /api/proxy?url=...&filename=... untuk streaming download file

components/
  Header.tsx
  Features.tsx
  HowToUse.tsx
  Footer.tsx
  Notification.tsx
  BackButton.tsx
  ErrorSection.tsx
  ResultView.tsx            Logika halaman hasil (client component)
  VideoInfoCard.tsx
  DownloadSection.tsx
  MusicSection.tsx
  ExtraSection.tsx

hooks/
  useNotification.ts        Hook notifikasi mengambang

lib/
  types.ts                  Tipe data TikTok & respons API
  format.ts                 Format angka, ukuran file, tanggal, nama file
  download.ts                Trigger download file via /api/proxy
```

## Cara Kerja

1. Pengguna memasukkan link TikTok di halaman utama (`/`).
2. Frontend memanggil `GET /api/download/tiktok?url=...`.
3. Route API tersebut meneruskan request ke API pihak ketiga, menormalkan responsnya, lalu mengembalikan JSON yang konsisten (`{ success, data }`).
4. Data disimpan sementara di `sessionStorage` dan pengguna diarahkan ke `/result?url=...`.
5. Halaman hasil menampilkan info video/foto beserta opsi download.
6. Tombol download memanggil `GET /api/proxy?url=...&filename=...`, yang men-stream file dari server (menghindari masalah CORS) dan mengembalikannya sebagai attachment dengan nama file yang sesuai.

## Menjalankan Secara Lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Deploy ke Vercel

1. Push project ini ke repository Git (GitHub/GitLab/Bitbucket).
2. Buka [vercel.com](https://vercel.com), pilih **New Project**, lalu import repository tersebut.
3. Vercel otomatis mendeteksi framework Next.js — tidak perlu konfigurasi tambahan.
4. Klik **Deploy**.

Atau lewat CLI:

```bash
npm install -g vercel
vercel
```

## Catatan

- Endpoint sumber data TikTok menggunakan `https://zelora-api.vercel.app/download/tiktok`. Ganti nilai `UPSTREAM_API` di `app/api/download/tiktok/route.ts` jika ingin memakai penyedia lain.
- Tidak menggunakan `localStorage`/library eksternal tambahan — hanya `next`, `react`, dan `react-dom`.
