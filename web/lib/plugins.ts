import catalogData from "@/data/plugins.json";
import type { Plugin, PluginCatalog, PluginFilters } from "./types";

const catalog = catalogData as PluginCatalog;

export function getCatalog(): PluginCatalog {
  return catalog;
}

export function getAllPlugins(): Plugin[] {
  return catalog.plugins;
}

export function getPluginBySlug(slug: string): Plugin | undefined {
  return catalog.plugins.find((plugin) => plugin.slug === slug);
}

export function getRecentPlugins(limit = 12): Plugin[] {
  return [...catalog.plugins]
    .sort((a, b) => b.discoveredAt.localeCompare(a.discoveredAt))
    .slice(0, limit);
}

export function getFreePlugins(): Plugin[] {
  return catalog.plugins.filter((plugin) => plugin.isFree);
}

export function getPluginsByCategory(category: string): Plugin[] {
  return catalog.plugins.filter((plugin) => plugin.category === category);
}

export function filterPlugins(filters: PluginFilters): Plugin[] {
  const query = filters.query?.trim().toLowerCase();

  return catalog.plugins.filter((plugin) => {
    if (filters.category && filters.category !== "all" && plugin.category !== filters.category) {
      return false;
    }
    if (filters.pricing === "free" && !plugin.isFree) return false;
    if (filters.pricing === "paid" && plugin.isFree) return false;
    if (
      filters.platform &&
      filters.platform !== "all" &&
      !plugin.platforms.includes(filters.platform)
    ) {
      return false;
    }
    if (!query) return true;

    const haystack = [
      plugin.name,
      plugin.developer,
      plugin.description,
      plugin.category,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}

export function getCategoryCounts(): Record<string, number> {
  return catalog.plugins.reduce<Record<string, number>>((counts, plugin) => {
    counts[plugin.category] = (counts[plugin.category] ?? 0) + 1;
    return counts;
  }, {});
}

export function formatPrice(plugin: Plugin): string {
  if (plugin.isFree) return "Gratuit";
  if (plugin.priceEur == null) return "Payant";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(plugin.priceEur);
}

export function getRelatedPlugins(plugin: Plugin, limit = 6): Plugin[] {
  return catalog.plugins
    .filter((item) => item.category === plugin.category && item.slug !== plugin.slug)
    .sort((a, b) => a.name.localeCompare(b.name, "fr"))
    .slice(0, limit);
}
