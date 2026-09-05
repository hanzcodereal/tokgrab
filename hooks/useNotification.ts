"use client";

import { useCallback, useRef, useState } from "react";

export type NotificationType = "success" | "error" | "info";

interface NotificationState {
  message: string;
  type: NotificationType;
  visible: boolean;
}

export function useNotification() {
  const [notification, setNotification] = useState<NotificationState | null>(null);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const removeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const notify = useCallback((message: string, type: NotificationType = "info") => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    if (removeTimeout.current) clearTimeout(removeTimeout.current);

    setNotification({ message, type, visible: false });

    requestAnimationFrame(() => {
      setNotification({ message, type, visible: true });
    });

    hideTimeout.current = setTimeout(() => {
      setNotification((prev) => (prev ? { ...prev, visible: false } : prev));
      removeTimeout.current = setTimeout(() => setNotification(null), 300);
    }, 3000);
  }, []);

  return { notification, notify };
    }
