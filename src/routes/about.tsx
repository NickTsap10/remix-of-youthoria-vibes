import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Youthoria Podcast" },
      { name: "description", content: "The story, mission and values behind Youthoria Podcast." },
      { property: "og:title", content: "About Youthoria" },
      { property: "og:description", content: "The story, mission and values behind Youthoria Podcast." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { n: "01", t: "Νεολαία", b: "Η καρδιά της δημιουργίας και της αλλαγής." },
  { n: "02", t: "Κοινωνία", b: "Σκέψη, διάλογος και σύνδεση με τον κόσμο γύρω μας." },
  { n: "03", t: "Ιδέες", b: "Κάθε ιδέα μπορεί να γίνει αρχή μιας αλλαγής." },
  { n: "04", t: "Κουλτούρα", b: "Μουσική, τέχνη, lifestyle και σύγχρονη έκφραση." },
  { n: "05", t: "Όνειρα", b: "Η δύναμη που κινεί κάθε νέα γενιά." },
  { n: "06", t: "Συμμετοχή", b: "Γιατί τίποτα δεν αλλάζει χωρίς φωνή και δράση." },
];

function AboutPage() {
  return (
    <div className="pt-36 pb-28 md:pt-44">
      <PageHeader
        eyebrow="Ποιοι είμαστε"
        title="Ξαναγράφουμε τον διάλογο της νέας εποχής."
        index="00 / About"
        lede="Το Youthoria είναι μια πλατφόρμα που δίνει χώρο στις αυθεντικές φωνές της νέας γενιάς — χωρίς φίλτρα, χωρίς έτοιμα σενάρια."
      />

      <section className="container-x cv-auto mt-20 grid gap-12 md:mt-28 md:grid-cols-2 md:gap-16">
        <Reveal>
          <p className="text-lg leading-relaxed text-pretty text-ink/80 md:text-xl">
            Εδώ δεν υπάρχουν φίλτρα, έτοιμα σενάρια ή «σωστές απαντήσεις» — μόνο αληθινές εμπειρίες,
            ιδέες και ιστορίες που αξίζουν να ακουστούν. Πιστεύουμε ότι οι πιο δυνατές αφηγήσεις δεν
            γράφονται από απόσταση, αλλά από αυτούς που τις ζουν.
          </p>
        </Reveal>
        <Reveal delay={120} className="grid gap-10">
          <div className="border-t border-ink/12 pt-6">
            <h2 className="font-display text-3xl leading-tight text-ink md:text-4xl">Το Όραμά μας</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Να δημιουργήσουμε έναν νέο χώρο έκφρασης για τη νεολαία — έναν χώρο όπου οι ιδέες δεν
              περιορίζονται, αλλά εξελίσσονται. Το Youthoria φιλοδοξεί να γίνει μια σύγχρονη media
              πλατφόρμα που ενώνει κουλτούρα, σκέψη και δημιουργικότητα.
            </p>
          </div>
          <div className="border-t border-ink/12 pt-6">
            <h2 className="font-display text-3xl leading-tight text-ink md:text-4xl">Η Αποστολή μας</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Να αναδείξουμε τις ιστορίες που δεν ακούγονται αρκετά. Μέσα από podcasts, συζητήσεις
              και συνεντεύξεις, δημιουργούμε έναν ανοιχτό χώρο διαλόγου όπου η νεολαία μπορεί να
              εκφραστεί ελεύθερα, να εμπνευστεί και να εμπνεύσει.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="container-x cv-auto mt-24 md:mt-32">
        <div className="label-eyebrow mb-8">Οι Αξίες μας ✦</div>
        <div className="border-t border-ink/12">
          {VALUES.map((v, i) => (
            <Reveal key={v.n} delay={i * 60}>
              <div className="group grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-2 border-b border-ink/12 py-7 transition-colors duration-500 hover:bg-white/25 md:grid-cols-[4rem_16rem_1fr] md:gap-x-8 md:py-8">
                <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-mist md:pt-2">
                  {v.n}
                </span>
                <h3 className="font-display text-2xl leading-tight text-ink transition-colors duration-300 group-hover:text-slate md:text-3xl">
                  {v.t}
                </h3>
                <p className="col-start-2 text-sm leading-relaxed text-ink/65 md:col-start-3 md:text-base">
                  {v.b}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x mt-24 max-w-3xl md:mt-32">
        <p className="text-center font-display text-2xl leading-snug text-balance text-ink md:text-4xl">
          Το Youthoria δεν είναι απλώς ένα podcast.{" "}
          <span className="text-slate">
            Είναι ένας ζωντανός χώρος έκφρασης, συζήτησης και δημιουργίας για τη νέα γενιά.
          </span>
        </p>
      </section>
    </div>
  );
}
