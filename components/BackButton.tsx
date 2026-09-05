"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <a
      href="/"
      className="back-button"
      onClick={(e) => {
        e.preventDefault();
        router.push("/");
      }}
    >
      <span>Kembali</span>
    </a>
  );
}
