import type { AuthorInfo, TiktokData } from "@/lib/types";
import { formatDate, formatNumber } from "@/lib/format";

interface Props {
  data: TiktokData;
}

export default function VideoInfoCard({ data }: Props) {
  const images = data.images ?? [];
  const isImages = images.length > 0;
  const author: AuthorInfo = data.author ?? {};

  return (
    <div className="video-info-card">
      <div className="video-header">
        <img
          src={data.cover || ""}
          alt="Thumbnail"
          className="video-thumbnail"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/90";
          }}
        />
        <div className="video-details">
          <h2 className="video-title">{data.title || "Tanpa judul"}</h2>
          <div className="video-meta">
            {isImages ? (
              <span>
                <i className="fas fa-images" /> {images.length} Foto
              </span>
            ) : (
              <span>
                <i className="fas fa-clock" /> {data.duration || 0}s
              </span>
            )}
            <span>
              <i className="fas fa-calendar" /> {formatDate(data.create_time)}
            </span>
            <span>
              <i className="fas fa-map-marker-alt" /> {data.region || "-"}
            </span>
          </div>
        </div>
      </div>

      <div className="author-info">
        <img
          src={author.avatar || ""}
          alt={author.nickname || "Tidak diketahui"}
          className="author-avatar"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/40";
          }}
        />
        <div className="author-details">
          <h3>{author.nickname || "Tidak diketahui"}</h3>
          <p>@{author.unique_id || ""}</p>
        </div>
      </div>

      <div className="video-stats">
        <div className="stat-item">
          <span className="stat-value">{formatNumber(data.play_count)}</span>
          <span className="stat-label">Views</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{formatNumber(data.digg_count)}</span>
          <span className="stat-label">Likes</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{formatNumber(data.comment_count)}</span>
          <span className="stat-label">Comments</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{formatNumber(data.share_count)}</span>
          <span className="stat-label">Shares</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{formatNumber(data.download_count || 0)}</span>
          <span className="stat-label">Download</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{formatNumber(data.collect_count || 0)}</span>
          <span className="stat-label">Collect</span>
        </div>
      </div>
    </div>
  );
}
