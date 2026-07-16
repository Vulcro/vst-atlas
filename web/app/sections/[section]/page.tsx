import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateBanner } from "@/components/AffiliateBanner";
import { PluginGrid } from "@/components/PluginGrid";
import { CONTENT_SECTIONS, getSectionBySlug } from "@/lib/categories";
import { getPluginsByCategory } from "@/lib/plugins";
import { buildPageMetadata } from "@/lib/seo";

interface SectionPageProps {
  params: Promise<{ section: string }>;
}

export async function generateStaticParams() {
  return CONTENT_SECTIONS.map((section) => ({ section: section.slug }));
}

export async function generateMetadata({ params }: SectionPageProps): Promise<Metadata> {
  const { section: sectionSlug } = await params;
  const section = getSectionBySlug(sectionSlug);
  if (!section) return {};

  return buildPageMetadata({
    title: `${section.title} pour la MAO`,
    description: section.description,
    path: `/sections/${section.slug}`,
  });
}

export default async function ContentSectionPage({ params }: SectionPageProps) {
  const { section: sectionSlug } = await params;
  const section = getSectionBySlug(sectionSlug);
  if (!section) notFound();

  const plugins = getPluginsByCategory(section.category).sort((a, b) =>
    a.name.localeCompare(b.name, "fr"),
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-soft">
          {section.title}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {section.headline}
        </h1>
        <p className="mt-4 leading-relaxed text-muted">{section.description}</p>
      </div>

      <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <AdSlot className="w-full max-w-xl" />
        <AffiliateBanner variant="square200" />
      </div>

      <div className="mt-10">
        <PluginGrid
          plugins={plugins}
          emptyMessage={`Aucun ${section.title.toLowerCase()} répertorié pour le moment.`}
        />
      </div>
    </div>
  );
}
