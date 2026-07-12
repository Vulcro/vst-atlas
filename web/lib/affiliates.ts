const PLUGIN_BOUTIQUE_ID =
  process.env.NEXT_PUBLIC_AFFILIATE_PLUGIN_BOUTIQUE ?? "";
const THOMANN_ID = process.env.NEXT_PUBLIC_AFFILIATE_THOMANN ?? "";

export interface OutboundLink {
  url: string;
  isAffiliate: boolean;
  partner?: string;
}

function normalizeHost(url: string): URL | null {
  try {
    return new URL(url.trim());
  } catch {
    return null;
  }
}

export function getOutboundUrl(officialUrl: string): OutboundLink {
  const parsed = normalizeHost(officialUrl);
  if (!parsed) {
    return { url: officialUrl, isAffiliate: false };
  }

  const host = parsed.hostname.toLowerCase();

  if (PLUGIN_BOUTIQUE_ID && host.includes("pluginboutique.com")) {
    parsed.searchParams.set("a", PLUGIN_BOUTIQUE_ID);
    return {
      url: parsed.toString(),
      isAffiliate: true,
      partner: "Plugin Boutique",
    };
  }

  if (THOMANN_ID && host.includes("thomann.")) {
    parsed.searchParams.set("affid", THOMANN_ID);
    return {
      url: parsed.toString(),
      isAffiliate: true,
      partner: "Thomann",
    };
  }

  return { url: officialUrl, isAffiliate: false };
}

export function hasAffiliatePrograms(): boolean {
  return Boolean(PLUGIN_BOUTIQUE_ID || THOMANN_ID);
}

export function getOutboundLabel(link: OutboundLink, fallback = "Voir sur le site officiel"): string {
  if (link.isAffiliate && link.partner) {
    return `Voir sur ${link.partner}`;
  }
  return fallback;
}
