import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateBanner } from "@/components/AffiliateBanner";
import { PluginGrid } from "@/components/PluginGrid";
import { getFreePlugins } from "@/lib/plugins";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Meilleurs plugins VST gratuits",
  description:
    "Catalogue de plugins VST gratuits pour la MAO : synthés, effets, instruments et utilitaires freeware. Liens officiels uniquement, zéro piratage.",
  path: "/gratuits",
});

export default function FreePluginsPage() {
  const plugins = getFreePlugins().sort((a, b) => a.name.localeCompare(b.name, "fr"));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Plugins VST gratuits
        </h1>
        <p className="mt-4 leading-relaxed text-muted">
          {plugins.length} plugins audio gratuits et freeware pour la production
          musicale (MAO). Synthés, égaliseurs, réverbs, compressors et instruments —
          tous téléchargeables via les sites officiels des éditeurs. Aucun crack, aucun
          torrent : uniquement des liens légaux.
        </p>
        <p className="mt-3 leading-relaxed text-muted">
          Idéal pour débuter la MAO sur Ableton, FL Studio, Reaper ou Cubase sans
          budget plugins, ou compléter un studio déjà équipé avec des outils solides
          en freeware.
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-between">
        <AdSlot className="w-full max-w-xl" />
        <AffiliateBanner variant="square200" />
      </div>

      <div className="mt-10">
        <h2 className="mb-6 text-lg font-semibold">Tous les VST gratuits du catalogue</h2>
        <PluginGrid plugins={plugins} />
      </div>
    </div>
  );
}
