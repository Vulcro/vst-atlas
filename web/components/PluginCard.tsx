import Link from "next/link";
import type { Plugin } from "@/lib/types";
import { formatPrice } from "@/lib/plugins";
import { CategoryBadge } from "./CategoryBadge";

interface PluginCardProps {
  plugin: Plugin;
}

export function PluginCard({ plugin }: PluginCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition hover:border-accent/40 hover:bg-card-hover">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">
            <Link href={`/plugin/${plugin.slug}`} className="hover:text-accent-soft">
              {plugin.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-muted">{plugin.developer}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
            plugin.isFree
              ? "bg-success/15 text-success"
              : "bg-warning/15 text-warning"
          }`}
        >
          {formatPrice(plugin)}
        </span>
      </div>

      <p className="mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
        {plugin.description}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <CategoryBadge category={plugin.category} />
        <span className="text-xs text-muted">{plugin.formats.join(" · ")}</span>
      </div>
    </article>
  );
}
