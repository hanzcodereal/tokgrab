"use client";

import type { NotificationType } from "@/hooks/useNotification";

const ICONS: Record<NotificationType, string> = {
  success: "fa-check-circle",
  error: "fa-exclamation-circle",
  info: "fa-info-circle",
};

interface NotificationProps {
  message: string;
  type: NotificationType;
  visible: boolean;
}

export default function Notification({ message, type, visible }: NotificationProps) {
  return (
    <div className={`notification notification-${type}${visible ? " show" : ""}`}>
      <i className={`fas ${ICONS[type]}`} />
      <span>{message}</span>
    </div>
  );
}
