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
  loop_pack: "Packs de loops",
  drum_kit: "Kits de batterie",
  midi_kit: "Packs MIDI",
  bundle: "Bundles",
};

export const CATEGORY_INTROS: Record<PluginCategory, string> = {
  synth:
    "Les synthés VST sont le cœur de beaucoup de productions MAO : leads, basses, pads et textures. Comparez ici des instruments gratuits et payants (wavetable, analogique virtuel, FM) avec liens officiels et boutiques partenaires.",
  eq: "Un bon égaliseur VST sculpte le spectre sans ruiner le mix. Cette catégorie regroupe EQ paramétriques, dynamiques et « intelligents » pour la production musicale et le mastering.",
  compressor:
    "Les compresseurs VST collent le son, contrôlent la dynamique ou ajoutent du caractère. Du transparent au coloré, pour voix, bus drums et mastering dans votre DAW.",
  reverb:
    "Réverbérations VST pour placer vos pistes dans un espace : halls, rooms, plates et ambiances créatives. Outils gratuits et références studio pour la MAO.",
  delay:
    "Delays et échos VST — tape, digital, granulaire — pour grooves, spatialisation et sound design. Sélection pour Ableton, FL Studio, Reaper et autres DAW.",
  distortion:
    "Saturation, overdrive et bitcrush : des plugins VST pour ajouter de la chaleur ou détruire le signal avec style. Idéal beats, guitares et sound design.",
  modulation:
    "Chorus, phaser, flanger et auto-pan VST pour animer leads et pads. Effets de modulation classiques et créatifs pour la production électronique.",
  utility:
    "Utilitaires MAO : sidechain, analyseurs, générateurs MIDI, racks d’effets. Les outils du quotidien qui font gagner du temps en studio.",
  sampler:
    "Samplers et lecteurs d’instruments VST (Kontakt, Decent Sampler, SFZ…). Accédez à des bibliothèques et one-shots pour composer plus vite.",
  drums:
    "Batteries virtuelles et drum machines VST pour rock, hip-hop, EDM et plus. Programmez des grooves réalistes ou électroniques dans votre DAW.",
  mastering:
    "Limiteurs, suites de mastering et outils de loudness VST pour finaliser vos titres avant streaming. Du freeware au premium.",
  analyzer:
    "Analyseurs spectraux, VU-mètres et loudness meters VST. Mesurez pour mixer et masteriser avec plus de précision.",
  vocal:
    "Plugins VST pour la voix : Auto-Tune, chaînes vocales, réparation et harmonisation. Outils pour home studio et podcast.",
  guitar:
    "Amps, cab sims et guitares virtuelles VST. Enregistrez et produisez de la guitare sans micro face à un ampli.",
  piano:
    "Pianos et claviers VST — acoustiques, électriques, modélisés. Pour composition, ballades et maquettes MAO.",
  orchestral:
    "Instruments orchestraux et cinématiques VST : cordes, cuivres, textures. Pour scores, trailers et compositions ambient.",
  loop_pack:
    "Packs de loops et samples pour hip-hop, trap, house et techno. Banques WAV et plateformes cloud avec liens officiels.",
  drum_kit:
    "Kits de batterie et one-shots (808, kicks, snares). Packs WAV et expansions pour produire des beats rapidement.",
  midi_kit:
    "Packs MIDI : accords, mélodies et basslines prêts à l’emploi. Accélérez la composition sans bloquer sur la théorie.",
  bundle:
    "Bundles et suites de plugins VST : collections d’instruments et d’effets pour équiper un home studio d’un coup.",
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
    title: "Packs de loops",
    headline: "Packs de loops & samples",
    description:
      "Loops, one-shots et packs de samples pour hip-hop, trap, house, techno et plus. Liens officiels vers les éditeurs et plateformes reconnues.",
  },
  {
    slug: "drum-kits",
    category: "drum_kit",
    title: "Kits de batterie",
    headline: "Kits de batterie & one-shots",
    description:
      "Kits de batterie, 808, kicks, snares et percussions pour vos productions. Packs WAV, Kontakt, Battery et plus.",
  },
  {
    slug: "midi-kits",
    category: "midi_kit",
    title: "Packs MIDI",
    headline: "Packs MIDI & progressions",
    description:
      "Packs MIDI : accords, mélodies, basslines et progressions prêtes à l'emploi pour accélérer votre composition.",
  },
  {
    slug: "bundles",
    category: "bundle",
    title: "Bundles",
    headline: "Bundles plugins & instruments VST",
    description:
      "Bundles et collections complètes de plugins VST, instruments et effets — les meilleures offres groupées des éditeurs officiels.",
  },
];

export function getCategoryLabel(category: PluginCategory): string {
  return CATEGORY_LABELS[category] ?? category;
}

export function getCategoryIntro(category: PluginCategory): string {
  return CATEGORY_INTROS[category] ?? "";
}

export function getSectionBySlug(slug: string): ContentSection | undefined {
  return CONTENT_SECTIONS.find((section) => section.slug === slug);
}
