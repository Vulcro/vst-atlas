import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { PluginGrid } from "@/components/PluginGrid";
import { CATEGORY_ORDER, CONTENT_SECTIONS, getCategoryLabel } from "@/lib/categories";
import { SITE_TAGLINE } from "@/lib/constants";
import {
  getAllPlugins,
  getCategoryCounts,
  getFreePlugins,
  getRecentPlugins,
} from "@/lib/plugins";

export default function HomePage() {
  const recent = getRecentPlugins(6);
  const freeCount = getFreePlugins().length;
  const total = getAllPlugins().length;
  const categoryCounts = getCategoryCounts();

  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-soft">
              Catalogue MAO en français
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Trouvez le bon plugin VST, sans détour
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              {SITE_TAGLINE}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/plugins"
                className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-soft"
              >
                Explorer le catalogue
              </Link>
              <Link
                href="/gratuits"
                className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground hover:border-accent/40"
              >
                Voir les gratuits
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-3xl font-bold">{total}</p>
              <p className="mt-1 text-sm text-muted">plugins répertoriés</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-3xl font-bold text-success">{freeCount}</p>
              <p className="mt-1 text-sm text-muted">plugins gratuits</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-3xl font-bold text-accent-soft">Hebdo</p>
              <p className="mt-1 text-sm text-muted">mise à jour automatique</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Derniers ajouts</h2>
            <p className="mt-2 text-sm text-muted">
              Les plugins les plus récemment découverts par notre script.
            </p>
          </div>
          <Link href="/plugins" className="text-sm text-accent-soft hover:underline">
            Tout voir
          </Link>
        </div>
        <PluginGrid plugins={recent} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <AdSlot className="min-h-28" />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="text-2xl font-semibold">Samples & contenus</h2>
        <p className="mt-2 text-sm text-muted">
          Loop packs, drum kits, MIDI kits et bundles des éditeurs officiels.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONTENT_SECTIONS.map((section) => {
            const count = categoryCounts[section.category] ?? 0;
            return (
              <Link
                key={section.slug}
                href={`/sections/${section.slug}`}
                className="rounded-2xl border border-accent/20 bg-card p-5 transition hover:border-accent/40 hover:bg-card-hover"
              >
                <p className="font-medium">{section.title}</p>
                <p className="mt-2 text-sm text-muted">
                  {count} élément{count > 1 ? "s" : ""}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="text-2xl font-semibold">Parcourir par catégorie</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_ORDER.filter((category) => categoryCounts[category]).map(
            (category) => (
              <Link
                key={category}
                href={`/categorie/${category}`}
                className="rounded-2xl border border-border bg-card p-5 transition hover:border-accent/40 hover:bg-card-hover"
              >
                <p className="font-medium">{getCategoryLabel(category)}</p>
                <p className="mt-2 text-sm text-muted">
                  {categoryCounts[category]} plugin
                  {categoryCounts[category] > 1 ? "s" : ""}
                </p>
              </Link>
            ),
          )}
        </div>
      </section>
    </div>
  );
}
