# Monétisation — VST Atlas

Guide pour activer **Google AdSense** et **Plugin Boutique Affiliates**.

---

## État actuel

| Élément | Statut |
|---------|--------|
| AdSense demande | ✅ Soumise |
| ID éditeur | `ca-pub-5124693825307043` |
| `ads.txt` | ✅ Configuré |
| Plugin Boutique | ⏳ En attente d'approbation |
| Thomann affiliation | ❌ Programme fermé |

---

## Étape 1 — Google AdSense

### ads.txt (déjà configuré)

```
google.com, pub-5124693825307043, DIRECT, f08c47fec0942fa0
```

Vérifiez : [vstatlas.fr/ads.txt](https://vstatlas.fr/ads.txt)

### Configuration Vercel (obligatoire pour afficher les pubs)

**Settings** → **Environment Variables** :

| Variable | Valeur |
|----------|--------|
| `NEXT_PUBLIC_ADSENSE_CLIENT` | `ca-pub-5124693825307043` |
| `NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT` | *(à ajouter après création d'une unité pub)* |

Après approbation AdSense :
1. Créez une **unité publicitaire** Display responsive dans AdSense
2. Copiez l'**ID emplacement** dans `NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT`
3. Redéployez sur Vercel

**Ne cliquez pas sur vos propres pubs** (risque de ban).

---

## Étape 2 — Affiliation Plugin Boutique

### Inscription

1. [pluginboutique.com/affiliates](https://www.pluginboutique.com/affiliates)
2. Site : *« Catalogue français de plugins VST — vstatlas.fr »*
3. Une fois approuvé → récupérez votre **Affiliate ID** (`a=XXXXX`)

### Configuration Vercel

| Variable | Valeur |
|----------|--------|
| `NEXT_PUBLIC_AFFILIATE_PLUGIN_BOUTIQUE` | votre ID |

→ Les liens `pluginboutique.com` incluront automatiquement `?a=XXXXX`.

Commission typique : **15–30 %** par vente.

---

## Déclaration fiscale (France)

Dès les premiers revenus :
- **Micro-entreprise** si vous dépassez le seuil
- [autoentrepreneur.urssaf.fr](https://www.autoentrepreneur.urssaf.fr)

---

## Checklist

- [x] Demande AdSense soumise
- [x] `ads.txt` configuré
- [ ] Variable `NEXT_PUBLIC_ADSENSE_CLIENT` dans Vercel
- [ ] Unité pub créée + `NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT`
- [ ] Plugin Boutique approuvé + ID affilié dans Vercel
- [ ] Micro-entreprise si revenus réguliers

---

## Variables d'environnement

```env
NEXT_PUBLIC_SITE_URL=https://vstatlas.fr
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-5124693825307043
NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT=1234567890
NEXT_PUBLIC_AFFILIATE_PLUGIN_BOUTIQUE=12345
```
