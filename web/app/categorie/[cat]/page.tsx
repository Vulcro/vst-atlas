import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateBanner } from "@/components/AffiliateBanner";
import { PluginGrid } from "@/components/PluginGrid";
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  getCategoryIntro,
} from "@/lib/categories";
import type { PluginCategory } from "@/lib/types";
import { getPluginsByCategory } from "@/lib/plugins";
import { buildPageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";

interface CategoryPageProps {
  params: Promise<{ cat: string }>;
}

export async function generateStaticParams() {
  return CATEGORY_ORDER.map((cat) => ({ cat }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { cat } = await params;
  const label = CATEGORY_LABELS[cat as PluginCategory];
  if (!label) return {};

  return buildPageMetadata({
    title: `Plugins VST ${label} — gratuits et payants`,
    description: `Meilleurs plugins VST ${label.toLowerCase()} pour la MAO. Catalogue français avec liens officiels — freeware et versions payantes.`,
    path: `/categorie/${cat}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { cat } = await params;
  const label = CATEGORY_LABELS[cat as PluginCategory];
  if (!label) notFound();

  const plugins = getPluginsByCategory(cat).sort((a, b) =>
    a.name.localeCompare(b.name, "fr"),
  );
  const intro = getCategoryIntro(cat as PluginCategory);
  const freeCount = plugins.filter((p) => p.isFree).length;

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Plugins VST ${label}`,
    numberOfItems: plugins.length,
    itemListElement: plugins.slice(0, 30).map((plugin, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/plugin/${plugin.slug}`,
      name: plugin.name,
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Plugins VST — {label}
        </h1>
        <p className="mt-4 leading-relaxed text-muted">{intro}</p>
        <p className="mt-3 text-sm text-muted">
          {plugins.length} plugin{plugins.length > 1 ? "s" : ""} · {freeCount}{" "}
          gratuit{freeCount > 1 ? "s" : ""}
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
        <AdSlot className="w-full max-w-xl" />
        <AffiliateBanner variant="banner300" />
      </div>

      <div className="mt-10">
        <h2 className="mb-6 text-lg font-semibold">
          Catalogue {label.toLowerCase()}
        </h2>
        <PluginGrid plugins={plugins} />
      </div>
    </div>
  );
}
