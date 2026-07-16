import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateBanner } from "@/components/AffiliateBanner";
import { PluginFiltersBar } from "@/components/PluginFiltersBar";
import { getAllPlugins } from "@/lib/plugins";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Catalogue complet des plugins VST",
  description:
    "Parcourez le catalogue VST Atlas : plugins VST et outils MAO gratuits ou payants. Filtrez par catégorie, tarif et plateforme — liens officiels.",
  path: "/plugins",
});

export default function PluginsPage() {
  const plugins = getAllPlugins();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Catalogue des plugins VST
        </h1>
        <p className="mt-4 leading-relaxed text-muted">
          Recherchez parmi {plugins.length} plugins audio pour la MAO — synthés,
          effets, samples et bundles. Liens officiels vérifiés, affiliation Plugin
          Boutique quand le produit y est disponible. Aucun contenu piraté.
        </p>
      </div>

      <div className="mt-8 flex justify-center">
        <AffiliateBanner variant="leaderboard600" />
      </div>

      <div className="mt-8">
        <AdSlot />
      </div>

      <div className="mt-10">
        <PluginFiltersBar plugins={plugins} />
      </div>
    </div>
  );
}
