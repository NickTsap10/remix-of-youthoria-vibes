import { createFileRoute } from "@tanstack/react-router";
import { StarField } from "@/components/site/StarField";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support Us — Youthoria Podcast" },
      { name: "description", content: "Support Youthoria — coming soon." },
      { property: "og:title", content: "Support Youthoria" },
      { property: "og:description", content: "Coming soon." },
    ],
  }),
  component: SupportPage,
});

function SupportPage() {
  const { lang } = useI18n();
  const isEl = lang === "el";
  return (
    <div className="pt-32 pb-32 min-h-[80vh] flex items-center">
      <section className="relative w-full">
        <StarField />
        <div className="container-x relative text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cream/15 bg-cream/[0.03] text-[11px] font-semibold uppercase tracking-[0.28em] text-cream/70">
            <span className="size-1.5 rounded-full bg-turquoise animate-pulse" />
            {isEl ? "Στήριξη" : "Support"}
          </div>
          <h1 className="mt-8 font-display text-6xl md:text-8xl leading-[0.95] text-balance">
            {isEl ? "Έρχεται σύντομα" : "Coming Soon"}
          </h1>
          <p className="mt-8 text-lg text-cream/70 leading-relaxed text-pretty">
            {isEl
              ? "Ετοιμάζουμε έναν νέο τρόπο για να στηρίξεις το Youthoria. Μείνε συντονισμένος."
              : "We're preparing a new way for you to support Youthoria. Stay tuned."}
          </p>
          <div className="mt-10 text-turquoise text-2xl animate-star">✦</div>
        </div>
      </section>
    </div>
  );
}