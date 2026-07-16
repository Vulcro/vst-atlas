#!/usr/bin/env python3
"""Découverte hebdomadaire de nouveaux plugins VST depuis des sources légitimes."""

from __future__ import annotations

import json
import re
from datetime import date
from pathlib import Path
from urllib.parse import urljoin, urlparse

import feedparser
import requests
from bs4 import BeautifulSoup

from validate import is_allowed_url, slugify

ROOT = Path(__file__).resolve().parent.parent
DATA_PATH = ROOT / "data" / "plugins.json"
WEB_DATA_PATH = ROOT / "web" / "data" / "plugins.json"

GITHUB_SEARCH_URL = (
    "https://api.github.com/search/repositories"
    "?q=audio+plugin+vst+language:c%2B%2B&sort=updated&order=desc&per_page=10"
)
RSS_FEEDS = [
    "https://bedroomproducersblog.com/feed/",
    "https://rekkerd.org/feed/",
]

HEADERS = {
    "User-Agent": "VSTCatalogBot/1.0 (+https://github.com; legal catalog aggregator)",
    "Accept": "application/json",
}


def load_catalog() -> dict:
    if DATA_PATH.exists():
        return json.loads(DATA_PATH.read_text(encoding="utf-8"))
    return {"version": "1.0.0", "updatedAt": date.today().isoformat(), "plugins": []}


def save_catalog(catalog: dict) -> None:
    catalog["updatedAt"] = date.today().isoformat()
    encoded = json.dumps(catalog, ensure_ascii=False, indent=2)
    for path in (DATA_PATH, WEB_DATA_PATH):
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(encoded, encoding="utf-8")


def existing_slugs(catalog: dict) -> set[str]:
    return {plugin["slug"] for plugin in catalog.get("plugins", [])}


def guess_category(text: str) -> str:
    lowered = text.lower()
    rules = {
        "synth": ("synth", "synthesizer", "wavetable"),
        "eq": ("eq", "equalizer", "equaliser"),
        "compressor": ("compressor", "limiter"),
        "reverb": ("reverb", "reverberation"),
        "delay": ("delay", "echo"),
        "distortion": ("distortion", "saturation", "overdrive"),
        "modulation": ("chorus", "phaser", "flanger", "modulation"),
        "loop_pack": ("loop pack", "loops", "sample pack", "one-shot", "one shot"),
        "drum_kit": ("drum kit", "drum pack", "808", "one-shots", "drum sample"),
        "midi_kit": ("midi kit", "midi pack", "midi chords", "midi progression"),
        "bundle": ("bundle", "collection", "suite", "komplete", "all access"),
        "drums": ("drum plugin", "drum machine", "percussion plugin"),
        "guitar": ("guitar", "amp", "cabinet"),
        "piano": ("piano", "keys", "rhodes", "wurlitzer"),
        "vocal": ("vocal", "voice", "singer"),
        "orchestral": ("orchestra", "strings", "brass", "woodwind"),
        "sampler": ("sampler", "sample library"),
        "analyzer": ("analyzer", "analyser", "meter", "spectrum"),
        "mastering": ("mastering", "loudness"),
    }
    for category, keywords in rules.items():
        if any(keyword in lowered for keyword in keywords):
            return category
    return "utility"


def make_plugin(
    name: str,
    developer: str,
    official_url: str,
    description: str,
    source: str,
    *,
    is_free: bool = True,
    price_eur: float | None = None,
    category: str | None = None,
) -> dict | None:
    if not is_allowed_url(official_url):
        return None
    slug = slugify(name)
    if not slug:
        return None
    return {
        "id": slug,
        "slug": slug,
        "name": name.strip(),
        "developer": developer.strip() or "Inconnu",
        "category": category or guess_category(f"{name} {description}"),
        "formats": ["VST3", "AU"],
        "platforms": ["windows", "macos"],
        "isFree": is_free,
        "priceEur": None if is_free else price_eur,
        "officialUrl": official_url,
        "description": description.strip()[:280] or f"{name} — outil audio publié par {developer}. Fiche ajoutée automatiquement, lien officiel vérifié.",
        "discoveredAt": date.today().isoformat(),
        "source": source,
    }


def discover_github(catalog: dict) -> list[dict]:
    discovered: list[dict] = []
    try:
        response = requests.get(GITHUB_SEARCH_URL, headers=HEADERS, timeout=20)
        response.raise_for_status()
        items = response.json().get("items", [])
    except requests.RequestException as error:
        print(f"GitHub discovery skipped: {error}")
        return discovered

    for repo in items:
        name = repo.get("name", "").replace("-", " ").title()
        if not name:
            continue
        official_url = repo.get("html_url", "")
        description = repo.get("description") or "Projet open-source audio détecté sur GitHub."
        developer = repo.get("owner", {}).get("login", "GitHub")
        plugin = make_plugin(
            name,
            developer,
            official_url,
            description,
            "github",
            is_free=True,
        )
        if plugin and plugin["slug"] not in existing_slugs(catalog):
            discovered.append(plugin)
    return discovered


def extract_links_from_rss_entry(entry: dict) -> list[str]:
    links: list[str] = []
    if entry.get("link"):
        links.append(entry["link"])
    summary = entry.get("summary", "")
    if summary:
        soup = BeautifulSoup(summary, "html.parser")
        for anchor in soup.find_all("a", href=True):
            links.append(anchor["href"])
    return links


def discover_rss(catalog: dict) -> list[dict]:
    discovered: list[dict] = []
    for feed_url in RSS_FEEDS:
        try:
            feed = feedparser.parse(feed_url)
        except Exception as error:
            print(f"RSS feed skipped ({feed_url}): {error}")
            continue

        for entry in feed.entries[:15]:
            title = entry.get("title", "").strip()
            summary = BeautifulSoup(entry.get("summary", ""), "html.parser").get_text(" ", strip=True)
            if not title:
                continue

            candidate_url = None
            for link in extract_links_from_rss_entry(entry):
                if is_allowed_url(link):
                    candidate_url = link
                    break

            if not candidate_url:
                continue

            plugin = make_plugin(
                title[:80],
                urlparse(feed_url).netloc,
                candidate_url,
                summary,
                "rss",
                is_free="free" in title.lower() or "gratuit" in title.lower(),
            )
            if plugin and plugin["slug"] not in existing_slugs(catalog):
                discovered.append(plugin)
    return discovered


def discover_kvr_free_section(catalog: dict) -> list[dict]:
    discovered: list[dict] = []
    url = "https://www.kvraudio.com/plugins/free"
    try:
        response = requests.get(url, headers=HEADERS, timeout=20)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")
    except requests.RequestException as error:
        print(f"KVR discovery skipped: {error}")
        return discovered

    for anchor in soup.select("a[href*='/product/']")[:20]:
        title = anchor.get_text(" ", strip=True)
        href = anchor.get("href", "")
        if not title or not href:
            continue
        official_url = urljoin(url, href)
        if not is_allowed_url(official_url):
            continue
        plugin = make_plugin(
            title,
            "KVR Audio",
            official_url,
            f"{title} — plugin gratuit répertorié sur KVR Audio.",
            "kvr",
            is_free=True,
        )
        if plugin and plugin["slug"] not in existing_slugs(catalog):
            discovered.append(plugin)
    return discovered


def merge_discoveries(catalog: dict, discoveries: list[dict]) -> int:
    known = existing_slugs(catalog)
    added = 0
    for plugin in discoveries:
        if plugin["slug"] in known:
            continue
        catalog.setdefault("plugins", []).append(plugin)
        known.add(plugin["slug"])
        added += 1
    return added


def main() -> None:
    catalog = load_catalog()
    discoveries: list[dict] = []
    discoveries.extend(discover_github(catalog))
    discoveries.extend(discover_rss(catalog))
    discoveries.extend(discover_kvr_free_section(catalog))

    unique: dict[str, dict] = {}
    for plugin in discoveries:
        unique[plugin["slug"]] = plugin

    added = merge_discoveries(catalog, list(unique.values()))
    save_catalog(catalog)
    print(f"Découverte terminée — {added} nouveau(x) plugin(s) ajouté(s).")


if __name__ == "__main__":
    main()
