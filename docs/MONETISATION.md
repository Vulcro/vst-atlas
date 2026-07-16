# Monétisation — VST Atlas

Guide pour activer **Google AdSense** et **Plugin Boutique Affiliates**.

---

## État actuel

| Élément | Statut |
|---------|--------|
| AdSense demande | ✅ Soumise |
| ID éditeur | `ca-pub-5124693825307043` |
| `ads.txt` | ✅ Configuré |
| Plugin Boutique / Beatport | ✅ Approuvé — ID `g0y2oqcwuq11t` |
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

## Étape 2 — Affiliation Plugin Boutique / Beatport

**Statut : approuvé** — ID affilié : `g0y2oqcwuq11t`

Liens généraux :
- Plugin Boutique : `https://www.pluginboutique.com/?a_aid=g0y2oqcwuq11t`
- Beatport : `https://www.beatport.com/?a_aid=g0y2oqcwuq11t`

### Configuration Vercel

| Variable | Valeur |
|----------|--------|
| `NEXT_PUBLIC_AFFILIATE_PLUGIN_BOUTIQUE` | `g0y2oqcwuq11t` |

→ Les liens vers `pluginboutique.com` et `beatport.com` incluent automatiquement `?a_aid=g0y2oqcwuq11t`.

Dashboard : [pluginboutique.postaffiliatepro.com](https://pluginboutique.postaffiliatepro.com)

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
- [x] Plugin Boutique / Beatport approuvé (ID `g0y2oqcwuq11t`)
- [ ] Variable `NEXT_PUBLIC_AFFILIATE_PLUGIN_BOUTIQUE` dans Vercel
- [ ] Micro-entreprise si revenus réguliers

---

## Variables d'environnement

```env
NEXT_PUBLIC_SITE_URL=https://vstatlas.fr
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-5124693825307043
NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT=1234567890
NEXT_PUBLIC_AFFILIATE_PLUGIN_BOUTIQUE=g0y2oqcwuq11t
```
