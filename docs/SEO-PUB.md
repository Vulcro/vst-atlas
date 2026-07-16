# SEO & publicité — VST Atlas

## SEO — checklist opérationnelle

### Déjà en place (code)

- [x] `lang="fr"`, canonicals, Open Graph + Twitter card
- [x] Image OG `/og.png`
- [x] JSON-LD `WebSite` + `SoftwareApplication` + `BreadcrumbList` + `ItemList`
- [x] Sitemap complet (plugins, catégories, sections, légal)
- [x] Intros FR enrichies (`/gratuits`, `/categorie/*`)
- [x] Liens internes (badge catégorie, plugins similaires, footer)

### À faire de votre côté

1. **Search Console** — vérifier l’indexation : Couverture → pages indexées
2. **Demander une indexation** des URLs clés : `/`, `/gratuits`, `/plugins`, `/categorie/synth`
3. **Surveiller** 4–8 semaines les requêtes : « plugin vst gratuit », « synthé vst », etc.
4. **Phase B (plus tard)** — 3 guides SEO :
   - Meilleurs plugins VST gratuits 2026
   - Débuter la MAO avec des VST gratuits
   - Meilleurs synthés VST (gratuits et payants)

### Mots-clés cibles (FR)

| Intent | Exemple |
|--------|---------|
| Gratuit | plugins VST gratuits, freeware MAO |
| Catégorie | synthé VST, compresseur VST, réverb VST |
| Produit | Serum VST, Vital synthé, Scaler 2 |
| Longue traîne | meilleur EQ VST gratuit, VST pour Ableton |

---

## Publicité abordable — plan 30 €

| Canal | Budget | Action |
|-------|--------|--------|
| Reddit / Audiofanzine | 0 € | 2–3 posts utiles (pas spam) avec lien profil |
| Reddit Ads → `/gratuits` | 20 € | Test 7 jours, cibler r/WeAreTheMusicMakers, r/edmproduction |
| Reserve | 10 € | Renforcer si CPA OK |

**Ne pas prioriser** Meta Ads au départ (moins d’intention d’achat plugins).

### Bannières Plugin Boutique

Intégrées sur le site (leaderboard, carrés, footer). Tracking : `a_aid=g0y2oqcwuq11t`.

Emplacements :
- Accueil / catalogue : bannière 600×100
- Fiche plugin : 250×250 en colonne
- Gratuits / catégories / sections : 200×200 ou 300×100
- Footer : 300×100

---

## Prochaines étapes produit

1. Redeploy Vercel après ce push
2. Vérifier `https://vstatlas.fr/og.png` et un partage social
3. Quand AdSense est approuvé : renseigner `NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT`
4. Phase B : pages guides SEO
