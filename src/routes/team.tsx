import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { team } from "@/data/team";
import { StarField } from "@/components/site/StarField";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "The Team — Youthoria Podcast" },
      { name: "description", content: "Meet the collective behind Youthoria Podcast." },
      { property: "og:title", content: "The Team — Youthoria Podcast" },
      { property: "og:description", content: "Meet the collective behind Youthoria Podcast." },
    ],
  }),
  component: TeamPage,
});

function TeamPage() {
  const { t, lang } = useI18n();
  return (
    <div className="pt-32 pb-24">
      <section className="relative">
        <StarField />
        <div className="container-x relative">
          <div className="label-eyebrow mb-4">{t("team.eyebrow")}</div>
          <h1 className="font-display text-5xl md:text-7xl leading-tight">{t("team.title")}</h1>
        </div>
      </section>

      <section className="container-x mt-20 grid gap-10 md:grid-cols-2">
        {team.map((m, i) => (
          <article
            key={m.name}
            className="animate-fade-up rounded-3xl border border-cream/10 bg-cream/[0.02] p-8 hover:border-turquoise/40 hover:bg-turquoise/5 transition-all"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-start gap-6">
              <div className="size-24 shrink-0 rounded-2xl bg-gradient-to-br from-cream/15 via-turquoise/10 to-midnight ring-1 ring-cream/10 grid place-items-center font-display text-4xl text-cream/60">
                {m.name[0]}
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-3xl">{m.name}</h3>
                <p className="text-xs text-turquoise font-semibold uppercase tracking-widest mt-1">
                  {m.role[lang]}
                </p>
                <p className="mt-4 text-cream/70 text-sm leading-relaxed">{m.bio[lang]}</p>
                <div className="mt-5 flex flex-wrap items-center gap-4 text-xs">
                  <a
                    href={`mailto:${m.email}`}
                    className="inline-flex items-center gap-2 text-cream/60 hover:text-turquoise"
                  >
                    <Mail className="size-3.5" /> {m.email}
                  </a>
                  {m.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.url}
                      className="text-cream/60 hover:text-turquoise uppercase tracking-widest font-semibold"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}