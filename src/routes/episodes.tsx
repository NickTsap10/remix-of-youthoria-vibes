import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { StarField } from "@/components/site/StarField";
import { SOCIALS } from "@/lib/socials";
import { episodes } from "@/data/episodes";

export const Route = createFileRoute("/episodes")({
  head: () => ({
    meta: [
      { title: "Episodes — Youthoria Podcast" },
      { name: "description", content: "All Youthoria Podcast episodes. Auto-synced from Spotify." },
      { property: "og:title", content: "Episodes — Youthoria Podcast" },
      { property: "og:description", content: "All Youthoria Podcast episodes." },
    ],
  }),
  component: EpisodesPage,
});

function EpisodesPage() {
  const { t, lang } = useI18n();
  const gradients = [
    "from-turquoise/50 via-turquoise/10 to-midnight",
    "from-cream/25 via-cream/5 to-midnight",
    "from-turquoise/35 via-midnight to-midnight",
    "from-cream/15 via-turquoise/15 to-midnight",
    "from-turquoise/40 via-cream/10 to-midnight",
    "from-cream/20 via-turquoise/20 to-midnight",
  ];
  return (
    <div className="pt-32 pb-24">
      <section className="relative">
        <StarField />
        <div className="container-x relative">
          <div className="label-eyebrow mb-4">{t("episodes.eyebrow")}</div>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] max-w-3xl text-balance">
            {t("episodes.title")}
          </h1>
          <p className="mt-6 text-cream/70 max-w-[52ch] text-pretty">
            {t("episodes.subtitle")}
          </p>
        </div>
      </section>

      <section className="container-x mt-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {episodes.map((e, i) => {
            const href = e.spotifyUrl && e.spotifyUrl !== "https://open.spotify.com/"
              ? e.spotifyUrl
              : SOCIALS.spotifyShow;
            const g = gradients[i % gradients.length];
            return (
              <a
                key={e.id}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group relative block rounded-3xl overflow-hidden ring-1 ring-cream/10 hover:ring-turquoise/50 transition-all duration-500 hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className={`relative aspect-square bg-gradient-to-br ${g}`}>
                  <div className="absolute inset-0 grid place-items-center text-center p-8">
                    <div>
                      <div className="text-turquoise text-4xl mb-4 animate-star inline-block">✦</div>
                      <div className="text-[10px] uppercase tracking-[0.35em] text-cream/60 mb-3">
                        Ep · {String(e.number).padStart(3, "0")}
                      </div>
                      <div className="font-display text-2xl md:text-[1.6rem] leading-tight text-balance text-cream">
                        {e.title[lang]}
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-turquoise font-bold px-2.5 py-1 rounded-full bg-midnight/60 backdrop-blur">
                    {e.category[lang]}
                  </div>
                  <div className="absolute top-4 right-4 size-9 rounded-full bg-midnight/50 backdrop-blur grid place-items-center text-cream/70 group-hover:bg-turquoise group-hover:text-midnight transition-colors">
                    <ArrowUpRight className="size-4" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] uppercase tracking-widest text-cream/50">
                    <span>{e.duration} {t("episodes.min")}</span>
                    <span>Spotify</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}