import { createFileRoute } from "@tanstack/react-router";
import { StarField } from "@/components/site/StarField";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Youthoria Podcast" },
      { name: "description", content: "The story, mission and values behind Youthoria Podcast." },
      { property: "og:title", content: "About Youthoria" },
      { property: "og:description", content: "The story, mission and values behind Youthoria Podcast." },
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
    <div className="pt-32 pb-24">
      <section className="relative">
        <StarField />
        <div className="container-x relative max-w-4xl">
          <div className="label-eyebrow mb-4">Ποιοι είμαστε</div>
          <h1 className="font-display text-5xl md:text-7xl leading-tight text-balance">
            Ξαναγράφουμε τον διάλογο της νέας εποχής.
          </h1>
          <p className="mt-8 text-lg md:text-xl text-cream/80 leading-relaxed text-pretty">
            Το Youthoria είναι μια πλατφόρμα που δίνει χώρο στις αυθεντικές φωνές της νέας γενιάς.
            Εδώ δεν υπάρχουν φίλτρα, έτοιμα σενάρια ή «σωστές απαντήσεις» — μόνο αληθινές εμπειρίες,
            ιδέες και ιστορίες που αξίζουν να ακουστούν.
          </p>
          <p className="mt-4 text-lg text-cream/70 leading-relaxed text-pretty">
            Πιστεύουμε ότι οι πιο δυνατές αφηγήσεις δεν γράφονται από απόσταση, αλλά από αυτούς που τις ζουν.
          </p>
        </div>
      </section>

      <section className="container-x mt-24 grid md:grid-cols-2 gap-8">
        <div className="rounded-3xl border border-cream/10 bg-cream/[0.02] p-10">
          <div className="text-turquoise text-2xl mb-4 animate-star inline-block">✦</div>
          <h3 className="font-display text-3xl mb-4">Το Όραμά μας</h3>
          <p className="text-cream/75 leading-relaxed">
            Να δημιουργήσουμε έναν νέο χώρο έκφρασης για τη νεολαία — έναν χώρο όπου οι ιδέες δεν
            περιορίζονται, αλλά εξελίσσονται. Το Youthoria φιλοδοξεί να γίνει μια σύγχρονη media
            πλατφόρμα που ενώνει κουλτούρα, σκέψη και δημιουργικότητα, δίνοντας βήμα σε νέες φωνές
            που έχουν κάτι ουσιαστικό να πουν.
          </p>
        </div>
        <div className="rounded-3xl border border-turquoise/25 bg-turquoise/5 p-10">
          <div className="text-turquoise text-2xl mb-4 animate-star inline-block">✦</div>
          <h3 className="font-display text-3xl mb-4">Η Αποστολή μας</h3>
          <p className="text-cream/80 leading-relaxed">
            Να αναδείξουμε τις ιστορίες που δεν ακούγονται αρκετά. Μέσα από podcasts, συζητήσεις
            και συνεντεύξεις, δημιουργούμε έναν ανοιχτό χώρο διαλόγου όπου η νεολαία μπορεί να
            εκφραστεί ελεύθερα, να εμπνευστεί και να εμπνεύσει.
          </p>
        </div>
      </section>

      <section className="container-x mt-24">
        <div className="label-eyebrow mb-6">Οι Αξίες μας ✦</div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <div
              key={v.n}
              className="rounded-2xl border border-cream/10 bg-cream/[0.02] p-6 hover:border-turquoise/30 hover:bg-turquoise/5 transition-colors animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-display text-3xl">{v.t}</span>
                <span className="text-[10px] font-bold tracking-widest text-cream/40">{v.n}</span>
              </div>
              <p className="text-sm text-cream/65 leading-relaxed">{v.b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x mt-24 max-w-3xl">
        <p className="font-display text-2xl md:text-3xl leading-snug text-balance text-center">
          Το Youthoria δεν είναι απλώς ένα podcast. <br />
          <span className="text-turquoise">Είναι ένας ζωντανός χώρος έκφρασης, συζήτησης και δημιουργίας για τη νέα γενιά.</span>
        </p>
      </section>
    </div>
  );
}