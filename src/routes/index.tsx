import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, Heart, Star, Users } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/site/Reveal";
import { HeroCanvas } from "@/components/site/HeroCanvas";
import { EpisodeCarousel } from "@/components/site/EpisodeCarousel";
import { team } from "@/data/team";
import { SOCIALS } from "@/lib/socials";
import { getAssetUrl } from "@/lib/assets";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Youthoria Podcast — Authentic stories from a new generation" },
      {
        name: "description",
        content:
          "Youthoria is a youth-led podcast sharing honest conversations, human stories and ideas that move a new generation forward.",
      },
      { property: "og:title", content: "Youthoria Podcast — Authentic stories from a new generation" },
      {
        property: "og:description",
        content: "Youthoria is a youth-led podcast sharing honest conversations, human stories and ideas that move a new generation forward.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { t, lang } = useI18n();

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[100svh] overflow-hidden bg-[#536878] pb-32 pt-32 md:pb-40 md:pt-40">
        <HeroCanvas />

        <div className="container-x relative flex min-h-[calc(100svh-16rem)] flex-col justify-center">
          <div className="animate-soft-in flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.34em] text-[#EAE0C7]/70">
            <span className="size-1.5 rounded-full bg-[#EAE0C7]/70" />
            Youthoria ✦ Podcast
          </div>

          <h1 className="mt-10 max-w-5xl text-[#F7F5EF]">
            <span
              className="animate-rise block text-2xl font-light tracking-[0.02em] text-[#F7F5EF]/75 sm:text-3xl md:text-4xl"
              style={{ animationDelay: "80ms" }}
            >
              {lang === "el" ? "Έχει να κάνει με" : "It’s about"}
            </span>
            <span
              className="animate-rise mt-2 block font-display text-[26vw] leading-[0.82] tracking-[-0.03em] sm:text-[20vw] md:text-[15rem] lg:text-[17rem]"
              style={{ animationDelay: "180ms" }}
            >
              {lang === "el" ? "ΕΣΕΝΑ." : "YOU."}
            </span>
          </h1>

          <p
            className="animate-rise mt-10 max-w-[44ch] text-base leading-relaxed text-[#EAE0C7]/80 md:text-lg"
            style={{ animationDelay: "300ms" }}
          >
            {lang === "el"
              ? "Ιστορίες, φωνές και συζητήσεις από μια γενιά που βρίσκει τον δρόμο της."
              : "Stories, voices and conversations from a generation finding its way."}
          </p>

          <div className="animate-rise mt-12 flex flex-wrap items-center gap-x-10 gap-y-6" style={{ animationDelay: "400ms" }}>
            <Link
              to="/episodes"
              className="group inline-flex items-center gap-3 border-b border-[#CCC7B7]/50 pb-2 text-[11px] font-medium uppercase tracking-[0.26em] text-[#F7F5EF] transition-colors hover:border-[#F7F5EF]"
            >
              {lang === "el" ? "Δες τα επεισόδια" : "Explore the episodes"}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
            <Link
              to="/about"
              className="text-[11px] font-medium uppercase tracking-[0.26em] text-[#EAE0C7]/60 transition-colors hover:text-[#F7F5EF]"
            >
              {t("nav.about")}
            </Link>
          </div>
        </div>

        {/* editorial labels */}
        <div className="container-x pointer-events-none relative mt-16 flex flex-wrap items-end justify-between gap-6 text-[10px] font-medium uppercase tracking-[0.3em] text-[#CCC7B7]/60">
          <span>01 / 07</span>
          <span className="hidden sm:inline">Stories / Voices / People</span>
          <span className="inline-flex items-center gap-2">
            {lang === "el" ? "Κύλισε" : "Scroll to discover"} <ArrowDown className="size-3.5" />
          </span>
        </div>

        {/* organic curved transition into the cream section */}
        <svg
          className="pointer-events-none absolute -bottom-px left-0 w-full"
          viewBox="0 0 1440 130"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0 130 L0 74 C 260 6 520 132 780 78 C 1010 30 1230 34 1440 62 L1440 130 Z" fill="#F7F5EF" />
        </svg>
      </section>

      {/* EPISODES */}
      <section className="relative cv-auto bg-[#F7F5EF] pb-28 pt-8 md:pb-36">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <div className="label-eyebrow mb-5">{t("episodes.eyebrow")}</div>
            <h2 className="font-display text-4xl leading-[1.02] text-ink text-balance md:text-6xl">
              {lang === "el" ? "Ανακάλυψε όλα τα επεισόδια." : "Discover all our episodes."}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/60 text-pretty">
              {lang === "el"
                ? "Διαφορετικές ιστορίες. Διαφορετικές φωνές. Μία γενιά."
                : "Different stories. Different voices. One generation."}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 pl-6 md:pl-[max(1.5rem,calc(50vw-39rem+1.5rem))]">
          <EpisodeCarousel />
        </div>

        <div className="container-x mt-4">
          <Link to="/episodes" className="btn-ghost">
            {t("episodes.viewAll")} <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section-pad cv-auto bg-stone/40 border-y border-ink/10">
        <div className="container-x grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <div className="label-eyebrow mb-4 inline-flex items-center gap-2">
              <Star className="size-3.5" /> {t("reviews.eyebrow")}
            </div>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] text-balance text-ink">
              {t("reviews.heading")}
            </h2>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink/70 text-pretty">
              {t("reviews.body")}
            </p>
            <Link to="/reviews" className="btn-primary mt-9">
              {t("reviews.cta")} <ArrowRight className="size-4" />
            </Link>
          </Reveal>
          <Reveal delay={160} className="relative">
            <div className="surface-card overflow-hidden p-10 md:p-12">
              <div className="flex gap-1.5 text-slate">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <p className="mt-6 font-display text-2xl md:text-3xl leading-snug text-ink text-balance">
                {lang === "el"
                  ? "«Νιώθεις σαν να κάθεσαι μαζί τους — αληθινές κουβέντες, χωρίς φίλτρα.»"
                  : "“It feels like sitting in the room with them — real talk, no filters.”"}
              </p>
              <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-mist">
                <img
                  src={getAssetUrl("/images/brand/youthoria-script-slate-300.webp")}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  decoding="async"
                  width={300}
                  height={144}
                  className="h-6 w-auto opacity-60"
                />
                <span>{lang === "el" ? "Ακροατές" : "Listeners"}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TEAM */}
      <section className="section-pad cv-auto">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <div className="label-eyebrow mb-4 inline-flex items-center gap-2">
              <Users className="size-3.5" /> {lang === "el" ? "Οι άνθρωποι" : "The people"}
            </div>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] text-ink text-balance">
              {lang === "el" ? "Οι φωνές πίσω από το Youthoria" : "The voices behind Youthoria"}
            </h2>
          </Reveal>

          <div className="mt-16 grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 90}>
                <Link to="/team" className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] border border-ink/10 bg-stone/40 shadow-[var(--shadow-soft)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[var(--shadow-lift)]">
                    <img
                      src={m.photo}
                      alt={m.name}
                      loading="lazy"
                      decoding="async"
                      width={380}
                      height={506}
                      sizes="(max-width: 768px) 45vw, 260px"
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="absolute bottom-4 right-4 grid size-9 place-items-center rounded-full bg-sand/90 text-ink opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-medium text-ink">{m.name}</h3>
                  <p className="mt-1.5 text-[11px] uppercase tracking-[0.18em] text-mist">
                    {m.role[lang]}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="mt-14">
            <Link to="/team" className="btn-ghost">
              {t("nav.team")} <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* SUPPORT */}
      <section className="relative overflow-hidden cv-auto bg-slate py-28 md:py-36 text-sand">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_0%,rgba(234,224,199,0.16),transparent_65%)]" />
        <div className="container-x relative max-w-3xl text-center">
          <Reveal>
            <div className="text-[10px] font-medium uppercase tracking-[0.32em] text-sand/60">
              Support Us ✦
            </div>
            <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[1.02]">
              Support Youthoria
            </h2>
            <p className="mt-6 mx-auto max-w-[46ch] text-lg leading-relaxed text-sand/75 text-pretty">
              {lang === "el"
                ? "Η υποστήριξή σου μας κρατά ανεξάρτητους και youth-led."
                : "Your support keeps us independent and youth-led."}
            </p>
            <a
              href={SOCIALS.donate}
              target="_blank"
              rel="noreferrer"
              className="mt-11 inline-flex items-center gap-2 rounded-full bg-sand px-8 py-4 text-xs font-medium uppercase tracking-[0.16em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
            >
              <Heart className="size-4" /> {t("support.donate")}
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
