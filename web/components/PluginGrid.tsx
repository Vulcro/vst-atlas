import type { Plugin } from "@/lib/types";
import { PluginCard } from "./PluginCard";

interface PluginGridProps {
  plugins: Plugin[];
  emptyMessage?: string;
}

export function PluginGrid({
  plugins,
  emptyMessage = "Aucun plugin ne correspond à votre recherche.",
}: PluginGridProps) {
  if (plugins.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/40 p-10 text-center text-muted">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {plugins.map((plugin) => (
        <PluginCard key={plugin.id} plugin={plugin} />
      ))}
    </div>
  );
}
