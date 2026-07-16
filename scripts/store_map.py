"""Mapping curated slug -> URL boutique affiliée (Plugin Boutique / Beatport)."""

from __future__ import annotations

# URLs produit Plugin Boutique (deeplink via a_aid côté site).
# Préférer une fiche produit ; sinon recherche catalogue PB.
PLUGIN_BOUTIQUE_STORE: dict[str, str] = {
    # Déjà pointés vers PB
    "scaler-2": "https://www.pluginboutique.com/products/2-Scaler-2",
    "endless-smile": "https://www.pluginboutique.com/products/39-Endless-Smile",
    "kickstart-2": "https://www.pluginboutique.com/products/2-Kickstart-2",
    # Synthés / instruments populaires
    "serum": "https://www.pluginboutique.com/search?search=Serum+Xfer",
    "vital": "https://www.pluginboutique.com/search?search=Vital",
    "surge-xt": "https://www.pluginboutique.com/search?search=Surge+XT",
    "u-he-diva": "https://www.pluginboutique.com/search?search=Diva+u-he",
    "u-he-hive-2": "https://www.pluginboutique.com/search?search=Hive+2",
    "sylenth1": "https://www.pluginboutique.com/search?search=Sylenth1",
    "phase-plant": "https://www.pluginboutique.com/search?search=Phase+Plant",
    "pigments": "https://www.pluginboutique.com/search?search=Pigments+Arturia",
    "analog-lab-v": "https://www.pluginboutique.com/search?search=Analog+Lab",
    "spire": "https://www.pluginboutique.com/search?search=Spire+Reveal",
    "massive-x": "https://www.pluginboutique.com/search?search=Massive+X",
    "omnisphere": "https://www.pluginboutique.com/search?search=Omnisphere",
    "keyscape": "https://www.pluginboutique.com/search?search=Keyscape",
    "nexus": "https://www.pluginboutique.com/search?search=Nexus+reFX",
    "tal-u-no-lx": "https://www.pluginboutique.com/search?search=TAL-U-NO-LX",
    "tal-j-8": "https://www.pluginboutique.com/search?search=TAL-J-8",
    "baby-audio-ba-1": "https://www.pluginboutique.com/search?search=BA-1+Baby+Audio",
    "initial-audio-sektor": "https://www.pluginboutique.com/search?search=Sektor+Initial",
    "d16-lush-2": "https://www.pluginboutique.com/search?search=Lush+2+D16",
    "sublab-xl": "https://www.pluginboutique.com/search?search=SubLab+XL",
    # Effets FabFilter / Valhalla / Soundtoys
    "fabfilter-pro-q-3": "https://www.pluginboutique.com/search?search=Pro-Q+3",
    "fabfilter-pro-c-2": "https://www.pluginboutique.com/search?search=Pro-C+2",
    "fabfilter-pro-l-2": "https://www.pluginboutique.com/search?search=Pro-L+2",
    "fabfilter-total-bundle": "https://www.pluginboutique.com/search?search=FabFilter+Total+Bundle",
    "valhalla-vintageverb": "https://www.pluginboutique.com/search?search=VintageVerb",
    "valhalla-room": "https://www.pluginboutique.com/search?search=Valhalla+Room",
    "valhalla-supermassive": "https://www.pluginboutique.com/search?search=Supermassive",
    "soundtoys-decapitator": "https://www.pluginboutique.com/search?search=Decapitator",
    "soundtoys-echoboy": "https://www.pluginboutique.com/search?search=EchoBoy",
    "soundtoys-5": "https://www.pluginboutique.com/search?search=Soundtoys+5",
    # iZotope / oeksound / sonible
    "izotope-ozone-11-elements": "https://www.pluginboutique.com/search?search=Ozone+Elements",
    "izotope-neutron-4": "https://www.pluginboutique.com/search?search=Neutron",
    "izotope-rx-11-elements": "https://www.pluginboutique.com/search?search=RX+Elements",
    "nectar-3-plus": "https://www.pluginboutique.com/search?search=Nectar",
    "izotope-music-production-suite-6": "https://www.pluginboutique.com/search?search=Music+Production+Suite",
    "soothe2": "https://www.pluginboutique.com/search?search=Soothe2",
    "spiff": "https://www.pluginboutique.com/search?search=Spiff+oeksound",
    "gullfoss": "https://www.pluginboutique.com/search?search=Gullfoss",
    "sonible-smart-eq-4": "https://www.pluginboutique.com/search?search=smart%3AEQ",
    "sonible-pure-unmask": "https://www.pluginboutique.com/search?search=pure%3Aunmask",
    # NI / Arturia / Softube / Slate
    "kontakt-7": "https://www.pluginboutique.com/search?search=Kontakt+7",
    "komplete-15-ultimate": "https://www.pluginboutique.com/search?search=Komplete+15+Ultimate",
    "komplete-15-standard": "https://www.pluginboutique.com/search?search=Komplete+15",
    "komplete-15-select": "https://www.pluginboutique.com/search?search=Komplete+15+Select",
    "arturia-v-collection": "https://www.pluginboutique.com/search?search=V+Collection",
    "arturia-v-collection-10": "https://www.pluginboutique.com/search?search=V+Collection",
    "guitar-rig-7-pro": "https://www.pluginboutique.com/search?search=Guitar+Rig",
    "softube-tape": "https://www.pluginboutique.com/search?search=Softube+Tape",
    "slate-digital-virtual-mix-rack": "https://www.pluginboutique.com/search?search=Virtual+Mix+Rack",
    "slate-digital-fg-x": "https://www.pluginboutique.com/search?search=FG-X",
    "slate-digital-all-access-pass": "https://www.pluginboutique.com/search?search=All+Access+Pass",
    "fresh-air": "https://www.pluginboutique.com/search?search=Fresh+Air+Slate",
    # Output / Cableguys / Unfiltered / Denise / Klevgrand
    "output-portal": "https://www.pluginboutique.com/search?search=Portal+Output",
    "portal": "https://www.pluginboutique.com/search?search=Portal+Output",
    "output-arcade": "https://www.pluginboutique.com/search?search=Arcade+Output",
    "rc-20-retro-color": "https://www.pluginboutique.com/search?search=RC-20",
    "cable-guys-shaperbox-3": "https://www.pluginboutique.com/search?search=ShaperBox",
    "unfiltered-audio-byome": "https://www.pluginboutique.com/search?search=BYOME",
    "unfiltered-audio-sandman-pro": "https://www.pluginboutique.com/search?search=Sandman+Pro",
    "baby-audio-super-vhs": "https://www.pluginboutique.com/search?search=Super+VHS",
    "denise-audio-perfect-room-2": "https://www.pluginboutique.com/search?search=Perfect+Room",
    "denise-audio-bass-xl": "https://www.pluginboutique.com/search?search=Bass+XL",
    "klevgrand-brusfri": "https://www.pluginboutique.com/search?search=Brusfri",
    "klevgrand-pana": "https://www.pluginboutique.com/search?search=Pana+Klevgrand",
    "goodhertz-dc19": "https://www.pluginboutique.com/search?search=DC19",
    "goodhertz-tupe": "https://www.pluginboutique.com/search?search=Tupe",
    "audiothing-dials": "https://www.pluginboutique.com/search?search=Dials+AudioThing",
    "audiothing-speakers": "https://www.pluginboutique.com/search?search=Speakers+AudioThing",
    "audiomodern-riffer": "https://www.pluginboutique.com/search?search=Riffer",
    # Drums / guitar / vocal
    "xln-audio-addictive-drums-2": "https://www.pluginboutique.com/search?search=Addictive+Drums",
    "xln-audio-addictive-keys": "https://www.pluginboutique.com/search?search=Addictive+Keys",
    "toontrack-ezdrummer-3": "https://www.pluginboutique.com/search?search=EZdrummer+3",
    "toontrack-superior-drummer-3": "https://www.pluginboutique.com/search?search=Superior+Drummer+3",
    "steven-slate-drums-5": "https://www.pluginboutique.com/search?search=Steven+Slate+Drums",
    "sonic-academy-kick-2": "https://www.pluginboutique.com/search?search=KICK+2",
    "sonic-academy-ana-2": "https://www.pluginboutique.com/search?search=ANA+2",
    "neural-dsp-archetype-plini": "https://www.pluginboutique.com/search?search=Archetype+Plini",
    "neural-dsp-archetype-gojira": "https://www.pluginboutique.com/search?search=Archetype+Gojira",
    "positive-grid-bias-fx-2": "https://www.pluginboutique.com/search?search=BIAS+FX",
    "overloud-th-u": "https://www.pluginboutique.com/search?search=TH-U",
    "ik-multimedia-amplitube-5": "https://www.pluginboutique.com/search?search=AmpliTube+5",
    "auto-tune-pro": "https://www.pluginboutique.com/search?search=Auto-Tune+Pro",
    "vocal-rider": "https://www.pluginboutique.com/search?search=Vocal+Rider",
    "cla-vocals": "https://www.pluginboutique.com/search?search=CLA+Vocals",
    "waves-cla-2a": "https://www.pluginboutique.com/search?search=CLA-2A",
    "waves-h-reverb": "https://www.pluginboutique.com/search?search=H-Reverb",
    "waves-mercury-bundle": "https://www.pluginboutique.com/search?search=Waves+Mercury",
    # Utility / MIDI / mastering helpers
    "xfer-records-cthulhu": "https://www.pluginboutique.com/search?search=Cthulhu+Xfer",
    "cthulhu": "https://www.pluginboutique.com/search?search=Cthulhu+Xfer",
    "lfo-tool": "https://www.pluginboutique.com/search?search=LFO+Tool",
    "xfer-records-nerve": "https://www.pluginboutique.com/search?search=Nerve+Xfer",
    "trackspacer-2-5": "https://www.pluginboutique.com/search?search=Trackspacer",
    "instacomposer-3": "https://www.pluginboutique.com/search?search=InstaComposer",
    "wa-production-midi-chord-pack": "https://www.pluginboutique.com/search?search=MIDI+Chord+Pack",
    "kilohearts-snap-heap": "https://www.pluginboutique.com/search?search=Snap+Heap",
    "multipass": "https://www.pluginboutique.com/search?search=Multipass+Kilohearts",
    "kclip-3": "https://www.pluginboutique.com/search?search=KClip",
    "krush": "https://www.pluginboutique.com/search?search=Krush+Kilohearts",
    "ott": "https://www.pluginboutique.com/search?search=OTT+Xfer",
    "meldaProduction-mcompletebundle": "https://www.pluginboutique.com/search?search=MCompleteBundle",
    "plugin-alliance-mega-bundle": "https://www.pluginboutique.com/search?search=Plugin+Alliance",
    "eventide-blackhole": "https://www.pluginboutique.com/search?search=Blackhole+Eventide",
    "eventide-h910-harmonizer": "https://www.pluginboutique.com/search?search=H910",
    "sugar-bytes-effectrix": "https://www.pluginboutique.com/search?search=Effectrix",
    "sugar-bytes-looperator": "https://www.pluginboutique.com/search?search=Looperator",
    "cable-guys-pancake-2": "https://www.pluginboutique.com/search?search=Pancake",
    "pianoteq-8-trial": "https://www.pluginboutique.com/search?search=Pianoteq",
    "modartt-pianoteq-8-standard": "https://www.pluginboutique.com/search?search=Pianoteq",
    "reaper": "https://www.pluginboutique.com/search?search=REAPER",
    "slayed-gnarly": "https://www.pluginboutique.com/search?search=Slayed+Gnarly",
}

BEATPORT_STORE: dict[str, str] = {
    "beatport-sounds": "https://www.beatport.com/sounds",
    "808-mafia-official-kits": "https://www.beatport.com/sounds",
    "splice": "https://www.beatport.com/sounds",  # fallback — Splice n'est pas Beatport; remove
}

# Correction : retirer splice de Beatport
BEATPORT_STORE.pop("splice", None)

STORE_PARTNER: dict[str, str] = {
    **{slug: "Plugin Boutique" for slug in PLUGIN_BOUTIQUE_STORE},
    **{slug: "Beatport" for slug in BEATPORT_STORE},
}


def get_store_url(slug: str) -> tuple[str | None, str | None]:
    if slug in PLUGIN_BOUTIQUE_STORE:
        return PLUGIN_BOUTIQUE_STORE[slug], "Plugin Boutique"
    if slug in BEATPORT_STORE:
        return BEATPORT_STORE[slug], "Beatport"
    return None, None
