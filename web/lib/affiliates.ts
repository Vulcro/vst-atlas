import type { Plugin, StorePartner } from "./types";

const AFFILIATE_ID =
  process.env.NEXT_PUBLIC_AFFILIATE_PLUGIN_BOUTIQUE ?? "";

/** Paramètre officiel Post Affiliate Pro (Beatport / Plugin Boutique / DJcity). */
const AFFILIATE_PARAM = "a_aid";

const AFFILIATE_HOSTS: { match: string; partner: StorePartner }[] = [
  { match: "pluginboutique.com", partner: "Plugin Boutique" },
  { match: "beatport.com", partner: "Beatport" },
];

export interface OutboundLink {
  url: string;
  isAffiliate: boolean;
  partner?: StorePartner;
}

export interface PluginLinks {
  /** Site éditeur / source officielle (jamais affilié). */
  official: OutboundLink;
  /** Boutique partenaire avec a_aid, si le produit y est listé. */
  store: OutboundLink | null;
}

function normalizeHost(url: string): URL | null {
  try {
    return new URL(url.trim());
  } catch {
    return null;
  }
}

function detectPartner(url: string): StorePartner | null {
  const parsed = normalizeHost(url);
  if (!parsed) return null;
  const host = parsed.hostname.toLowerCase();
  return AFFILIATE_HOSTS.find((entry) => host.includes(entry.match))?.partner ?? null;
}

function withAffiliateParam(url: string, partner: StorePartner): OutboundLink {
  const parsed = normalizeHost(url);
  if (!parsed || !AFFILIATE_ID) {
    return { url, isAffiliate: false, partner };
  }
  parsed.searchParams.set(AFFILIATE_PARAM, AFFILIATE_ID);
  return {
    url: parsed.toString(),
    isAffiliate: true,
    partner,
  };
}

/** @deprecated Préférer getPluginLinks — conservé pour compat. */
export function getOutboundUrl(url: string): OutboundLink {
  const partner = detectPartner(url);
  if (partner && AFFILIATE_ID) {
    return withAffiliateParam(url, partner);
  }
  return { url, isAffiliate: false };
}

export function getPluginLinks(plugin: Plugin): PluginLinks {
  const officialPartner = detectPartner(plugin.officialUrl);
  const mappedStore = plugin.storeUrl?.trim() || null;
  const mappedPartner =
    (plugin.storePartner as StorePartner | null | undefined) ??
    (mappedStore ? detectPartner(mappedStore) : null);

  let store: OutboundLink | null = null;

  if (AFFILIATE_ID) {
    if (mappedStore && mappedPartner) {
      store = withAffiliateParam(mappedStore, mappedPartner);
    } else if (officialPartner) {
      // officialUrl est déjà une fiche boutique partenaire
      store = withAffiliateParam(plugin.officialUrl, officialPartner);
    }
  }

  return {
    official: {
      url: plugin.officialUrl,
      isAffiliate: false,
    },
    store,
  };
}

/** Afficher le bouton éditeur seulement s'il n'est pas redondant avec la boutique. */
export function shouldShowOfficialButton(plugin: Plugin, links: PluginLinks): boolean {
  if (!links.store) return true;
  const officialPartner = detectPartner(plugin.officialUrl);
  // Si l'URL officielle est déjà la boutique, un seul CTA affilié suffit
  return officialPartner === null;
}

export function hasAffiliatePrograms(): boolean {
  return Boolean(AFFILIATE_ID);
}

export function getOutboundLabel(
  link: OutboundLink,
  fallback = "Voir sur le site officiel",
): string {
  if (link.isAffiliate && link.partner) {
    return `Voir sur ${link.partner}`;
  }
  return fallback;
}

export function getOfficialLabel(plugin: Plugin): string {
  if (detectPartner(plugin.officialUrl)) {
    return "Voir la fiche boutique";
  }
  return `Site officiel — ${plugin.developer}`;
}
