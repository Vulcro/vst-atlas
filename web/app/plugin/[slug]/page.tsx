import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateBanner } from "@/components/AffiliateBanner";
import { CategoryBadge } from "@/components/CategoryBadge";
import { PluginGrid } from "@/components/PluginGrid";
import {
  getOfficialLabel,
  getOutboundLabel,
  getPluginLinks,
  shouldShowOfficialButton,
} from "@/lib/affiliates";
import { getCategoryLabel } from "@/lib/categories";
import { SITE_URL } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";
import {
  formatPrice,
  getAllPlugins,
  getPluginBySlug,
  getRelatedPlugins,
} from "@/lib/plugins";

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

  const categoryLabel = getCategoryLabel(plugin.category);
  const desc =
    plugin.description.length > 155
      ? `${plugin.description.slice(0, 152)}…`
      : plugin.description;

  return buildPageMetadata({
    title: `${plugin.name} — plugin VST ${categoryLabel}`,
    description: `${desc} Plugin VST ${plugin.isFree ? "gratuit" : "payant"} par ${plugin.developer} pour la MAO.`,
    path: `/plugin/${plugin.slug}`,
  });
}

export default async function PluginDetailPage({ params }: PluginPageProps) {
  const { slug } = await params;
  const plugin = getPluginBySlug(slug);
  if (!plugin) notFound();

  const links = getPluginLinks(plugin);
  const related = getRelatedPlugins(plugin, 6);
  const categoryLabel = getCategoryLabel(plugin.category);
  const pageUrl = `${SITE_URL}/plugin/${plugin.slug}`;
  const primaryUrl = links.store?.url ?? links.official.url;

  const offers =
    plugin.isFree
      ? {
          "@type": "Offer",
          price: 0,
          priceCurrency: "EUR",
          url: primaryUrl,
          availability: "https://schema.org/InStock",
        }
      : plugin.priceEur != null
        ? {
            "@type": "Offer",
            price: plugin.priceEur,
            priceCurrency: "EUR",
            url: primaryUrl,
            availability: "https://schema.org/InStock",
          }
        : {
            "@type": "Offer",
            url: primaryUrl,
            availability: "https://schema.org/InStock",
            priceCurrency: "EUR",
          };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: plugin.name,
      url: pageUrl,
      applicationCategory: "MusicApplication",
      operatingSystem: plugin.platforms.join(", "),
      offers,
      author: {
        "@type": "Organization",
        name: plugin.developer,
      },
      description: plugin.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Catalogue",
          item: `${SITE_URL}/plugins`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: categoryLabel,
          item: `${SITE_URL}/categorie/${plugin.category}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: plugin.name,
          item: pageUrl,
        },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="text-sm text-muted" aria-label="Fil d'Ariane">
        <Link href="/" className="hover:text-foreground">
          Accueil
        </Link>
        <span className="mx-2">/</span>
        <Link href="/plugins" className="hover:text-foreground">
          Catalogue
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/categorie/${plugin.category}`} className="hover:text-foreground">
          {categoryLabel}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{plugin.name}</span>
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
            {plugin.isFree && (
              <Link
                href="/gratuits"
                className="text-xs text-accent-soft hover:underline"
              >
                Voir tous les VST gratuits
              </Link>
            )}
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight">{plugin.name}</h1>
          <p className="mt-2 text-lg text-muted">par {plugin.developer}</p>

          <p className="mt-6 text-base leading-relaxed text-muted">
            {plugin.description}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-muted">
            <strong className="font-medium text-foreground">{plugin.name}</strong> est un
            plugin VST ({plugin.formats.join(", ")}) pour la MAO, compatible{" "}
            {plugin.platforms.map((p) => p).join(", ")}. Fiche du catalogue VST Atlas —
            liens officiels uniquement.
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
          <AffiliateBanner variant="square250" />
          <AdSlot />
          <div className="rounded-2xl border border-border bg-card p-5 text-sm text-muted">
            <p className="font-medium text-foreground">Liens vérifiés</p>
            <p className="mt-2 leading-relaxed">
              Site éditeur et, quand le produit est dispo chez nos partenaires,
              lien boutique affilié. Aucun lien de piratage.
            </p>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-semibold">
            Autres plugins VST — {categoryLabel}
          </h2>
          <p className="mt-2 text-sm text-muted">
            Dans la même catégorie pour continuer votre sélection MAO.
          </p>
          <div className="mt-8">
            <PluginGrid plugins={related} />
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={`/categorie/${plugin.category}`}
              className="text-sm text-accent-soft hover:underline"
            >
              Toute la catégorie {categoryLabel}
            </Link>
            <AffiliateBanner variant="banner300" />
          </div>
        </section>
      )}
    </div>
  );
}
