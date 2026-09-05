"use client";

import type { TiktokData } from "@/lib/types";
import { downloadFile } from "@/lib/download";
import type { NotificationType } from "@/hooks/useNotification";

interface Props {
  data: TiktokData;
  notify: (message: string, type?: NotificationType) => void;
}

export default function MusicSection({ data, notify }: Props) {
  if (!data.music) return null;

  const musicInfo = data.music_info;

  return (
    <div className="music-section">
      <h2 className="section-title">Download Audio</h2>
      <div className="download-options">
        <div className="download-card">
          <div className="download-info">
            <div className="download-type">Audio Video</div>
            <div className="download-desc">Audio yang digunakan dalam video</div>
          </div>
          <button
            type="button"
            className="download-btn"
            onClick={() => downloadFile(data.music || "", notify)}
          >
            Download
          </button>
        </div>
      </div>

      {musicInfo && (
        <div className="music-card" style={{ marginTop: 16 }}>
          <img
            src={musicInfo.cover || ""}
            alt="Cover Audio"
            className="music-cover"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/60";
            }}
          />
          <div className="music-info">
            <div className="music-title">{musicInfo.title || "Audio Original"}</div>
            {musicInfo.author && (
              <div className="music-author">
                <span>{musicInfo.author}</span>
              </div>
            )}
            <div className="music-desc">Audio original</div>
          </div>
          <button
            type="button"
            className="download-btn"
            onClick={() => downloadFile(musicInfo.play || "", notify)}
          >
            Download
          </button>
        </div>
      )}
    </div>
  );
}
