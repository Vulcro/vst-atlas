import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { PluginFiltersBar } from "@/components/PluginFiltersBar";
import { getAllPlugins } from "@/lib/plugins";

export const metadata: Metadata = {
  title: "Catalogue complet des plugins VST",
  description:
    "Parcourez notre catalogue complet de plugins VST et outils MAO. Filtrez par catégorie, tarif et plateforme.",
};

export default function PluginsPage() {
  const plugins = getAllPlugins();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Catalogue des plugins
        </h1>
        <p className="mt-4 text-muted">
          Recherchez parmi {plugins.length} plugins audio avec liens officiels
          vérifiés. Aucun lien vers du contenu piraté.
        </p>
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
