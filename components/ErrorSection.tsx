"use client";

import { useRouter } from "next/navigation";

export default function ErrorSection() {
  const router = useRouter();

  return (
    <div className="error-section">
      <div className="error-icon">
        <i className="fas fa-exclamation-triangle" />
      </div>
      <h2>Data Tidak Ditemukan</h2>
      <p>Silakan kembali ke halaman utama dan coba lagi</p>
      <a
        href="/"
        className="btn btn-primary"
        onClick={(e) => {
          e.preventDefault();
          router.push("/");
        }}
      >
        <i className="fas fa-home" /> Kembali ke Beranda
      </a>
    </div>
  );
}
