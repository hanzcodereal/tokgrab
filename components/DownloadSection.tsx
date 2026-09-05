"use client";

import type { TiktokData } from "@/lib/types";
import { formatFileSize } from "@/lib/format";
import { downloadFile } from "@/lib/download";
import type { NotificationType } from "@/hooks/useNotification";

interface Props {
  data: TiktokData;
  notify: (message: string, type?: NotificationType) => void;
}

export default function DownloadSection({ data, notify }: Props) {
  const images = data.images ?? [];
  const isImages = images.length > 0;

  if (isImages) {
    return (
      <div className="download-section">
        <h2 className="section-title">Download Foto ({images.length} Foto)</h2>
        <div className="image-gallery">
          {images.map((img, index) => (
            <div className="image-item" key={`${img}-${index}`}>
              <img src={img} alt={`Foto ${index + 1}`} loading="lazy" decoding="async" />
              <div className="image-overlay">
                <button
                  type="button"
                  className="image-download-btn"
                  title="Download foto"
                  onClick={() => downloadFile(img, notify)}
                >
                  Unduh
                </button>
              </div>
              <div className="image-number">{index + 1}</div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="btn btn-download-all"
          onClick={() => {
            notify(`Mendownload ${images.length} foto...`, "info");
            images.forEach((img, index) => {
              setTimeout(() => downloadFile(img, notify), index * 500);
            });
          }}
        >
          Download Semua Foto
        </button>
      </div>
    );
  }

  const hdplay = data.hdplay || data.play || "";
  const hdSize = data.hd_size ?? data.size;

  return (
    <div className="download-section">
      <h2 className="section-title">Download Video</h2>
      <div className="download-options">
        <div className="download-card">
          <div className="download-info">
            <div className="download-type">Video HD</div>
            <div className="download-desc">Tanpa watermark • {formatFileSize(hdSize)}</div>
          </div>
          <button type="button" className="download-btn" onClick={() => downloadFile(hdplay, notify)}>
            Download
          </button>
        </div>

        <div className="download-card">
          <div className="download-info">
            <div className="download-type">Video Standard</div>
            <div className="download-desc">Tanpa watermark • {formatFileSize(data.size)}</div>
          </div>
          <button
            type="button"
            className="download-btn"
            onClick={() => downloadFile(data.play || "", notify)}
          >
            Download
          </button>
        </div>

        <div className="download-card">
          <div className="download-info">
            <div className="download-type">Video Watermark</div>
            <div className="download-desc">Dengan watermark • {formatFileSize(data.wm_size)}</div>
          </div>
          <button
            type="button"
            className="download-btn"
            onClick={() => downloadFile(data.wmplay || "", notify)}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
