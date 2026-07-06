import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, MapPin, Users } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { StarField } from "@/components/site/StarField";
import { GreeceMap } from "@/components/site/GreeceMap";
import { team } from "@/data/team";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { t, lang } = useI18n();

  return (
    <div className="pt-16">
      {/* INTRO — minimal brand mark */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <StarField />
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 size-[40rem] rounded-full bg-turquoise/[0.08] blur-[140px]" />
        <div className="container-x relative text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cream/15 bg-cream/[0.03] text-[11px] font-semibold uppercase tracking-[0.32em] text-cream/70">
            <span className="size-1.5 rounded-full bg-turquoise animate-pulse" />
            Youthoria ✦ Podcast
          </div>
          <h1 className="mt-8 font-display text-6xl md:text-8xl leading-[0.9] tracking-[-0.01em]">
            {lang === "el" ? "Από νέους, για νέους." : "By youth, for youth."}
          </h1>
        </div>
      </section>

      {/* ATLAS */}
      <section className="section-pad border-t border-cream/5 bg-gradient-to-b from-transparent via-turquoise/[0.03] to-transparent">
        <div className="container-x grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-8 rounded-[2.5rem] bg-turquoise/[0.06] blur-3xl" />
            <div className="relative">
              <GreeceMap />
            </div>
          </div>
          <div className="order-1 lg:order-2 animate-fade-up">
            <div className="label-eyebrow mb-3 inline-flex items-center gap-2">
              <MapPin className="size-3.5" /> Our Map
            </div>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] text-balance">
              Youthoria Atlas
            </h2>
            <p className="mt-6 text-lg text-cream/75 leading-relaxed max-w-[46ch] text-pretty">
              Mapping stories across the Aegean. We travel to document the lives of young
              people in every corner of Greece.
            </p>
            <Link to="/atlas" className="btn-primary mt-8">
              {t("atlas.explore")} <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section-pad border-t border-cream/5">
        <div className="container-x">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <div className="label-eyebrow mb-3 inline-flex items-center gap-2 justify-center">
              <Users className="size-3.5" /> The People
            </div>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02]">
              Meet the Youthoria Team
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <Link
                key={m.name}
                to="/team"
                className="group animate-fade-up block"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-cream/10 mb-4 transition-all group-hover:-translate-y-1 group-hover:ring-turquoise/40">
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
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/team" className="btn-ghost">
              {t("nav.team")} <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SUPPORT */}
      <section className="py-24 bg-turquoise text-midnight border-t border-turquoise/40">
        <div className="container-x max-w-3xl mx-auto text-center">
          <div className="text-xs font-bold uppercase tracking-[0.32em] mb-4 opacity-70">
            Support Us ✦
          </div>
          <h3 className="font-display text-5xl md:text-6xl leading-[1.02]">
            Support Youthoria
          </h3>
          <p className="mt-5 text-lg font-medium max-w-[46ch] mx-auto">
            Your support keeps us independent and youth-led.
          </p>
          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-2 px-8 py-4 bg-midnight text-cream rounded-full text-sm font-bold uppercase tracking-widest hover:bg-midnight/90 transition-transform hover:-translate-y-0.5"
          >
            <Heart className="size-4" /> {t("support.donate")}
          </Link>
        </div>
      </section>
    </div>
  );
}
