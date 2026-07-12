import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { PluginGrid } from "@/components/PluginGrid";
import { getFreePlugins } from "@/lib/plugins";

export const metadata: Metadata = {
  title: "Meilleurs plugins VST gratuits",
  description:
    "Découvrez les meilleurs plugins VST gratuits et freeware pour la production musicale. Liens officiels, synthés, effets, instruments.",
};

export default function FreePluginsPage() {
  const plugins = getFreePlugins().sort((a, b) => a.name.localeCompare(b.name, "fr"));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Plugins VST gratuits
        </h1>
        <p className="mt-4 leading-relaxed text-muted">
          {plugins.length} plugins audio gratuits et freeware sélectionnés pour
          la production musicale. Tous les liens mènent vers les sites officiels
          des éditeurs — zéro piratage.
        </p>
      </div>

      <div className="mt-8">
        <AdSlot />
      </div>

      <div className="mt-10">
        <PluginGrid plugins={plugins} />
      </div>
    </div>
  );
}
