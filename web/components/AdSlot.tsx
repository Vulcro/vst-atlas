import { ADSENSE_CLIENT } from "@/lib/constants";

interface AdSlotProps {
  slot?: string;
  className?: string;
  label?: string;
}

export function AdSlot({
  slot = "0000000000",
  className = "",
  label = "Espace publicitaire",
}: AdSlotProps) {
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

  return (
    <ins
      className={`adsbygoogle block ${className}`}
      style={{ display: "block" }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
