import Link from "next/link";
import type { PluginCategory } from "@/lib/types";
import { getCategoryLabel } from "@/lib/categories";

const CATEGORY_COLORS: Record<PluginCategory, string> = {
  synth: "bg-accent/15 text-accent-soft",
  eq: "bg-sky-500/15 text-sky-300",
  compressor: "bg-orange-500/15 text-orange-300",
  reverb: "bg-indigo-500/15 text-indigo-300",
  delay: "bg-cyan-500/15 text-cyan-300",
  distortion: "bg-rose-500/15 text-rose-300",
  modulation: "bg-fuchsia-500/15 text-fuchsia-300",
  utility: "bg-slate-500/15 text-slate-300",
  sampler: "bg-violet-500/15 text-violet-300",
  drums: "bg-amber-500/15 text-amber-300",
  mastering: "bg-emerald-500/15 text-emerald-300",
  analyzer: "bg-teal-500/15 text-teal-300",
  vocal: "bg-pink-500/15 text-pink-300",
  guitar: "bg-lime-500/15 text-lime-300",
  piano: "bg-yellow-500/15 text-yellow-300",
  orchestral: "bg-purple-500/15 text-purple-300",
  loop_pack: "bg-blue-500/15 text-blue-300",
  drum_kit: "bg-red-500/15 text-red-300",
  midi_kit: "bg-green-500/15 text-green-300",
  bundle: "bg-amber-400/15 text-amber-200",
};

interface CategoryBadgeProps {
  category: PluginCategory;
  linked?: boolean;
}

export function CategoryBadge({ category, linked = true }: CategoryBadgeProps) {
  const className = `inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${CATEGORY_COLORS[category]}`;
  const label = getCategoryLabel(category);

  if (!linked) {
    return <span className={className}>{label}</span>;
  }

  return (
    <Link href={`/categorie/${category}`} className={`${className} hover:opacity-90`}>
      {label}
    </Link>
  );
}
