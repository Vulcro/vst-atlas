import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité RGPD de VST Atlas : cookies, AdSense et droits des utilisateurs.",
  path: "/confidentialite",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold">Politique de confidentialité</h1>

      <div className="mt-8 space-y-6 text-muted">
        <section>
          <h2 className="text-xl font-semibold text-foreground">Données collectées</h2>
          <p className="mt-3 leading-relaxed">
            VST Atlas peut utiliser des cookies et technologies similaires pour la
            mesure d&apos;audience et l&apos;affichage de publicités (Google AdSense).
            Aucune inscription utilisateur n&apos;est requise pour consulter le
            catalogue.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Cookies publicitaires</h2>
          <p className="mt-3 leading-relaxed">
            Google AdSense peut déposer des cookies pour personnaliser les
            publicités. Vous pouvez gérer vos préférences via la bannière cookies
            ou les paramètres de votre navigateur.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Vos droits (RGPD)</h2>
          <p className="mt-3 leading-relaxed">
            Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
            rectification et de suppression de vos données personnelles. Pour
            exercer ces droits, contactez : contact@vstatlas.fr
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Conservation</h2>
          <p className="mt-3 leading-relaxed">
            Les données de mesure d&apos;audience sont conservées selon les durées
            définies par les prestataires tiers (Google). Le consentement cookie est
            stocké localement dans votre navigateur.
          </p>
        </section>
      </div>
    </div>
  );
}
