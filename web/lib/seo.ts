import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";

/** Métadonnées SEO partagées (canonical, OG, Twitter). */
export function buildPageMetadata({
  title,
  description,
  path = "",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const desc = description ?? SITE_DESCRIPTION;

  return {
    ...(title ? { title } : {}),
    description: desc,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url,
      siteName: SITE_NAME,
      title: title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Catalogue VST & MAO`,
      description: desc,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — Catalogue de plugins VST et outils MAO`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Catalogue VST & MAO`,
      description: desc,
      images: ["/og.png"],
    },
    robots: noIndex ? { index: false, follow: true } : { index: true, follow: true },
  };
}
