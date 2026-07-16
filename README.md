# VST Atlas

Catalogue français de plugins VST et outils MAO — gratuits et payants, liens officiels uniquement.

## Structure

```
Income/
├── data/plugins.json          # Source de vérité du catalogue
├── scripts/
│   ├── seed_catalog.py        # Génère le catalogue initial
│   ├── discover.py            # Découverte hebdomadaire automatique
│   └── validate.py            # Filtrage anti-piratage
├── web/                       # Site Next.js (VST Atlas)
└── .github/workflows/         # Mise à jour automatique
```

## Démarrage rapide

### 1. Catalogue initial

```bash
cd scripts
pip install -r requirements.txt
python seed_catalog.py
```

### 2. Site web

```bash
cd web
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

### 3. Build production

```bash
cd web
npm run build
```

## Déploiement (budget ~10 €)

### Étape 1 — Domaine ✅

**vstatlas.fr** est acheté. Voir le guide détaillé : [`docs/DEPLOY-vstatlas.md`](docs/DEPLOY-vstatlas.md)

### Étape 2 — Vercel (gratuit)

1. Créez un compte sur [vercel.com](https://vercel.com)
2. Importez ce repo GitHub
3. **Root Directory** : laissez **vide** (le site est configuré depuis la racine)
4. Framework : Other (détecté via `vercel.json`)
5. Ajoutez la variable d'environnement :
   - `NEXT_PUBLIC_SITE_URL` = `https://vstatlas.fr`

### Étape 3 — Domaine sur Vercel

Dans Vercel → Settings → Domains → ajoutez votre domaine et configurez les DNS.

### Étape 4 — Google Search Console (gratuit)

1. [search.google.com/search-console](https://search.google.com/search-console)
2. Ajoutez votre domaine
3. Soumettez le sitemap : `https://vstatlas.fr/sitemap.xml`

Guide complet : [`docs/SEO-PUB.md`](docs/SEO-PUB.md) (SEO + plan pub 30 €)

### Étape 5 — Monétisation

Guide complet : [`docs/MONETISATION.md`](docs/MONETISATION.md)

1. **AdSense** : [google.com/adsense](https://www.google.com/adsense) → ajoutez `vstatlas.fr`
2. **Affiliation** : Plugin Boutique (gratuit)
3. Variables Vercel après approbation (voir guide)

### Étape 6 — Google AdSense (variables)

1. [google.com/adsense](https://www.google.com/adsense)
2. Créez un compte et ajoutez votre site
3. Attendez la validation (souvent 2–4 semaines, nécessite du contenu et du trafic)
4. Une fois approuvé, ajoutez dans Vercel :
   - `NEXT_PUBLIC_ADSENSE_CLIENT` = `ca-pub-XXXXXXXXXX`

## Mise à jour automatique

Le workflow GitHub Actions `weekly-discover.yml` exécute chaque lundi :
- Recherche de nouveaux plugins sur GitHub, RSS et KVR Audio
- Filtrage anti-piratage (liste blanche de domaines)
- Commit automatique des mises à jour

Pour lancer manuellement : Actions → Weekly VST Discovery → Run workflow

## Obligations légales (France)

- Déclarez vos revenus AdSense (micro-entreprise si > seuil)
- Les pages `/mentions-legales` et `/confidentialite` sont incluses
- Configurez `contact@vstatlas.fr` — voir [`docs/EMAIL-vstatlas.md`](docs/EMAIL-vstatlas.md) (1 boîte gratuite Infomaniak incluse avec le domaine)

## Budget mois 2+

| Investissement | Coût | Impact |
|----------------|------|--------|
| Affiliation Plugin Boutique | 0 € | Revenus complémentaires |
| Newsletter Brevo | 0 € (plan gratuit) | Fidélisation |
| Articles SEO ciblés | 0 € | Accélère le référencement |

## Scripts utiles

```bash
# Régénérer le catalogue initial
python scripts/seed_catalog.py

# Lancer la découverte manuellement
python scripts/discover.py
```

## Licence

Projet privé — catalogue éditorial indépendant.
