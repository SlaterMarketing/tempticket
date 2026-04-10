"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function ConfirmationToast({
  sessionId,
}: {
  sessionId?: string;
}) {
  useEffect(() => {
    if (sessionId) {
      toast.success("Payment successful.");
    }
  }, [sessionId]);
  return null;
}
