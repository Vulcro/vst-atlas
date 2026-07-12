import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { PluginGrid } from "@/components/PluginGrid";
import { CATEGORY_LABELS, CATEGORY_ORDER } from "@/lib/categories";
import type { PluginCategory } from "@/lib/types";
import { getPluginsByCategory } from "@/lib/plugins";

interface CategoryPageProps {
  params: Promise<{ cat: string }>;
}

export async function generateStaticParams() {
  return CATEGORY_ORDER.map((cat) => ({ cat }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { cat } = await params;
  const label = CATEGORY_LABELS[cat as PluginCategory];
  if (!label) return {};

  return {
    title: `Plugins VST — ${label}`,
    description: `Découvrez les meilleurs plugins VST de la catégorie ${label} pour la production musicale.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { cat } = await params;
  const label = CATEGORY_LABELS[cat as PluginCategory];
  if (!label) notFound();

  const plugins = getPluginsByCategory(cat).sort((a, b) =>
    a.name.localeCompare(b.name, "fr"),
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Plugins {label}
        </h1>
        <p className="mt-4 text-muted">
          {plugins.length} plugin{plugins.length > 1 ? "s" : ""} dans la catégorie{" "}
          {label.toLowerCase()}.
        </p>
      </div>

      <div className="mt-8">
        <AdSlot />
      </div>

      <div className="mt-10">
        <PluginGrid plugins={plugins} />
      </div>
    </div>
  );
}
