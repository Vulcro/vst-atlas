const AFFILIATE_ID =
  process.env.NEXT_PUBLIC_AFFILIATE_PLUGIN_BOUTIQUE ?? "";

/** Paramètre officiel Post Affiliate Pro (Beatport / Plugin Boutique / DJcity). */
const AFFILIATE_PARAM = "a_aid";

const AFFILIATE_HOSTS: { match: string; partner: string }[] = [
  { match: "pluginboutique.com", partner: "Plugin Boutique" },
  { match: "beatport.com", partner: "Beatport" },
];

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

  if (!AFFILIATE_ID) {
    return { url: officialUrl, isAffiliate: false };
  }

  const host = parsed.hostname.toLowerCase();
  const partner = AFFILIATE_HOSTS.find((entry) => host.includes(entry.match));

  if (!partner) {
    return { url: officialUrl, isAffiliate: false };
  }

  parsed.searchParams.set(AFFILIATE_PARAM, AFFILIATE_ID);
  return {
    url: parsed.toString(),
    isAffiliate: true,
    partner: partner.partner,
  };
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
