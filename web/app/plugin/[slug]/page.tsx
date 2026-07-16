import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { CategoryBadge } from "@/components/CategoryBadge";
import {
  getOfficialLabel,
  getOutboundLabel,
  getPluginLinks,
  shouldShowOfficialButton,
} from "@/lib/affiliates";
import { getAllPlugins, getPluginBySlug, formatPrice } from "@/lib/plugins";
import { SITE_URL } from "@/lib/constants";

interface PluginPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPlugins().map((plugin) => ({ slug: plugin.slug }));
}

export async function generateMetadata({ params }: PluginPageProps): Promise<Metadata> {
  const { slug } = await params;
  const plugin = getPluginBySlug(slug);
  if (!plugin) return {};

  return {
    title: `${plugin.name} — ${plugin.developer}`,
    description: plugin.description,
    openGraph: {
      title: plugin.name,
      description: plugin.description,
      url: `${SITE_URL}/plugin/${plugin.slug}`,
    },
  };
}

export default async function PluginDetailPage({ params }: PluginPageProps) {
  const { slug } = await params;
  const plugin = getPluginBySlug(slug);
  if (!plugin) notFound();

  const links = getPluginLinks(plugin);
  const primaryUrl = links.store?.url ?? links.official.url;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: plugin.name,
    applicationCategory: "MusicApplication",
    operatingSystem: plugin.platforms.join(", "),
    offers: {
      "@type": "Offer",
      price: plugin.isFree ? 0 : plugin.priceEur ?? 0,
      priceCurrency: "EUR",
      url: primaryUrl,
    },
    author: {
      "@type": "Organization",
      name: plugin.developer,
    },
    description: plugin.description,
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="text-sm text-muted">
        <Link href="/plugins" className="hover:text-foreground">
          Catalogue
        </Link>
        <span className="mx-2">/</span>
        <span>{plugin.name}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_280px]">
        <article>
          <div className="flex flex-wrap items-center gap-3">
            <CategoryBadge category={plugin.category} />
            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                plugin.isFree
                  ? "bg-success/15 text-success"
                  : "bg-warning/15 text-warning"
              }`}
            >
              {formatPrice(plugin)}
            </span>
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight">{plugin.name}</h1>
          <p className="mt-2 text-lg text-muted">par {plugin.developer}</p>

          <p className="mt-6 text-base leading-relaxed text-muted">
            {plugin.description}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-wide text-muted">Formats</p>
              <p className="mt-2 font-medium">{plugin.formats.join(", ")}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-wide text-muted">Plateformes</p>
              <p className="mt-2 font-medium capitalize">
                {plugin.platforms.join(", ")}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-wide text-muted">Ajouté le</p>
              <p className="mt-2 font-medium">
                {new Date(plugin.discoveredAt).toLocaleDateString("fr-FR")}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-wide text-muted">Source</p>
              <p className="mt-2 font-medium capitalize">{plugin.source}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {links.store && (
              <a
                href={links.store.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-soft"
              >
                {getOutboundLabel(links.store)}
              </a>
            )}
            {shouldShowOfficialButton(plugin, links) && (
              <a
                href={links.official.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex rounded-full px-6 py-3 text-sm font-semibold ${
                  links.store
                    ? "border border-border text-foreground hover:border-accent/40"
                    : "bg-accent text-white hover:bg-accent-soft"
                }`}
              >
                {getOfficialLabel(plugin)}
              </a>
            )}
          </div>

          {links.store?.isAffiliate && (
            <p className="mt-3 text-xs text-muted">
              Le bouton {links.store.partner} est un lien affilié — commission possible
              sans surcoût pour vous.
              {shouldShowOfficialButton(plugin, links)
                ? " Le site éditeur reste un lien direct."
                : ""}
            </p>
          )}
        </article>

        <aside className="space-y-6">
          <AdSlot />
          <div className="rounded-2xl border border-border bg-card p-5 text-sm text-muted">
            <p className="font-medium text-foreground">Liens vérifiés</p>
            <p className="mt-2 leading-relaxed">
              Site éditeur et, quand le produit est dispo chez nos partenaires,
              lien boutique affilié (Plugin Boutique / Beatport). Aucun lien de
              piratage.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
