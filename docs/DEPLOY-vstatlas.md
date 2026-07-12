# Déploiement vstatlas.fr

Guide pas-à-pas pour mettre le site en ligne sur **https://vstatlas.fr**.

## 1. Prérequis

- Domaine **vstatlas.fr** acheté
- Compte [GitHub](https://github.com) (gratuit)
- Compte [Vercel](https://vercel.com) (gratuit)

## 2. Pousser le code sur GitHub

Depuis `D:\Income` :

```powershell
cd D:\Income
git init
git add .
git commit -m "Initial commit — VST Atlas catalogue"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/vst-atlas.git
git push -u origin main
```

> Créez d'abord un repo vide `vst-atlas` sur GitHub (sans README).

## 3. Déployer sur Vercel

1. Allez sur [vercel.com/new](https://vercel.com/new)
2. **Import** votre repo GitHub `vst-atlas`
3. Configuration :
   - **Root Directory** : laissez **vide**
   - Le build est défini dans `vercel.json` à la racine
4. **Environment Variables** :

| Variable | Valeur |
|----------|--------|
| `NEXT_PUBLIC_SITE_URL` | `https://vstatlas.fr` |

5. Cliquez **Deploy**

Vercel vous donne une URL temporaire du type `vst-atlas.vercel.app`.

## 4. Connecter vstatlas.fr

### Dans Vercel

1. Projet → **Settings** → **Domains**
2. Ajoutez : `vstatlas.fr`
3. Ajoutez aussi : `www.vstatlas.fr`
4. Vercel affiche les enregistrements DNS à configurer

### Chez votre registrar (OVH, Gandi, Cloudflare…)

**Option A — Recommandée (nameservers Vercel)**

Déléguez le DNS à Vercel en remplaçant les nameservers par ceux indiqués dans Vercel.

**Option B — DNS manuel**

| Type | Nom | Valeur |
|------|-----|--------|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

La propagation DNS prend **15 min à 48 h** (souvent < 1 h).

### Redirection www → apex (optionnel)

Dans Vercel Domains, définissez `vstatlas.fr` comme domaine principal. `www` redirigera automatiquement.

## 5. Vérifications post-déploiement

- [ ] https://vstatlas.fr charge le site
- [ ] https://vstatlas.fr/sitemap.xml accessible
- [ ] https://vstatlas.fr/robots.txt accessible
- [ ] Certificat HTTPS actif (cadenas vert)

## 6. Google Search Console

1. [search.google.com/search-console](https://search.google.com/search-console)
2. Ajoutez la propriété `https://vstatlas.fr`
3. Vérifiez via DNS (TXT record) ou fichier HTML
4. Soumettez le sitemap : `https://vstatlas.fr/sitemap.xml`

## 7. Google AdSense (dans 2–4 semaines)

1. Attendez d'avoir ~20–30 pages indexées et un peu de trafic
2. [google.com/adsense](https://www.google.com/adsense) → ajoutez `vstatlas.fr`
3. Une fois approuvé, ajoutez dans Vercel :

| Variable | Valeur |
|----------|--------|
| `NEXT_PUBLIC_ADSENSE_CLIENT` | `ca-pub-XXXXXXXXXX` |

4. Redéployez (automatique après sauvegarde de la variable)

## 8. Email contact@vstatlas.fr

Créez une redirection email chez votre registrar :

- `contact@vstatlas.fr` → votre email personnel

Ou utilisez [ImprovMX](https://improvmx.com) (gratuit) / [Cloudflare Email Routing](https://www.cloudflare.com/products/email-routing/) si le DNS est chez Cloudflare.

## 9. GitHub Actions (mises à jour hebdo)

Le workflow `.github/workflows/weekly-discover.yml` nécessite le repo à la **racine** `D:\Income` (pas seulement `web/`).

Après le `git init` à la racine, les mises à jour automatiques du catalogue fonctionneront chaque lundi.

---

**Besoin d'aide ?** Dites-moi chez quel registrar vous avez acheté le domaine (OVH, Gandi, Cloudflare…) et je vous donne les clics exacts.
