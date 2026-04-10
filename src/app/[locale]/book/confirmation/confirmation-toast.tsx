"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { toast } from "sonner";

export function ConfirmationToast({
  sessionId,
}: {
  sessionId?: string;
}) {
  const t = useTranslations("Toasts");
  useEffect(() => {
    if (sessionId) {
      toast.success(t("paymentSuccess"));
    }
  }, [sessionId, t]);
  return null;
}
