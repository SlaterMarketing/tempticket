"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function BookingsSuccessToast({
  sessionId,
}: {
  sessionId?: string;
}) {
  useEffect(() => {
    if (sessionId) {
      toast.success("Payment received. Your booking will update in a moment.");
    }
  }, [sessionId]);
  return null;
}
