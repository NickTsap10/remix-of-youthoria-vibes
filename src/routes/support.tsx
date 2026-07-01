import { createFileRoute } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { StarField } from "@/components/site/StarField";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support Us — Youthoria Podcast" },
      { name: "description", content: "Support independent, youth-led podcasting from Greece." },
      { property: "og:title", content: "Support Youthoria" },
      { property: "og:description", content: "Fuel independent, youth-led podcasting." },
    ],
  }),
  component: SupportPage,
});

function SupportPage() {
  const { t } = useI18n();
  const reasons = [
    { t: t("support.reasons.1.t"), b: t("support.reasons.1.b") },
    { t: t("support.reasons.2.t"), b: t("support.reasons.2.b") },
    { t: t("support.reasons.3.t"), b: t("support.reasons.3.b") },
  ];
  return (
    <div className="pt-32 pb-24">
      <section className="relative">
        <StarField />
        <div className="container-x relative text-center max-w-3xl mx-auto">
          <div className="label-eyebrow mb-4">{t("support.eyebrow")} ✦</div>
          <h1 className="font-display text-5xl md:text-7xl leading-tight text-balance">
            {t("support.title")}
          </h1>
          <p className="mt-6 text-lg text-cream/75 leading-relaxed text-pretty">{t("support.body")}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="#" className="btn-primary animate-glow">
              <Heart className="size-4" /> {t("support.donate")}
            </a>
          </div>
        </div>
      </section>

      <section className="container-x mt-24">
        <div className="label-eyebrow mb-6">{t("support.why")}</div>
        <div className="grid md:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <div
              key={r.t}
              className="rounded-3xl border border-cream/10 bg-cream/[0.02] p-8 animate-fade-up hover:border-turquoise/30 transition-colors"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className="text-turquoise text-xl">✦</span>
              <h3 className="font-display text-3xl mt-3">{r.t}</h3>
              <p className="mt-3 text-cream/65 text-sm leading-relaxed">{r.b}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-cream/10 p-8 bg-gradient-to-br from-turquoise/10 via-transparent to-transparent">
          <div className="flex items-end justify-between mb-4">
            <span className="label-eyebrow">2026 Goal</span>
            <span className="font-display text-2xl">€3,240 / €5,000</span>
          </div>
          <div className="h-2 rounded-full bg-cream/10 overflow-hidden">
            <div className="h-full bg-turquoise animate-glow" style={{ width: "65%" }} />
          </div>
        </div>
      </section>
    </div>
  );
}