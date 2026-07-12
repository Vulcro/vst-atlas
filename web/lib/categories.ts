import type { PluginCategory } from "./types";

export const CATEGORY_LABELS: Record<PluginCategory, string> = {
  synth: "Synthé",
  eq: "Égalisation",
  compressor: "Compresseur",
  reverb: "Réverbération",
  delay: "Délai",
  distortion: "Distorsion",
  modulation: "Modulation",
  utility: "Utilitaire",
  sampler: "Sampler",
  drums: "Batterie",
  mastering: "Mastering",
  analyzer: "Analyseur",
  vocal: "Voix",
  guitar: "Guitare",
  piano: "Piano",
  orchestral: "Orchestral",
  loop_pack: "Loop Pack",
  drum_kit: "Drum Kit",
  midi_kit: "MIDI Kit",
  bundle: "Bundle",
};

export const CATEGORY_ORDER: PluginCategory[] = [
  "synth",
  "eq",
  "compressor",
  "reverb",
  "delay",
  "distortion",
  "modulation",
  "drums",
  "drum_kit",
  "loop_pack",
  "midi_kit",
  "bundle",
  "guitar",
  "piano",
  "vocal",
  "sampler",
  "orchestral",
  "mastering",
  "analyzer",
  "utility",
];

export interface ContentSection {
  slug: string;
  category: PluginCategory;
  title: string;
  headline: string;
  description: string;
}

export const CONTENT_SECTIONS: ContentSection[] = [
  {
    slug: "loop-packs",
    category: "loop_pack",
    title: "Loop Packs",
    headline: "Loop packs & samples",
    description:
      "Loops, one-shots et packs de samples pour hip-hop, trap, house, techno et plus. Liens officiels vers les éditeurs et plateformes reconnues.",
  },
  {
    slug: "drum-kits",
    category: "drum_kit",
    title: "Drum Kits",
    headline: "Drum kits & one-shots",
    description:
      "Kits de batterie, 808, kicks, snares et percussions pour vos productions. Packs WAV, Kontakt, Battery et plus.",
  },
  {
    slug: "midi-kits",
    category: "midi_kit",
    title: "MIDI Kits",
    headline: "MIDI kits & progressions",
    description:
      "Packs MIDI : accords, mélodies, basslines et progressions prêtes à l'emploi pour accélérer votre composition.",
  },
  {
    slug: "bundles",
    category: "bundle",
    title: "Bundles",
    headline: "Bundles plugins & instruments",
    description:
      "Bundles et collections complètes de plugins, instruments et effets — les meilleures offres groupées des éditeurs officiels.",
  },
];

export function getCategoryLabel(category: PluginCategory): string {
  return CATEGORY_LABELS[category] ?? category;
}

export function getSectionBySlug(slug: string): ContentSection | undefined {
  return CONTENT_SECTIONS.find((section) => section.slug === slug);
}
