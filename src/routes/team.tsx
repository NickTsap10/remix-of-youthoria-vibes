import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { team } from "@/data/team";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Meet the Youthoria Team" },
      { name: "description", content: "Meet the collective behind Youthoria Podcast." },
      { property: "og:title", content: "Meet the Youthoria Team" },
      { property: "og:description", content: "Meet the collective behind Youthoria Podcast." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TeamPage,
});

function TeamPage() {
  const { t, lang } = useI18n();
  return (
    <div className="pt-36 pb-28 md:pt-44">
      <PageHeader
        eyebrow={t("team.eyebrow")}
        title={t("team.title")}
        index={`${String(team.length).padStart(2, "0")} / People`}
        lede={
          lang === "el"
            ? "Μια μικρή ομάδα που φτιάχνει το Youthoria — φωνές, ιδέες και παραγωγή."
            : "A small collective making Youthoria — the voices, the ideas and the production."
        }
      />

      <section className="container-x cv-auto mt-16 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-24 md:gap-x-8 md:gap-y-16 lg:grid-cols-3">
        {team.map((m, i) => (
          <article key={m.name} className="animate-fade-up group" style={{ animationDelay: `${i * 70}ms` }}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] border border-ink/10 bg-stone/40">
              <img
                src={m.photo}
                alt={m.name}
                loading="lazy"
                decoding="async"
                width={380}
                height={506}
                sizes="(max-width: 768px) 45vw, 320px"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
              />
              <span className="absolute left-4 top-4 text-[10px] font-medium uppercase tracking-[0.22em] text-sand/90 mix-blend-difference">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="mt-5 font-display text-xl leading-tight text-ink md:text-2xl">{m.name}</h3>
            <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.18em] text-mist">{m.role[lang]}</p>
            {m.bio ? (
              <p className="mt-3.5 text-sm leading-relaxed text-ink/65">{m.bio[lang]}</p>
            ) : null}
            <a
              href={`mailto:${m.email}`}
              className="mt-4 inline-flex items-center gap-2 border-b border-transparent pb-0.5 text-xs text-ink/55 transition-colors hover:border-slate/40 hover:text-slate"
            >
              <Mail className="size-3.5" /> <span className="truncate">{m.email}</span>
            </a>
          </article>
        ))}
      </section>
    </div>
  );
}
