"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BackButton from "./BackButton";
import VideoInfoCard from "./VideoInfoCard";
import DownloadSection from "./DownloadSection";
import MusicSection from "./MusicSection";
import ExtraSection from "./ExtraSection";
import ErrorSection from "./ErrorSection";
import Footer from "./Footer";
import Notification from "./Notification";
import { useNotification } from "@/hooks/useNotification";
import type { TiktokApiResponse, TiktokData } from "@/lib/types";

export default function ResultView() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  const { notification, notify } = useNotification();

  const [data, setData] = useState<TiktokData | null>(null);
  const [error, setError] = useState(false);
  const [caption, setCaption] = useState("");

  useEffect(() => {
    const cached = sessionStorage.getItem("tiktokData");

    if (cached) {
      try {
        const parsed: TiktokData = JSON.parse(cached);
        setData(parsed);
        setCaption(parsed.title || "");
        return;
      } catch {
        setError(true);
        return;
      }
    }

    if (!url) {
      setError(true);
      return;
    }

    fetch(`/api/download/tiktok?url=${encodeURIComponent(url)}`)
      .then((res) => res.json())
      .then((json: TiktokApiResponse) => {
        if (json.success && json.data) {
          setData(json.data);
          setCaption(json.data.title || "");
          sessionStorage.setItem("tiktokData", JSON.stringify(json.data));
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true));
  }, [url]);

  return (
    <div className="container">
      <BackButton />

      {error && <ErrorSection />}

      {!error && data && (
        <>
          <VideoInfoCard data={data} />
          <DownloadSection data={data} notify={notify} />
          <MusicSection data={data} notify={notify} />
          <ExtraSection data={data} caption={caption} notify={notify} />
        </>
      )}

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
