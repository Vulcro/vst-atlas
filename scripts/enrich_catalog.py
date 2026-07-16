#!/usr/bin/env python3
"""Enrichit le catalogue : storeUrl affiliés + descriptions éditoriales personnalisées."""

from __future__ import annotations

import json
from datetime import date
from pathlib import Path

from store_map import get_store_url

ROOT = Path(__file__).resolve().parent.parent
PATHS = [
    ROOT / "data" / "plugins.json",
    ROOT / "web" / "data" / "plugins.json",
]

# Descriptions éditoriales (FR) — ton catalogue, pas keyword stuffing.
DESCRIPTIONS: dict[str, str] = {
    "vital": "Vital s'est imposé comme le synthé wavetable gratuit de référence. Modulation visuelle, filtres expressifs et un moteur qui tient face à des outils payants — idéal pour apprendre et produire sans plafond.",
    "surge-xt": "Surge XT est un synthé hybride open-source très complet : wavetable, FM, effets intégrés et une bibliothèque de presets immense. Gratuit, multiplateforme, et sérieusement pro.",
    "helm": "Helm propose un synthé polyphonique clair, avec une interface lisible et un son propre. Parfait pour démarrer la synthèse sans se perdre dans des menus.",
    "odin-2": "Odin 2 reconstitue un analogique virtuel généreux : trois oscillateurs, filtres classiques et une vibe vintage accessible gratuitement.",
    "dexed": "Dexed recrée le Yamaha DX7 en open-source. Si vous cherchez le grain FM des années 80 — cloches, basses électriques, pads cristallins — c'est l'outil gratuit incontournable.",
    "tal-noisemaker": "TAL-NoiseMaker est un analogique soft simple et musical. Peu de fioritures, beaucoup de son : leads, pads et basses sans friction.",
    "komplete-start": "Komplete Start ouvre la porte à l'écosystème Native Instruments : Kontakt Player, quelques instruments et effets pour composer sans investissement initial.",
    "spitfire-labs": "LABS de Spitfire Audio regroupe des instruments gratuits enregistrés en studio — cordes, pianos, textures. Une base orchestrale et cinématique solide pour démarrer.",
    "decent-sampler": "Decent Sampler lit les banques Decent Samples (et plus). Léger, gratuit, et très utilisé pour les pianos et instruments communautaires.",
    "ample-guitar-m-lite-ii": "Version lite de la Martin D-41 Ample Sound : une guitare acoustique jouable gratuitement, suffisante pour maquettes et arrangements folk/pop.",
    "sforzando": "Sforzando charge les instruments au format SFZ. Discret mais indispensable si vous travaillez avec des banques orchestrales légères.",
    "valhalla-supermassive": "Supermassive transforme n'importe quelle source en nappe spatiale. Réverb et delays « cosmos » gratuits — un classique des producteurs ambient et électronique.",
    "valhalla-space-modulator": "Un flanger/modulateur gratuit au caractère très Valhalla : musical, un peu étrange, parfait pour animer leads et pads.",
    "tdr-nova": "Nova est un EQ dynamique paramétrique d'une précision rare pour un freeware. Idéal pour nettoyer un mix sans colorer trop fort.",
    "tdr-kotelnikov": "Kotelnikov compresse avec transparence. Quand vous voulez coller le mix sans « signature » audible, c'est souvent le premier choix gratuit.",
    "tdr-vos-slickeq": "SlickEQ apporte une égalisation musicale façon console. Trois modèles de courbe pour sculpter rapidement un bus ou une piste.",
    "tdr-molotok": "Molotok colore volontairement. Compresseur « caractère » pour coller batterie, voix ou bus avec une empreinte audible.",
    "tal-reverb-4": "Réverb algorithmique simple : peu de réglages, un résultat propre. Utile sur voix, snare et instruments solo.",
    "tal-chorus-lx": "Chorus inspiré du Juno-60. Une touche stéréo vintage en un clic — très efficace sur pads et synthés.",
    "ott": "OTT est le multibande « squash » devenu standard en EDM. Gratuit chez Xfer : écrase, remonte, et donne ce punch radio immédiat.",
    "krush": "Krush casse le signal en bits et sample rate. Pour lo-fi, glitch et textures sales sans installer une suite entière.",
    "chowmatrix": "Delay open-source modulaire : vous câblez vos propres trajectoires. Expérimental, mais très puissant une fois pris en main.",
    "chowtape": "Émulation de bande magnétique gratuite : saturation douce, wow/flutter et chaleur analogique sans budget.",
    "meldaproduction-free-bundle": "Plus de 30 effets Melda en gratuit. Une boîte à outils complète pour le mixage et le mastering quand le budget est serré.",
    "airwindows-consolidated": "Airwindows livre des dizaines d'algorithmes de mix « analog-ish » sans interface flashy. Pour ingénieurs qui veulent du grain, pas du marketing.",
    "analog-obsession-lala": "LALA s'inspire du LA-2A : compression optique douce, idéale sur voix et basse. Gratuit et étonnamment musical.",
    "analog-obsession-rare": "Rare évoque le Pultec : boosts larges et musicalité vintage. Un EQ gratuit pour donner de la présence sans chirurgie.",
    "ignite-amps-emissary": "Emissary est une tête d'ampli gratuite très populaire chez les guitaristes metal et rock. Directe, agressive, sans fioritures.",
    "neural-amp-modeler": "NAM charge des modèles d'amplis capturés par IA. Gratuit, open-source, et au cœur d'une communauté de captures très active.",
    "spitfire-bbc-symphony-orchestra-discover": "Découverte gratuite de l'orchestre BBC Spitfire : assez d'articulations pour esquisser des maquettes orchestrales crédibles.",
    "serum": "Serum reste une référence wavetable : édition visuelle des tables, warp puissant et écosystème de presets énorme. Le choix « sûr » en électronique moderne.",
    "fabfilter-pro-q-3": "Pro-Q 3 est l'EQ dynamique que beaucoup considèrent comme un standard de studio. Précis, musical, avec une interface qui accélère vraiment le mix.",
    "fabfilter-pro-c-2": "Pro-C 2 enchaîne des modes de compression (VCA, FET, Opto…) dans une UI claire. Polyvalent du bus drum à la voix lead.",
    "fabfilter-pro-l-2": "Pro-L 2 limite pour le mastering avec transparence et metering sérieux. Un limiteur « confiance » avant export.",
    "valhalla-vintageverb": "VintageVerb revisite les réverbs 70s/80s avec un grain chaleureux. Peu cher, énorme personnalité — un investissement souvent cité comme indispensable.",
    "valhalla-room": "Room est plus « pièce naturelle » que cosmique. Pour drums, voix et instruments acoustiques qui ont besoin d'espace crédible.",
    "soundtoys-decapitator": "Decapitator sature comme du hardware : cinq styles, drive musical, et ce caractère Soundtoys qui colle bien aux bus et aux leads.",
    "soundtoys-echoboy": "EchoBoy est un delay caméléon — bande, pédale, digital. Un outil de production autant que d'effet spécial.",
    "omnisphere": "Omnisphere est une bibliothèque-son à elle seule : hybrides, cinematic, électronique. Lourd, premium, et rarement à court d'idées.",
    "kontakt-7": "Kontakt 7 reste le lecteur d'instruments échantillonnés le plus répandu. La porte d'entrée vers des milliers de bibliothèques tierces.",
    "massive-x": "Successeur moderne de Massive : wavetables, routing flexible et son NI contemporain pour leads et basses électroniques.",
    "arturia-v-collection": "La V Collection regroupe les émulations Arturia des grands synthés et claviers. Un studio d'histoire de la synthèse dans une licence.",
    "arturia-v-collection-10": "Version récente de la V Collection : encore plus d'instruments Arturia pour couvrir vintage et moderne sans multiplier les licences.",
    "u-he-diva": "Diva est réputé pour sa chaleur analogique ultra réaliste. CPU gourmand, mais le son « console » en vaut souvent la peine.",
    "u-he-hive-2": "Hive 2 est plus léger et moderne que Diva : wavetables, XY pads, et une approche rapide pour l'électronique contemporaine.",
    "sylenth1": "Sylenth1 a marqué house et trance pendant des années. Analogique virtuel simple, presets mythiques, toujours pertinent.",
    "phase-plant": "Phase Plant est un synthé semi-modulaire : oscillateurs, noise, sampling et effets dans un rack ultra flexible.",
    "scaler-2": "Scaler 2 suggère accords, progressions et voicings. Un assistant d'harmonie pour composer plus vite sans theory paralysis.",
    "izotope-ozone-11-elements": "Ozone Elements aide à masteriser avec des suggestions IA. Une entrée accessible dans la suite Ozone pour finaliser des tracks.",
    "izotope-neutron-4": "Neutron assiste le mixage piste par piste : EQ, compression, transient. Utile pour débloquer un mix qui sonne « plat ».",
    "izotope-rx-11-elements": "RX Elements répare voix, plosives et bruits. Essentiel podcast / home studio quand l'enregistrement n'est pas parfait.",
    "soothe2": "Soothe2 chasse les résonances dures automatiquement. Sur voix, guitares et bus — un gain de temps énorme en mix.",
    "spiff": "Spiff contrôle les transitoires aigus. Pour adoucir cymbales, sifflantes ou attaques trop agressives sans tout écraser.",
    "gullfoss": "Gullfoss rééquilibre le spectre en temps réel. Un EQ « intelligent » qui clarifie rapidement un mix encombré.",
    "sonible-smart-eq-4": "smart:EQ 4 propose des courbes assistées par IA. Pratique pour démarrer un équilibre tonal avant le fine-tuning manuel.",
    "sonible-pure-unmask": "pure:unmask dégage de l'espace spectral entre deux pistes concurrentes — voix vs guitare, kick vs basse, etc.",
    "eventide-blackhole": "Blackhole crée des espaces immenses et irréels. Réverb signature pour ambient, film et sound design.",
    "eventide-h910-harmonizer": "Le H910 virtuel recrée l'harmonizer légendaire : pitch, delay et ce grain Eventide des studios 70s.",
    "softube-tape": "Tape ajoute saturation et compression de bande. Subtil ou assumé : idéal pour coller un mix trop numérique.",
    "waves-cla-2a": "CLA-2A transpose le LA-2A façon Chris Lord-Alge. Compression optique colorée, souvent en promo Waves.",
    "waves-h-reverb": "H-Reverb mélange algo et impulse. Flexible du hall naturel à l'effet créatif.",
    "output-portal": "Portal granulaire le son jusqu'à le rendre méconnaissable. Sound design expérimental et textures « wow ».",
    "portal": "Portal (Output) transforme n'importe quelle source en matière granulaire. Un effet créatif plus qu'un outil de mix classique.",
    "output-arcade": "Arcade livre des loops et instruments cloud renouvelés. Abonnement : pratique pour explorer des idées rapidement.",
    "rc-20-retro-color": "RC-20 envoie le signal dans une esthétique cassette / vinyl. Lo-fi contrôlé pour beats et indie.",
    "unfiltered-audio-byome": "BYOME est un multi-effet modulaire programmable. Pour construire ses propres chaînes de destruction sonore.",
    "unfiltered-audio-sandman-pro": "Sandman Pro joue avec le delay granulaire et le glitch rythmique. Parfait pour IDM et électronique expérimentale.",
    "baby-audio-ba-1": "BA-1 revisite un petit analogique lo-fi. Character synth pour leads croustillants et basses sales.",
    "baby-audio-super-vhs": "Super VHS empile noise, wow et saturation VHS. Un one-stop lo-fi pour moderniser (ou « détériorer ») un son trop clean.",
    "cable-guys-shaperbox-3": "ShaperBox module volume, filtre, pan et plus en rythme. Sidechain, stutter et grooves sans dessiner 40 automations.",
    "cable-guys-pancake-2": "Pancake auto-panne le signal avec des formes créatives. Gratuit et étonnamment utile en sound design.",
    "kilohearts-snap-heap": "Snap Heap est un rack d'effets modulaire gratuit. Base de l'écosystème Kilohearts pour câbler vos traitements.",
    "multipass": "Multipass traite par bandes de fréquences. Multiband créatif pour sculpter un son sans une chaîne de 10 plugins.",
    "kclip-3": "KClip clippe pour gagner du loudness avant limiteur. Outil de mastering/transient pour tracks électroniques.",
    "lfo-tool": "LFO Tool dessine des courbes de volume/filtre synchronisées. Le sidechain « pump » en un preset.",
    "cthulhu": "Cthulhu génère accords et arpèges MIDI. Posez une note, sortez une progression — composition accélérée.",
    "xfer-records-cthulhu": "Cthulhu (Xfer) transforme une note en voicings et arpèges. Très populaire pour trouver des idées d'accords vite.",
    "xfer-records-nerve": "Nerve est un sampler de drums avec resynthèse. Pour designer kits et one-shots au-delà du simple lecteur.",
    "trackspacer-2-5": "Trackspacer creuse spectraleement une piste pour en faire de la place à une autre. Sidechain intelligent kick/basse/voix.",
    "kickstart-2": "Kickstart pompe le volume en rythme. Sidechain EDM sans compression externe — simple et efficace.",
    "endless-smile": "Endless Smile construit des build-ups et transitions club. Un effet « moment » pour lives et arrangers dance.",
    "reaper": "REAPER est une DAW légère, scriptable et abordable. Licence honnête, performances solides, communauté énorme.",
    "ableton-live-12-intro": "Live Intro ouvre l'écosystème Ableton : session view, warping, et le workflow clip qui a changé la prod électronique.",
    "fl-studio-fruity-edition": "FL Fruity Edition cible beatmaking et pattern sequencing. L'entrée dans FL Studio pour hip-hop et électronique.",
    "spire": "Spire brille sur leads et supersaws EDM. Un son « club-ready » avec une UI orientée performance.",
    "pigments": "Pigments combine wavetable, analogique virtuel et sampling avec une UI Arturia très visuelle. Excellent pour apprendre en voyant le son.",
    "analog-lab-v": "Analog Lab concentre des milliers de presets Arturia. Idéal pour jouer des sons mythiques sans ouvrir chaque instrument séparément.",
    "pianoteq-8-trial": "Pianoteq modélise le piano physiquement : faible poids disque, expression réaliste. La démo/trial pour tester avant d'acheter.",
    "modartt-pianoteq-8-standard": "Pianoteq Standard offre la modélisation piano Modartt complète. Réactif, léger, et très prisé en composition portable.",
    "keyscape": "Keyscape capture des claviers rares et prestigieux. Une collection Spectrasonics pour ballades, film et pop haut de gamme.",
    "omnisphere": "Omnisphere est moins un synthé qu'un univers sonore : cinématique, électronique, hybrid. La référence premium Spectrasonics.",
    "kontakt-7": "Kontakt 7 est le standard des sample libraries. Si une bibliothèque « marche sur Kontakt », c'est celle-ci.",
    "neural-dsp-archetype-plini": "Archetype Plini livre une chaîne guitare signature : amplis, cab et effets calibrés pour lead progressif et clarté.",
    "neural-dsp-archetype-gojira": "Archetype Gojira vise le metal moderne : saturation dense, tight low-end, et presets prêts pour riffs agressifs.",
    "positive-grid-bias-fx-2": "BIAS FX assemble amplis et pédales en chaines modulaires. Polyvalent du clean jazz au high-gain.",
    "ik-multimedia-amplitube-5": "AmpliTube 5 est une suite guitare complète : amps, stompboxes, cab sim. Un studio guitare logiciel historique.",
    "overloud-th-u": "TH-U mise sur la modélisation Rig Player. Bon compromis réalisme / CPU pour enregistrement guitare.",
    "auto-tune-pro": "Auto-Tune Pro reste la référence correction de pitch et effet vocal pop/rap. Studio et scène.",
    "nectar-3-plus": "Nectar propose une chaîne vocale complète (EQ, comp, de-esser…). Un point de départ solide pour mixer une voix lead.",
    "fresh-air": "Fresh Air ajoute de l'air et de la brillance en douceur. Enhancer gratuit Slate, très utilisé en finishing.",
    "heatwave": "Heatwave sature rapidement pour ajouter de la présence. Gratuit Slate : un « glue » simple avant le mix fin.",
    "voxengo-span": "SPAN est l'analyseur spectral gratuit que tout le monde connaît. Pour voir ce que vos oreilles entendent.",
    "youlean-loudness-meter-2": "Youlean mesure le loudness LUFS selon les standards streaming/broadcast. Gratuit et indispensable avant upload.",
    "loudmax": "LoudMax est un limiteur brickwall simple et transparent. Gratuit pour caler un plafond sans usine à gaz.",
    "tal-bassline": "TAL-BassLine évoque le SH-101 : basses mono rapides et acides. Freeware efficace pour électronique.",
    "tal-u-no-lx": "TAL-U-NO-LX recrée le Juno-60 avec son chorus mythique. Pads et leads vintage sans hardware.",
    "tal-j-8": "TAL-J-8 s'attaque au Jupiter-8. Polyphonie luxueuse et son Roland classique en plugin.",
    "komplete-15-ultimate": "Komplete 15 Ultimate est le grand pack NI : instruments, effets et expansions pour un studio complet.",
    "komplete-15-standard": "Komplete 15 Standard concentre l'essentiel NI sans monter à Ultimate. Bon équilibre prix / couverture.",
    "komplete-15-select": "Select est l'entrée Komplete 15 : moins d'instruments, mais déjà de quoi produire sérieusement.",
    "fabfilter-total-bundle": "Le Total Bundle FabFilter regroupe EQ, dynamique, réverb et saturation de la marque. Une suite « pro » cohérente.",
    "soundtoys-5": "Soundtoys 5 packe Decapitator, EchoBoy, Crystallizer et le reste de la famille. Créativité analogique logiciel.",
    "izotope-music-production-suite-6": "La Music Production Suite assemble Ozone, Neutron, RX, Nectar… Un écosystème iZotope pour mix et master assistés.",
    "plugin-alliance-mega-bundle": "Mega Bundle Plugin Alliance : une collection dense d'émulations et outils de mix/mastering premium.",
    "waves-mercury-bundle": "Mercury est l'un des plus vastes bundles Waves. Couvre mix, master, live et création — souvent en promo.",
    "slate-digital-all-access-pass": "All Access Pass débloque les plugins Slate au mois. Utile pour tester VMR, FG-X et co. sans tout acheter.",
    "meldaproduction-mcompletebundle": "MCompleteBundle : la quasi-totalité Melda dans une licence. Quantité massive pour sound design et mastering.",
    "splice": "Splice donne accès à des millions de samples et presets via abonnement. Le cloud sample de référence pour beaucoup de producers.",
    "loopcloud": "Loopcloud gère et preview des packs Loopmasters dans un plugin. Crédits mensuels pour alimenter vos projets.",
    "landr-samples": "LANDR Samples connecte une bibliothèque de samples à votre DAW. Entrée gratuite dans l'écosystème LANDR.",
    "beatport-sounds": "Beatport Sounds commercialise packs de loops et one-shots par genre club. Orienté dancefloor et DJ-producers.",
    "cymatics-infinity-loop-pack": "Pack de loops Cymatics côté électronique/trap. Souvent une porte d'entrée gratuite vers leur catalogue.",
    "cymatics-free-drum-kits": "Kits gratuits Cymatics (808, snares, hats). Parfaits pour esquisser un beat sans budget samples.",
    "unison-midi-chord-pack": "Des centaines de progressions MIDI Unison. Posez-les sur un piano ou un synthé et avancez la compos.",
    "unison-free-midi-pack": "Pack MIDI gratuit Unison pour tester leur approche mélodies/accords avant d'acheter les collections payantes.",
    "hooktheory-hookpad": "Hookpad guide la composition avec théorie visuelle et export MIDI. Excellent pour apprendre en faisant.",
}


def category_voice(category: str, name: str, developer: str, is_free: bool) -> str:
    price_bit = "en gratuit" if is_free else "côté pro"
    voices = {
        "synth": f"{name} ({developer}) est un instrument de synthèse à explorer {price_bit}. On le range ici pour son identité sonore et son usage en production, pas pour une liste de mots-clés.",
        "eq": f"{name} sculpte le spectre avec l'approche {developer}. Un EQ à choisir quand vous savez ce que vous voulez corriger ou mettre en avant.",
        "compressor": f"{name} gère la dynamique à la manière {developer}. Utile pour coller, contrôler ou colorer — selon le caractère du plugin.",
        "reverb": f"{name} place le son dans un espace. Chez {developer}, l'accent est mis sur une signature réverb identifiable plutôt qu'un preset fourre-tout.",
        "delay": f"{name} travaille le temps et les répétitions. Un delay {developer} pour grooves, spatialisations et effets créatifs.",
        "distortion": f"{name} ajoute saturation ou destruction contrôlée. L'outil {developer} quand le signal est trop sage.",
        "modulation": f"{name} anime le son (chorus, phaser, flanger…). De la vie stéréo sans réécrire toute la piste.",
        "drums": f"{name} s'occupe du rythme et des hits. Une option {developer} pour programmer ou remplacer une batterie.",
        "drum_kit": f"{name} est un kit / pack de drums. One-shots et grooves prêts à droper dans un projet {('gratuitement' if is_free else 'depuis la boutique')}.",
        "loop_pack": f"{name} regroupe des loops et samples. Une banque {developer} pour accélérer l'arrangement sans repartir de zéro.",
        "midi_kit": f"{name} livre des idées MIDI (accords, mélodies, patterns). Branchez un instrument et transformez le MIDI en arrangement.",
        "bundle": f"{name} regroupe plusieurs outils {developer}. Intéressant si vous voulez une suite cohérente plutôt que des licences éparpillées.",
        "guitar": f"{name} cible guitare (amp, cab ou instrument). La proposition {developer} pour enregistrer ou composer sans micro en face d'un ampli.",
        "piano": f"{name} est un piano / clavier {developer}. Choisissez-le pour le toucher et le caractère, pas seulement pour le mot « piano ».",
        "vocal": f"{name} traite ou produit la voix. Un outil {developer} pour corriger, embellir ou monter une chaîne vocale.",
        "sampler": f"{name} lit ou joue des samples. Chez {developer}, l'enjeu est la bibliothèque et la jouabilité plus que le marketing.",
        "orchestral": f"{name} apporte une couleur orchestrale / cinématique. Une banque {developer} pour maquettes et scores.",
        "mastering": f"{name} intervient en fin de chaîne. Limiteur, loudness ou suite de mastering signée {developer}.",
        "analyzer": f"{name} mesure au lieu de colorer. Un utilitaire {developer} pour décider avec des chiffres (et vos oreilles).",
        "utility": f"{name} est un utilitaire de production ({developer}). Pas glamour, souvent indispensable au quotidien.",
    }
    return voices.get(
        category,
        f"{name} est un outil audio publié par {developer}. Fiche catalogue VST Atlas — lien officiel vérifié, sans contenu piraté.",
    )


def rewrite_description(plugin: dict) -> str:
    slug = plugin["slug"]
    if slug in DESCRIPTIONS:
        return DESCRIPTIONS[slug]

    # LABS : éviter le spam « gratuit pour … »
    name = plugin["name"]
    if name.startswith("LABS "):
        topic = name.replace("LABS ", "").strip()
        return (
            f"Instrument gratuit Spitfire LABS — {topic}. "
            f"Enregistré / conçu pour la composition ; téléchargeable via l'app LABS officielle."
        )

    # RSS / auto : alléger le ton « SEO »
    desc = (plugin.get("description") or "").strip()
    if plugin.get("source") in {"rss", "kvr", "github"} and (
        len(desc) < 100
        or "répertorié" in desc.lower()
        or "détecté" in desc.lower()
        or desc.lower().startswith(plugin["name"].lower())
    ):
        return category_voice(
            plugin["category"],
            plugin["name"],
            plugin["developer"],
            bool(plugin.get("isFree")),
        )

    if len(desc) < 90 or desc.count(",") >= 3 and "gratuit" in desc.lower():
        return category_voice(
            plugin["category"],
            plugin["name"],
            plugin["developer"],
            bool(plugin.get("isFree")),
        )

    return desc


def enrich(plugin: dict) -> dict:
    store_url, partner = get_store_url(plugin["slug"])

    # Si officialUrl est déjà une boutique affiliée, la traiter comme store
    official = plugin.get("officialUrl", "")
    lower = official.lower()
    if "pluginboutique.com" in lower:
        store_url = official
        partner = "Plugin Boutique"
    elif "beatport.com" in lower:
        store_url = official
        partner = "Beatport"

    plugin["description"] = rewrite_description(plugin)
    plugin["storeUrl"] = store_url
    plugin["storePartner"] = partner
    return plugin


def main() -> None:
    raw = json.loads(PATHS[0].read_text(encoding="utf-8"))
    plugins = [enrich(dict(p)) for p in raw["plugins"]]
    payload = {
        "version": raw.get("version", "1.1.0"),
        "updatedAt": date.today().isoformat(),
        "plugins": plugins,
    }
    encoded = json.dumps(payload, ensure_ascii=False, indent=2)
    for path in PATHS:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(encoded, encoding="utf-8")

    with_store = sum(1 for p in plugins if p.get("storeUrl"))
    print(f"Enrichissement OK — {len(plugins)} plugins, {with_store} avec storeUrl affiliable")


if __name__ == "__main__":
    main()
