export type PluginCategory =
  | "synth"
  | "eq"
  | "compressor"
  | "reverb"
  | "delay"
  | "distortion"
  | "modulation"
  | "utility"
  | "sampler"
  | "drums"
  | "mastering"
  | "analyzer"
  | "vocal"
  | "guitar"
  | "piano"
  | "orchestral"
  | "loop_pack"
  | "drum_kit"
  | "midi_kit"
  | "bundle";

export type PluginPlatform = "windows" | "macos" | "linux";

export type PluginFormat =
  | "VST3"
  | "AU"
  | "AAX"
  | "LV2"
  | "Standalone"
  | "WAV"
  | "MIDI"
  | "Kontakt"
  | "Battery"
  | "EXS24"
  | "SFZ";

export type StorePartner = "Plugin Boutique" | "Beatport";

export interface Plugin {
  id: string;
  slug: string;
  name: string;
  developer: string;
  category: PluginCategory;
  formats: PluginFormat[];
  platforms: PluginPlatform[];
  isFree: boolean;
  priceEur: number | null;
  officialUrl: string;
  /** URL boutique affiliée (Plugin Boutique / Beatport), si disponible. */
  storeUrl?: string | null;
  storePartner?: StorePartner | null;
  description: string;
  discoveredAt: string;
  source: string;
}

export interface PluginCatalog {
  version: string;
  updatedAt: string;
  plugins: Plugin[];
}

export interface PluginFilters {
  query?: string;
  category?: PluginCategory | "all";
  pricing?: "all" | "free" | "paid";
  platform?: PluginPlatform | "all";
}
