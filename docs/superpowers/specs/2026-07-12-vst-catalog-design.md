# Catalogue VST/MAO — Design Spec

**Date:** 2026-07-12  
**Statut:** Approuvé

## Objectif

Site français de référencement de plugins VST/MAO (gratuits et payants) avec découverte automatisée hebdomadaire, monétisation AdSense, budget initial 10 € (domaine).

## Architecture

- **Site:** Next.js 15 (App Router), TypeScript, Tailwind CSS, hébergement Vercel
- **Données:** `data/plugins.json` versionné, consommé au build
- **Pipeline:** Python `scripts/discover.py` + validation anti-piratage, GitHub Actions hebdomadaire
- **Monétisation:** Google AdSense (emplacements prévus, activation post-déploiement)

## Schéma Plugin

| Champ | Type | Description |
|-------|------|-------------|
| id | string | Identifiant unique |
| slug | string | URL SEO |
| name | string | Nom commercial |
| developer | string | Éditeur |
| category | enum | synth, eq, compressor, reverb, delay, etc. |
| formats | string[] | VST3, AU, AAX, LV2 |
| platforms | string[] | windows, macos, linux |
| isFree | boolean | Plugin gratuit |
| priceEur | number\|null | Prix TTC estimé en euros |
| officialUrl | string | Lien officiel (liste blanche) |
| description | string | Description FR |
| discoveredAt | string | ISO date |
| source | string | manual, kvr, github, rss |

## Garde-fous légaux

1. Liste blanche de domaines officiels
2. Rejet automatique URLs piratage (crack, torrent, warez, nfo)
3. Pages RGPD : mentions légales, confidentialité, cookies
4. Liens `rel="noopener noreferrer sponsored"` sur boutiques

## Pages

- `/` Accueil
- `/plugins` Catalogue filtrable
- `/plugin/[slug]` Fiche détaillée
- `/gratuits` Landing SEO gratuits
- `/categorie/[cat]` Par catégorie
- `/mentions-legales`, `/confidentialite`

## Phases budget

- **Mois 1 (10 €):** Domaine + déploiement Vercel gratuit
- **Mois 2+:** Affiliation boutiques, newsletter Brevo, contenu SEO additionnel
