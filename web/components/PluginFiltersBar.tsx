"use client";

import { useMemo, useState } from "react";
import type { Plugin, PluginCategory, PluginPlatform } from "@/lib/types";
import { CATEGORY_LABELS, CATEGORY_ORDER } from "@/lib/categories";
import { filterPlugins } from "@/lib/plugins";
import { PluginGrid } from "./PluginGrid";

interface PluginFiltersProps {
  plugins: Plugin[];
}

export function PluginFiltersBar({ plugins }: PluginFiltersProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<PluginCategory | "all">("all");
  const [pricing, setPricing] = useState<"all" | "free" | "paid">("all");
  const [platform, setPlatform] = useState<PluginPlatform | "all">("all");

  const filtered = useMemo(
    () => filterPlugins({ query, category, pricing, platform }),
    [query, category, pricing, platform],
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 rounded-2xl border border-border bg-card p-4 md:grid-cols-4">
        <label className="md:col-span-2">
          <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted">
            Recherche
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Nom, éditeur, description…"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none ring-accent/30 transition focus:ring-2"
          />
        </label>

        <label>
          <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted">
            Catégorie
          </span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as PluginCategory | "all")}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none"
          >
            <option value="all">Toutes</option>
            {CATEGORY_ORDER.map((item) => (
              <option key={item} value={item}>
                {CATEGORY_LABELS[item]}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted">
            Tarif
          </span>
          <select
            value={pricing}
            onChange={(event) => setPricing(event.target.value as "all" | "free" | "paid")}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none"
          >
            <option value="all">Tous</option>
            <option value="free">Gratuits</option>
            <option value="paid">Payants</option>
          </select>
        </label>

        <label className="md:col-span-4">
          <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted">
            Plateforme
          </span>
          <select
            value={platform}
            onChange={(event) => setPlatform(event.target.value as PluginPlatform | "all")}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none md:max-w-xs"
          >
            <option value="all">Toutes</option>
            <option value="windows">Windows</option>
            <option value="macos">macOS</option>
            <option value="linux">Linux</option>
          </select>
        </label>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted">
          {filtered.length} plugin{filtered.length > 1 ? "s" : ""} sur {plugins.length}
        </p>
      </div>

      <PluginGrid plugins={filtered} />
    </div>
  );
}
