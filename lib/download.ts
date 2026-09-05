import { getFilenameFromUrl } from "./format";
import type { NotificationType } from "@/hooks/useNotification";

type NotifyFn = (message: string, type?: NotificationType) => void;

export function downloadFile(url: string, notify?: NotifyFn): void {
  if (!url) {
    notify?.("Link tidak tersedia", "error");
    return;
  }

  notify?.("Memulai download...", "info");

  const filename = getFilenameFromUrl(url);
  const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(filename)}`;

  const link = document.createElement("a");
  link.href = proxyUrl;
  link.download = filename;
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  notify?.("Download berhasil!", "success");
}
