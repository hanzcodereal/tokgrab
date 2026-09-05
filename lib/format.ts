export function formatNumber(num?: number): string {
  const n = Number(num) || 0;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export function formatFileSize(bytes?: number): string {
  const b = Number(bytes) || 0;
  if (b >= 1024 * 1024) return `${(b / (1024 * 1024)).toFixed(2)} MB`;
  if (b >= 1024) return `${(b / 1024).toFixed(2)} KB`;
  return `${b} B`;
}

export function formatDate(timestamp?: number): string {
  if (!timestamp) return "-";
  const date = new Date(timestamp * 1000);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getFilenameFromUrl(url: string): string {
  const timestamp = Date.now();

  const fallbackName = () => {
    if (url.includes(".mp4")) return `tiktok_video_${timestamp}.mp4`;
    if (url.includes(".mp3")) return `tiktok_audio_${timestamp}.mp3`;
    if (/\.(jpg|jpeg|png)/i.test(url)) return `tiktok_photo_${timestamp}.jpg`;
    return `tiktok_download_${timestamp}`;
  };

  try {
    const pathname = new URL(url).pathname;
    const filename = pathname.substring(pathname.lastIndexOf("/") + 1);
    return !filename || filename === pathname ? fallbackName() : filename;
  } catch {
    return fallbackName();
  }
}
