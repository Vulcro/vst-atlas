import {
  AFFILIATE_BANNERS,
  type AffiliateBannerKey,
} from "@/lib/affiliate-banners";

interface AffiliateBannerProps {
  variant: AffiliateBannerKey;
  className?: string;
}

export function AffiliateBanner({ variant, className = "" }: AffiliateBannerProps) {
  const banner = AFFILIATE_BANNERS[variant];

  return (
    <aside
      className={`flex flex-col items-center gap-2 ${className}`}
      aria-label="Publicité partenaire"
    >
      <p className="text-[10px] uppercase tracking-wider text-muted">Partenaire</p>
      <a
        href={banner.href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="inline-block overflow-hidden rounded-xl border border-border/60 transition hover:border-accent/40"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={banner.src}
          alt={banner.label}
          width={banner.width}
          height={banner.height}
          loading="lazy"
          className="block h-auto max-w-full"
        />
      </a>
    </aside>
  );
}
