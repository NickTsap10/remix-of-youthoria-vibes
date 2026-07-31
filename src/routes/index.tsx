import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Heart, Mic, Star, Users } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/site/Reveal";
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
      <section className="relative overflow-hidden pt-36 md:pt-48 pb-24 md:pb-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(255,255,255,0.75),transparent_60%)]" />
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[46rem] rounded-full bg-slate/[0.07] blur-[150px]" />
        <div className="pointer-events-none absolute -bottom-32 -right-24 size-[30rem] rounded-full bg-stone/50 blur-[120px]" />

        <div className="container-x relative">
          <div className="max-w-4xl">
            <div className="animate-soft-in inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-white/50 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.28em] text-ink/60 backdrop-blur">
              <span className="size-1.5 rounded-full bg-slate animate-glow" />
              Youthoria ✦ Podcast
            </div>

            <h1
              className="animate-rise mt-8 font-display text-[3.25rem] sm:text-7xl md:text-[6.5rem] leading-[0.92] tracking-[-0.02em] text-ink text-balance"
              style={{ animationDelay: "80ms" }}
            >
              {lang === "el" ? "Από νέους, για νέους." : "By youth, for youth."}
            </h1>

            <p
              className="animate-rise mt-8 max-w-[46ch] text-lg md:text-xl leading-relaxed text-ink/70 text-pretty"
              style={{ animationDelay: "200ms" }}
            >
              {lang === "el"
                ? "Ένα podcast για αληθινές συζητήσεις, ανθρώπινες ιστορίες και ιδέες που αλλάζουν τη νέα γενιά."
                : "A podcast for honest conversations, human stories and the ideas shaping a new generation."}
            </p>

            <div
              className="animate-rise mt-11 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "320ms" }}
            >
              <Link to="/episodes" className="btn-primary">
                <Mic className="size-4" /> {t("nav.episodes")}
              </Link>
              <Link to="/about" className="btn-ghost">
                {t("nav.about")} <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section-pad bg-stone/40 border-y border-ink/10">
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
                  src={getAssetUrl("/images/brand/youthoria-script-slate.webp")}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  decoding="async"
                  width={1000}
                  height={481}
                  className="h-6 w-auto opacity-60"
                />
                <span>{lang === "el" ? "Ακροατές" : "Listeners"}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TEAM */}
      <section className="section-pad">
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
      <section className="relative overflow-hidden bg-slate py-28 md:py-36 text-sand">
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
