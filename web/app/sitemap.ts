import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getAllPlugins } from "@/lib/plugins";
import { CATEGORY_ORDER, CONTENT_SECTIONS } from "@/lib/categories";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const plugins = getAllPlugins();
  const now = new Date();

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    {
      url: `${SITE_URL}/plugins`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/gratuits`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...CONTENT_SECTIONS.map((section) => ({
      url: `${SITE_URL}/sections/${section.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...CATEGORY_ORDER.map((cat) => ({
      url: `${SITE_URL}/categorie/${cat}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...plugins.map((plugin) => ({
      url: `${SITE_URL}/plugin/${plugin.slug}`,
      lastModified: new Date(plugin.discoveredAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${SITE_URL}/mentions-legales`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/confidentialite`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
  ];
}
