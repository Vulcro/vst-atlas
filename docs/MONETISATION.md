# Monétisation — VST Atlas

Guide pour activer **Google AdSense** et les **programmes d'affiliation**.

---

## Étape 1 — Google AdSense (15 min + délai validation)

### Inscription

1. Allez sur [google.com/adsense](https://www.google.com/adsense)
2. Connectez-vous avec votre compte Google
3. **Ajouter un site** → `vstatlas.fr`
4. Pays : **France**
5. Validez les conditions

### Pendant la validation (1–4 semaines)

Google vérifie :
- ✅ Site accessible (`vstatlas.fr`)
- ✅ Contenu original (270+ fiches plugins)
- ✅ Pages légales (`/mentions-legales`, `/confidentialite`)
- ✅ Bannière cookies (RGPD)
- ✅ `ads.txt` présent → `https://vstatlas.fr/ads.txt`

**Ne cliquez pas sur vos propres pubs** une fois actif (risque de ban).

### Après approbation

1. Récupérez votre **ID éditeur** : `ca-pub-XXXXXXXXXXXXXXXX`
2. Créez une **unité publicitaire** (Display, responsive)
3. Récupérez l'**ID emplacement** : `1234567890`

### Configuration Vercel

**Settings** → **Environment Variables** :

| Variable | Exemple | Environnements |
|----------|---------|----------------|
| `NEXT_PUBLIC_ADSENSE_CLIENT` | `ca-pub-1234567890` | Production, Preview, Development |
| `NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT` | `9876543210` | Production, Preview, Development |

4. Mettez à jour `web/public/ads.txt` :

```
google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0
```

(Remplacez `pub-...` par l'ID sans le préfixe `ca-`)

5. Commit + push → redeploy automatique
6. Les emplacements pub remplacent les placeholders sur le site

---

## Étape 2 — Affiliation Plugin Boutique (gratuit, ~5 min)

### Inscription

1. [pluginboutique.com/affiliates](https://www.pluginboutique.com/affiliates)
2. Créez un compte affilié
3. Décrivez le site : *« Catalogue français de plugins VST — vstatlas.fr »*
4. Une fois approuvé, récupérez votre **Affiliate ID** (paramètre `a=XXXXX`)

### Configuration Vercel

| Variable | Exemple |
|----------|---------|
| `NEXT_PUBLIC_AFFILIATE_PLUGIN_BOUTIQUE` | `12345` |

→ Les liens vers `pluginboutique.com` incluront automatiquement `?a=12345`.

Commission typique : **15–30 %** par vente.

---

## Étape 3 — Affiliation Thomann (gratuit, ~5 min)

### Inscription

1. [thomann.fr/compinfo_affiliate.html](https://www.thomann.fr/fr/compinfo_affiliate.html)
2. Inscrivez-vous au programme partenaire
3. Récupérez votre **Partner ID** (`affid=XXXXX`)

### Configuration Vercel

| Variable | Exemple |
|----------|---------|
| `NEXT_PUBLIC_AFFILIATE_THOMANN` | `12345` |

→ Les liens vers `thomann.fr` / `thomann.de` seront affiliés automatiquement.

---

## Étape 4 — Déclaration fiscale (France)

Dès les premiers revenus :
- **Micro-entreprise** si vous dépassez le seuil de activité commerciale
- Déclarez revenus AdSense + affiliation en **BNC** ou **BIC**
- [autoentrepreneur.urssaf.fr](https://www.autoentrepreneur.urssaf.fr)

Seuil 2026 micro-entreprise prestations : vérifiez le montant en vigueur sur [service-public.fr](https://www.service-public.fr).

---

## Projections réalistes

| Période | Trafic | AdSense | Affiliation |
|---------|--------|---------|-------------|
| Mois 1–2 | Indexation | 0 € | 0 € |
| Mois 3–4 | 500–2 000/mois | 5–20 € | 0–30 € |
| Mois 6+ | 2 000–10 000/mois | 20–80 € | 30–150 € |

La MAO a un RPM AdSense plus élevé que la moyenne (~3–8 € / 1 000 vues).

---

## Checklist

- [ ] Demande AdSense soumise pour `vstatlas.fr`
- [ ] Inscription Plugin Boutique Affiliates
- [ ] Inscription Thomann Partner
- [ ] Variables Vercel ajoutées après approbation
- [ ] `ads.txt` mis à jour avec le pub-ID
- [ ] Micro-entreprise si revenus réguliers

---

## Variables d'environnement (résumé)

```env
NEXT_PUBLIC_SITE_URL=https://vstatlas.fr
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT=1234567890
NEXT_PUBLIC_AFFILIATE_PLUGIN_BOUTIQUE=12345
NEXT_PUBLIC_AFFILIATE_THOMANN=12345
```

Toutes les variables `NEXT_PUBLIC_*` doivent être dans Vercel pour être actives en production.
