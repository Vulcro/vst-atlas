import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
};

export default function LegalPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold">Mentions légales</h1>

      <div className="prose prose-invert mt-8 max-w-none space-y-6 text-muted">
        <section>
          <h2 className="text-xl font-semibold text-foreground">Éditeur du site</h2>
          <p>
            VST Atlas — Catalogue indépendant de plugins audio.<br />
            Site : <a href="https://vstatlas.fr" className="text-accent-soft hover:underline">vstatlas.fr</a><br />
            Contact : contact@vstatlas.fr
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Hébergement</h2>
          <p>
            Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Propriété intellectuelle</h2>
          <p>
            Les noms de plugins, marques et logos mentionnés appartiennent à leurs
            éditeurs respectifs. VST Atlas n&apos;est affilié à aucun éditeur sauf
            mention contraire. Le contenu éditorial et la structure du site sont
            protégés par le droit d&apos;auteur.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Publicité</h2>
          <p>
            Ce site peut afficher des publicités via Google AdSense. Les liens vers
            les éditeurs et boutiques peuvent être des liens commerciaux. Les
            revenus publicitaires contribuent au financement du catalogue.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Responsabilité</h2>
          <p>
            VST Atlas s&apos;efforce de maintenir des informations exactes et des
            liens officiels. Nous ne garantissons pas l&apos;exactitude des prix ni
            la disponibilité des plugins. L&apos;utilisateur est invité à vérifier
            les informations sur le site de l&apos;éditeur avant tout achat.
          </p>
        </section>
      </div>
    </div>
  );
}
