"use client";

import type { TiktokData } from "@/lib/types";
import { downloadFile } from "@/lib/download";
import type { NotificationType } from "@/hooks/useNotification";

interface Props {
  data: TiktokData;
  caption: string;
  notify: (message: string, type?: NotificationType) => void;
}

export default function ExtraSection({ data, caption, notify }: Props) {
  const musicCoverUrl = data.music_info?.cover || "";

  function copyCaption() {
    if (!caption) {
      notify("Caption kosong", "error");
      return;
    }

    const fallbackCopy = () => {
      const textarea = document.createElement("textarea");
      textarea.value = caption;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        notify("Caption disalin!", "success");
      } catch {
        notify("Gagal menyalin", "error");
      }
      document.body.removeChild(textarea);
    };

    if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(caption)
        .then(() => notify("Caption disalin!", "success"))
        .catch(fallbackCopy);
    } else {
      fallbackCopy();
    }
  }

  return (
    <div className="extra-section">
      <h2 className="section-title">Lainnya</h2>
      <div className="download-options">
        <div className="download-card">
          <div className="download-info">
            <div className="download-type">Caption</div>
            <div className="download-desc">Teks caption</div>
          </div>
          <button type="button" className="download-btn" onClick={copyCaption}>
            Salin
          </button>
        </div>
        <div className="download-card">
          <div className="download-info">
            <div className="download-type">Thumbnail</div>
            <div className="download-desc">Gambar thumbnail</div>
          </div>
          <button
            type="button"
            className="download-btn"
            onClick={() => downloadFile(data.cover || "", notify)}
          >
            Download
          </button>
        </div>
        <div className="download-card">
          <div className="download-info">
            <div className="download-type">Cover</div>
            <div className="download-desc">Gambar cover</div>
          </div>
          <button
            type="button"
            className="download-btn"
            onClick={() => downloadFile(data.origin_cover || data.cover || "", notify)}
          >
            Download
          </button>
        </div>
        {musicCoverUrl && (
          <div className="download-card">
            <div className="download-info">
              <div className="download-type">Cover Audio</div>
              <div className="download-desc">Gambar cover musik/audio</div>
            </div>
            <button
              type="button"
              className="download-btn"
              onClick={() => downloadFile(musicCoverUrl, notify)}
            >
              Download
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
