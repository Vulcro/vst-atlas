"use client";

import { useEffect } from "react";
import { ADSENSE_CLIENT } from "@/lib/constants";

interface AdSlotProps {
  slot?: string;
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

export function AdSlot({
  slot,
  className = "",
  label = "Espace publicitaire",
}: AdSlotProps) {
  const adSlot = slot ?? process.env.NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT ?? "";

  useEffect(() => {
    if (!ADSENSE_CLIENT || !adSlot) return;
    try {
      (window.adsbygoogle = window.adsbygoogle ?? []).push({});
    } catch {
      // AdSense peut échouer si le script n'est pas encore chargé
    }
  }, [adSlot]);

  if (!ADSENSE_CLIENT) {
    return (
      <div
        className={`flex min-h-28 items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 text-sm text-muted ${className}`}
        aria-hidden="true"
      >
        {label} — actif après configuration AdSense
      </div>
    );
  }

  if (!adSlot) {
    return (
      <div
        className={`flex min-h-28 items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 text-sm text-muted ${className}`}
      >
        Configurez NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT dans Vercel
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle block ${className}`}
      style={{ display: "block" }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
