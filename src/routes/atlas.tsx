import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { GreeceMap } from "@/components/site/GreeceMap";
import { regions } from "@/data/atlas";
import { StarField } from "@/components/site/StarField";

export const Route = createFileRoute("/atlas")({
  head: () => ({
    meta: [
      { title: "Youthoria Atlas — A Map of Greek Youth" },
      { name: "description", content: "Mapping youth stories across the Greek archipelago." },
      { property: "og:title", content: "Youthoria Atlas" },
      { property: "og:description", content: "Mapping youth stories across the Greek archipelago." },
    ],
  }),
  component: AtlasPage,
});

function AtlasPage() {
  const { t, lang } = useI18n();
  const active = regions.filter((r) => r.episodeId);

  return (
    <div className="pt-32 pb-24">
      <section className="relative">
        <StarField />
        <div className="container-x relative">
          <div className="label-eyebrow mb-4">{t("atlas.eyebrow")}</div>
          <h1 className="font-display text-5xl md:text-7xl leading-tight">
            {t("atlas.title")}
          </h1>
          <p className="mt-6 text-muted max-w-[52ch] text-pretty">{t("atlas.body")}</p>
        </div>
      </section>

      <section className="container-x mt-16 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <div className="rounded-3xl border border-cream/10 bg-cream/[0.02] p-6">
          <GreeceMap />
        </div>
        <div className="space-y-4">
          <h2 className="label-eyebrow">{t("atlas.legend.available")}</h2>
          {active.map((r) => (
            <Link
              key={r.id}
              to="/episodes"
              hash={r.episodeId}
              className="flex items-center justify-between gap-4 rounded-2xl border border-cream/10 bg-cream/[0.03] p-5 hover:border-turquoise/40 hover:bg-turquoise/5 transition-colors group"
            >
              <div>
                <div className="font-display text-2xl">{r.name[lang]}</div>
                {r.description && (
                  <div className="text-sm text-cream/60 mt-1">{r.description[lang]}</div>
                )}
              </div>
              <ArrowRight className="size-4 text-turquoise transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}