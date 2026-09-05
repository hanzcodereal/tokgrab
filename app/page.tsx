"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Features from "@/components/Features";
import HowToUse from "@/components/HowToUse";
import Footer from "@/components/Footer";
import Notification from "@/components/Notification";
import { useNotification } from "@/hooks/useNotification";
import type { TiktokApiResponse } from "@/lib/types";

type MessageType = "error" | "success" | "info";

interface MessageState {
  text: string;
  type: MessageType;
}

export default function HomePage() {
  const router = useRouter();
  const { notification, notify } = useNotification();

  const [url, setUrl] = useState("");
  const [message, setMessage] = useState<MessageState | null>(null);
  const [loading, setLoading] = useState(false);

  function isValidUrl(value: string): boolean {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }

  async function handleDownload() {
    let value = url.trim();

    if (!value) {
      setMessage({ text: "Masukkan link TikTok", type: "error" });
      return;
    }

    if (!/tiktok\.com/i.test(value)) {
      setMessage({ text: "Link harus dari TikTok", type: "error" });
      return;
    }

    if (!/^https?:\/\//i.test(value)) {
      value = `https://${value}`;
    }

    if (!isValidUrl(value)) {
      setMessage({ text: "Link tidak valid", type: "error" });
      return;
    }

    setMessage(null);
    setLoading(true);

    try {
      const response = await fetch(`/api/download/tiktok?url=${encodeURIComponent(value)}`);
      const json: TiktokApiResponse = await response.json();

      if (!response.ok || !json.success || !json.data) {
        setMessage({ text: json.message || "Gagal mengambil data", type: "error" });
        return;
      }

      sessionStorage.setItem("tiktokData", JSON.stringify(json.data));
      notify("Berhasil!", "success");

      setTimeout(() => {
        router.push(`/result?url=${encodeURIComponent(value)}`);
      }, 800);
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage({ text: "Terjadi kesalahan, coba lagi", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <Header />

      <main className="main-content">
        <div className="input-section">
          <input
            type="text"
            id="urlInput"
            placeholder="Masukkan URL TikTok"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleDownload();
            }}
          />
          <button type="button" className="btn btn-primary" disabled={loading} onClick={handleDownload}>
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin" /> Memproses...
              </>
            ) : (
              "Download"
            )}
          </button>
        </div>

        {message && (
          <div className={`message-section show message-${message.type}`}>
            <p className="message-text">{message.text}</p>
          </div>
        )}
      </main>

      <Features />
      <HowToUse />
      <Footer />

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          visible={notification.visible}
        />
      )}
    </div>
  );
}
