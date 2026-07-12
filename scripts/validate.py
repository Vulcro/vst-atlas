"""Validation des URLs et filtrage anti-piratage pour le catalogue VST."""

from __future__ import annotations

import re
from urllib.parse import urlparse

BLOCKED_KEYWORDS = (
    "crack",
    "torrent",
    "warez",
    "nfo",
    "keygen",
    "pirate",
    "nulled",
    "rutracker",
    "1337x",
    "tpb",
    "serial",
)

ALLOWED_DOMAINS = frozenset(
    {
        "vital.audio",
        "surge-synthesizer.github.io",
        "valhalladsp.com",
        "tokyodawn.net",
        "tal-software.com",
        "theodin2.com",
        "asb2m10.github.io",
        "spitfireaudio.com",
        "native-instruments.com",
        "amplesound.net",
        "xferrecords.com",
        "kilohearts.com",
        "github.com",
        "gitlab.com",
        "bitbucket.org",
        "meldaproduction.com",
        "analogobsession.com",
        "matttytel.com",
        "tytel.org",
        "thewavewarden.com",
        "digitalsuburban.com",
        "plogue.com",
        "illformed.com",
        "loudmax.blogspot.com",
        "voxengo.com",
        "youlean.co",
        "tbproaudio.de",
        "lennardigital.com",
        "reveal-sound.com",
        "refx.com",
        "wavesfactory.com",
        "soundmagic.com.cn",
        "ivy-audio.com",
        "vis.versilstudios.com",
        "impactsoundworks.com",
        "antarestech.com",
        "soundtheory.com",
        "ddmf.eu",
        "cableguys.com",
        "waproduction.com",
        "cymatics.fm",
        "unison.audio",
        "blackoctopus-sound.com",
        "samplemagic.com",
        "touchloops.com",
        "producerloops.com",
        "ghostsyndicate.net",
        "hooktheory.com",
        "producerhive.com",
        "loopmasters.com",
        "initialaudio.com",
        "sublabxl.com",
        "audiority.com",
        "xlnaudio.com",
        "toontrack.com",
        "stevenslatedrums.com",
        "fxpansion.com",
        "neuralampmodeler.com",
        "fractalaudio.com",
        "roland.com",
        "vsl.co.at",
        "loopmasters.com",
        "futureaudioworkshop.com",
        "decentsamples.com",
        "pianobook.co.uk",
        "kvraudio.com",
        "pluginboutique.com",
        "thomann.de",
        "thomann.fr",
        "ableton.com",
        "steinberg.net",
        "izotope.com",
        "fabfilter.com",
        "soundtoys.com",
        "waves.com",
        "arturia.com",
        "u-he.com",
        "spectrasonics.net",
        "output.com",
        "slatedigital.com",
        "plugin-alliance.com",
        "chowdsp.com",
        "airwindows.com",
        "audiothing.net",
        "denise.io",
        "babyaud.io",
        "soniccouture.com",
        "heavyocity.com",
        "eventideaudio.com",
        "softube.com",
        "ikmultimedia.com",
        "reasonstudios.com",
        "reaper.fm",
        "presonus.com",
        "apple.com",
        "microsoft.com",
        "google.com",
        "bedroomproducersblog.com",
        "gearspace.com",
        "reddit.com",
        "youtube.com",
        "youtu.be",
        "vimeo.com",
        "soundcloud.com",
        "bandcamp.com",
        "discord.com",
        "discord.gg",
        "twitch.tv",
        "patreon.com",
        "ko-fi.com",
        "gumroad.com",
        "lemonsqueezy.com",
        "audiodev.com",
        "unfilteredaudio.com",
        "newfangledaudio.com",
        "sonible.com",
        "noiseash.com",
        "audiomodern.com",
        "tracktion.com",
        "fxpansion.com",
        "roland.com",
        "korg.com",
        "yamaha.com",
        "moogmusic.com",
        "waldorf-music.com",
        "modartt.com",
        "pianoteq.com",
        "applied-acoustics.com",
        "image-line.com",
        "sugar-bytes.de",
        "d16.pl",
        "audiomodeling.com",
        "orchestraltools.com",
        "eastwestsounds.com",
        "8dio.com",
        "cinesamples.com",
        "projectsam.com",
        "synchroarts.com",
        "accusonus.com",
        "sonarworks.com",
        "goodhertz.com",
        "goodhertz.co",
        "oeksound.com",
        "klevgrand.se",
        "puremagnetik.com",
        "audiothing.net",
        "wavealchemy.co.uk",
        "samplelogic.com",
        "fractalsound.com",
        "luftrum.com",
        "sonicacademy.com",
        "pluginfox.com",
        "audiodeluxe.com",
        "jrrshop.com",
        "schneidersladen.de",
        "soundsonline.com",
        "bestservice.com",
        "virharmonic.com",
        "swamitaly.it",
        "amplesound.net",
        "shatteredglassaudio.com",
        "igniteamps.com",
        "mercuriall.com",
        "stltones.com",
        "neuralampmodeler.com",
        "neuraldsp.com",
        "positivegrid.com",
        "line6.com",
        "ikmultimedia.com",
        "overloud.com",
        "audiothing.net",
        "audiomodern.com",
        "landr.com",
        "splice.com",
        "loopcloud.com",
        "beatport.com",
        "pluginboutique.com",
        "audiodeluxe.com",
        "bedroomproducersblog.com",
        "freemusicproduction.com",
        "plugins4free.com",
        "dontcrack.com",
        "rekkerd.org",
        "producerhive.com",
        "musicradar.com",
        "soundonsound.com",
    }
)


def normalize_domain(url: str) -> str:
    """Extrait le domaine normalisé d'une URL."""
    parsed = urlparse(url.strip().lower())
    host = parsed.netloc or parsed.path.split("/")[0]
    if host.startswith("www."):
        host = host[4:]
    return host


def contains_blocked_keyword(url: str) -> bool:
    """Vérifie si l'URL contient un mot-clé de piratage."""
    lowered = url.lower()
    return any(keyword in lowered for keyword in BLOCKED_KEYWORDS)


def is_allowed_url(url: str) -> bool:
    """Valide qu'une URL provient d'une source officielle autorisée."""
    if not url or not url.startswith(("http://", "https://")):
        return False
    if contains_blocked_keyword(url):
        return False
    domain = normalize_domain(url)
    if domain in ALLOWED_DOMAINS:
        return True
    return any(
        domain == allowed or domain.endswith(f".{allowed}")
        for allowed in ALLOWED_DOMAINS
    )


def slugify(name: str) -> str:
    """Génère un slug URL à partir du nom du plugin."""
    slug = name.lower()
    slug = re.sub(r"[^a-z0-9]+", "-", slug)
    return slug.strip("-")
