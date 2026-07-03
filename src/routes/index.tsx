import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Play, Heart, Headphones } from "lucide-react";
import { SOCIALS } from "@/lib/socials";
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
  const featured = latest[0];

  return (
    <div className="pt-16">
      {/* HERO */}
      <section className="relative overflow-hidden min-h-[96vh] flex items-center pt-28 pb-32">
        <StarField />
        {/* Ambient gradient orbs */}
        <div className="pointer-events-none absolute -top-40 -left-40 size-[42rem] rounded-full bg-turquoise/[0.09] blur-[140px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-24 size-[36rem] rounded-full bg-turquoise/[0.05] blur-[140px]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-midnight" />

        <div className="container-x relative grid lg:grid-cols-12 gap-y-16 gap-x-10 items-center">
          <div className="lg:col-span-7 xl:col-span-7 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cream/15 bg-cream/[0.03] text-[11px] font-semibold uppercase tracking-[0.32em] text-cream/70 animate-fade-up">
              <span className="size-1.5 rounded-full bg-turquoise animate-pulse" />
              {t("hero.subtitle")}
            </div>

            <h1
              className="mt-8 font-display text-[3.4rem] sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[6.75rem] leading-[0.92] tracking-[-0.01em] text-balance animate-fade-up"
              style={{ animationDelay: "80ms" }}
            >
              {t("hero.title")}
            </h1>

            <p
              className="mt-8 max-w-[52ch] text-lg md:text-xl text-cream/70 leading-relaxed text-pretty animate-fade-up"
              style={{ animationDelay: "160ms" }}
            >
              {lang === "el"
                ? "Ένα ανεξάρτητο podcast που δίνει τον μικρόφωνο στη νέα γενιά — για την κουλτούρα, τις ιδέες και τα όνειρα της Ελλάδας του σήμερα."
                : "An independent podcast handing the mic to a new generation — culture, ideas and the dreams shaping Greece today."}
            </p>

            <div className="mt-10 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "240ms" }}>
              <a href={SOCIALS.spotifyShow} target="_blank" rel="noreferrer" className="btn-primary">
                <Play className="size-4 fill-current" /> {t("hero.cta.spotify")}
              </a>
              <Link to="/episodes" className="btn-ghost">
                {t("hero.cta.latest")} <ArrowRight className="size-4" />
              </Link>
            </div>

            <div
              className="mt-16 grid grid-cols-3 gap-8 max-w-lg animate-fade-up"
              style={{ animationDelay: "360ms" }}
            >
              {[
                { n: `${episodes.length}+`, l: t("episodes.eyebrow") },
                { n: `${team.length}`, l: t("team.eyebrow") },
                { n: "∞", l: t("about.eyebrow") },
              ].map((s) => (
                <div key={s.l} className="border-l border-cream/10 pl-4">
                  <div className="font-display text-4xl text-turquoise leading-none">{s.n}</div>
                  <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.24em] text-cream/50">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured episode showcase */}
          <div
            className="lg:col-span-5 xl:col-span-5 relative hidden lg:block animate-fade-up"
            style={{ animationDelay: "320ms" }}
          >
            <div className="absolute -inset-10 rounded-[2.5rem] bg-gradient-to-br from-turquoise/25 via-turquoise/[0.06] to-transparent blur-3xl" />
            <div className="relative rounded-[2rem] border border-cream/10 bg-cream/[0.025] backdrop-blur-md p-5 overflow-hidden">
              <div className="flex items-center justify-between mb-5 px-2">
                <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-turquoise">
                  <Headphones className="size-3.5" /> {t("episodes.eyebrow")}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-cream/40">
                  Ep · {String(featured?.number ?? 0).padStart(3, "0")}
                </span>
              </div>
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative bg-gradient-to-br from-turquoise/30 via-midnight to-midnight ring-1 ring-cream/10">
                <div className="absolute inset-0 grid place-items-center p-8 text-center">
                  <div>
                    <div className="text-turquoise/80 text-5xl mb-4 animate-star inline-block">✦</div>
                    <div className="text-[10px] uppercase tracking-[0.35em] text-cream/50 mb-4">
                      {featured?.category[lang]}
                    </div>
                    <h3 className="font-display text-3xl md:text-4xl leading-[1.02] text-balance">
                      {featured?.title[lang]}
                    </h3>
                    <p className="mt-4 text-xs uppercase tracking-[0.3em] text-cream/40">
                      {featured?.duration} {t("episodes.min")}
                    </p>
                  </div>
                </div>
              </div>
              <a
                href={SOCIALS.spotifyShow}
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex items-center justify-between rounded-2xl bg-turquoise text-midnight px-5 py-4 text-sm font-bold uppercase tracking-widest transition-transform hover:-translate-y-0.5"
              >
                <span className="inline-flex items-center gap-2">
                  <Play className="size-4 fill-current" /> {t("hero.cta.spotify")}
                </span>
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/40 text-[10px] font-bold uppercase tracking-[0.5em]">
          ✦ scroll
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
                <div className="aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-cream/10 mb-4 transition-transform group-hover:-translate-y-1 group-hover:ring-turquoise/40">
                  <img
                    src={m.photo}
                    alt={m.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
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
      <section className="py-20 bg-turquoise text-midnight border-t border-turquoise/40">
        <div className="container-x flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="text-xs font-bold uppercase tracking-[0.28em] mb-3 opacity-70">
              {t("support.eyebrow")} ✦
            </div>
            <h3 className="font-display text-4xl md:text-5xl leading-[1.05]">
              {t("support.bandTitle")}
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
