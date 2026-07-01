import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Play, Heart } from "lucide-react";
import { useI18n, type DictKey } from "@/lib/i18n";
import { StarField } from "@/components/site/StarField";
import { EpisodeCard } from "@/components/site/EpisodeCard";
import { GreeceMap } from "@/components/site/GreeceMap";
import { episodes } from "@/data/episodes";
import { team } from "@/data/team";

export const Route = createFileRoute("/")({
  component: Index,
});

const VALUES: { key: DictKey; symbol: string }[] = [
  { key: "values.youth", symbol: "01" },
  { key: "values.society", symbol: "02" },
  { key: "values.ideas", symbol: "03" },
  { key: "values.culture", symbol: "04" },
  { key: "values.dreams", symbol: "05" },
  { key: "values.participation", symbol: "06" },
];

function Index() {
  const { t, lang } = useI18n();
  const latest = episodes.slice(0, 3);

  return (
    <div className="pt-16">
      {/* HERO */}
      <section className="relative overflow-hidden pt-16 pb-28">
        <StarField />
        <div className="container-x relative flex flex-col items-center text-center">
          <div className="mb-10 relative animate-float-slow">
            <div className="size-28 rounded-full bg-turquoise/10 ring-1 ring-turquoise/25 grid place-items-center animate-glow">
              <div className="size-16 rounded-full bg-turquoise grid place-items-center text-midnight text-3xl font-display">
                Y
              </div>
            </div>
            <span className="absolute -top-2 -right-4 text-turquoise text-xl animate-star">✦</span>
            <span className="absolute -bottom-2 -left-6 text-cream/50 text-sm animate-star" style={{ animationDelay: "1s" }}>
              ✦
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-[6rem] leading-[0.95] text-balance max-w-5xl animate-fade-up">
            {t("hero.title")}
          </h1>
          <p className="mt-8 text-sm md:text-base font-semibold tracking-[0.28em] uppercase text-cream/60 animate-fade-up" style={{ animationDelay: "150ms" }}>
            {t("hero.subtitle")}
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-3 animate-fade-up" style={{ animationDelay: "300ms" }}>
            <a href="https://open.spotify.com/" target="_blank" rel="noreferrer" className="btn-primary">
              <Play className="size-4 fill-current" /> {t("hero.cta.spotify")}
            </a>
            <Link to="/episodes" className="btn-ghost">
              {t("hero.cta.latest")} <ArrowRight className="size-4" />
            </Link>
            <Link to="/support" className="btn-outline-turquoise">
              <Heart className="size-4" /> {t("hero.cta.support")}
            </Link>
          </div>
        </div>
      </section>

      {/* EPISODES */}
      <section className="section-pad border-t border-cream/5 bg-gradient-to-b from-midnight to-midnight/40">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <div>
              <div className="label-eyebrow mb-3">{t("episodes.eyebrow")}</div>
              <h2 className="font-display text-4xl md:text-6xl leading-tight">
                {t("episodes.title")}
              </h2>
              <p className="mt-3 text-muted max-w-[50ch] text-pretty">{t("episodes.subtitle")}</p>
            </div>
            <Link
              to="/episodes"
              className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-turquoise"
            >
              {t("episodes.viewAll")}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {latest.map((e, i) => (
              <EpisodeCard key={e.id} episode={e} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT + VALUES */}
      <section className="section-pad border-t border-cream/5">
        <div className="container-x grid lg:grid-cols-2 gap-16 items-start">
          <div className="animate-fade-up">
            <div className="label-eyebrow mb-3">{t("about.eyebrow")}</div>
            <h2 className="font-display text-4xl md:text-6xl leading-tight text-balance">
              {t("about.title")}
            </h2>
            <p className="mt-8 text-lg text-cream/75 leading-relaxed max-w-[52ch] text-pretty">
              {t("about.body")}
            </p>
            <Link to="/about" className="btn-ghost mt-8 inline-flex">
              {t("nav.about")} <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {VALUES.map((v, i) => (
              <div
                key={v.key}
                className={`aspect-square rounded-3xl p-6 flex flex-col justify-between animate-fade-up transition-transform hover:-translate-y-1 ${
                  i % 3 === 0
                    ? "bg-turquoise/10 ring-1 ring-turquoise/25"
                    : "bg-cream/5 ring-1 ring-cream/10"
                }`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-turquoise text-xl">✦</span>
                  <span className="text-[10px] font-bold tracking-widest text-cream/40">
                    {v.symbol}
                  </span>
                </div>
                <h4 className="font-display text-3xl leading-none">{t(v.key)}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ATLAS TEASER */}
      <section className="section-pad border-t border-cream/5 bg-gradient-to-b from-transparent via-turquoise/[0.03] to-transparent">
        <div className="container-x grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <GreeceMap />
          </div>
          <div className="order-1 lg:order-2 animate-fade-up">
            <div className="label-eyebrow mb-3">{t("atlas.eyebrow")}</div>
            <h2 className="font-display text-4xl md:text-6xl leading-tight">{t("atlas.title")}</h2>
            <p className="mt-6 text-lg text-cream/75 leading-relaxed max-w-[46ch] text-pretty">
              {t("atlas.body")}
            </p>
            <Link to="/atlas" className="btn-primary mt-8">
              {t("atlas.explore")} <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TEAM PREVIEW */}
      <section className="section-pad border-t border-cream/5">
        <div className="container-x">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="label-eyebrow mb-3">{t("team.eyebrow")}</div>
              <h2 className="font-display text-4xl md:text-6xl">{t("team.title")}</h2>
            </div>
            <Link to="/team" className="text-sm font-bold uppercase tracking-widest text-turquoise inline-flex items-center gap-2 group">
              {t("nav.team")} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <div
                key={m.name}
                className="group animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-cream/10 via-turquoise/5 to-midnight ring-1 ring-cream/10 mb-4 grid place-items-center transition-transform group-hover:-translate-y-1 group-hover:ring-turquoise/40">
                  <span className="font-display text-6xl text-cream/30">
                    {m.name[0]}
                  </span>
                </div>
                <h4 className="font-medium">{m.name}</h4>
                <p className="text-xs text-turquoise font-semibold uppercase tracking-widest mt-1">
                  {m.role[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPORT BAND */}
      <section className="py-16 bg-turquoise text-midnight border-t border-turquoise/40">
        <div className="container-x flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="text-xs font-bold uppercase tracking-[0.28em] mb-3 opacity-70">
              {t("support.eyebrow")} ✦
            </div>
            <h3 className="font-display text-4xl md:text-5xl leading-none">
              {t("support.title")}
            </h3>
            <p className="mt-3 font-medium max-w-[50ch]">{t("support.body")}</p>
          </div>
          <Link
            to="/support"
            className="inline-flex items-center gap-2 px-8 py-4 bg-midnight text-cream rounded-full text-sm font-bold uppercase tracking-widest hover:bg-midnight/90 transition-transform hover:-translate-y-0.5"
          >
            <Heart className="size-4" /> {t("support.donate")}
          </Link>
        </div>
      </section>
    </div>
  );
}
