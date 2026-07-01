import { createFileRoute } from "@tanstack/react-router";
import { useI18n, type DictKey } from "@/lib/i18n";
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

const values: { key: DictKey; n: string }[] = [
  { key: "values.youth", n: "01" },
  { key: "values.society", n: "02" },
  { key: "values.ideas", n: "03" },
  { key: "values.culture", n: "04" },
  { key: "values.dreams", n: "05" },
  { key: "values.participation", n: "06" },
];

function AboutPage() {
  const { t } = useI18n();
  return (
    <div className="pt-32 pb-24">
      <section className="relative">
        <StarField />
        <div className="container-x relative max-w-4xl">
          <div className="label-eyebrow mb-4">{t("about.eyebrow")}</div>
          <h1 className="font-display text-5xl md:text-7xl leading-tight text-balance">
            {t("about.title")}
          </h1>
          <p className="mt-8 text-lg md:text-xl text-cream/75 leading-relaxed text-pretty">
            {t("about.body")}
          </p>
        </div>
      </section>

      <section className="container-x mt-24 grid md:grid-cols-2 gap-12">
        <div className="rounded-3xl border border-cream/10 bg-cream/[0.02] p-10">
          <div className="text-turquoise text-2xl mb-4 animate-star inline-block">✦</div>
          <h3 className="font-display text-3xl mb-4">{t("about.vision")}</h3>
          <p className="text-cream/70 leading-relaxed">{t("about.body")}</p>
        </div>
        <div className="rounded-3xl border border-turquoise/25 bg-turquoise/5 p-10">
          <div className="text-turquoise text-2xl mb-4 animate-star inline-block">✦</div>
          <h3 className="font-display text-3xl mb-4">{t("about.mission")}</h3>
          <p className="text-cream/80 leading-relaxed">{t("about.body")}</p>
        </div>
      </section>

      <section className="container-x mt-24">
        <div className="label-eyebrow mb-6">{t("about.values")}</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {values.map((v, i) => (
            <div
              key={v.key}
              className="rounded-2xl border border-cream/10 bg-cream/[0.02] p-6 flex items-center justify-between hover:border-turquoise/30 hover:bg-turquoise/5 transition-colors animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="font-display text-3xl">{t(v.key)}</span>
              <span className="text-[10px] font-bold tracking-widest text-cream/40">{v.n}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}