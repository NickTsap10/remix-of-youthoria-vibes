import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { team } from "@/data/team";
import { StarField } from "@/components/site/StarField";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Meet the Youthoria Team" },
      { name: "description", content: "Meet the collective behind Youthoria Podcast." },
      { property: "og:title", content: "Meet the Youthoria Team" },
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

      <section className="container-x mt-20 grid gap-8 md:grid-cols-2">
        {team.map((m, i) => (
          <article
            key={m.name}
            className="animate-fade-up rounded-3xl border border-cream/10 bg-cream/[0.02] p-6 md:p-8 hover:border-turquoise/40 hover:bg-turquoise/5 transition-all"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-start gap-6">
              <img
                src={m.photo}
                alt={m.name}
                loading="lazy"
                className="size-28 md:size-32 shrink-0 rounded-2xl object-cover ring-1 ring-cream/10"
              />
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-2xl md:text-3xl leading-tight">{m.name}</h3>
                <p className="text-xs text-turquoise font-semibold uppercase tracking-widest mt-2">
                  {m.role[lang]}
                </p>
                {m.bio ? (
                  <p className="mt-4 text-cream/70 text-sm leading-relaxed">{m.bio[lang]}</p>
                ) : null}
                <a
                  href={`mailto:${m.email}`}
                  className="mt-5 inline-flex items-center gap-2 text-xs text-cream/60 hover:text-turquoise"
                >
                  <Mail className="size-3.5" /> {m.email}
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}