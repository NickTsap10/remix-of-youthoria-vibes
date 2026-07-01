import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { GreeceMap } from "@/components/site/GreeceMap";
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
  const { t } = useI18n();

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
        <div className="rounded-3xl border border-turquoise/25 bg-turquoise/5 p-10 text-center">
          <div className="text-turquoise text-3xl mb-4 animate-star inline-block">✦</div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            {t("atlas.soon.title")}
          </h2>
          <p className="mt-4 text-cream/70 leading-relaxed">
            {t("atlas.soon.body")}
          </p>
        </div>
      </section>
    </div>
  );
}