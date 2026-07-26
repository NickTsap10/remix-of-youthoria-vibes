import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, CalendarCheck } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useI18n } from "@/lib/i18n";
import { StarField } from "@/components/site/StarField";
import { SOCIALS } from "@/lib/socials";
import { supabase } from "@/integrations/supabase/client";

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
  const { t } = useI18n();
  const { data: episodes = [] } = useQuery({
    queryKey: ["episodes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("episodes")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
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
          {SOCIALS.booking && (
            <a
              href={SOCIALS.booking}
              target="_blank"
              rel="noreferrer"
              className="mb-6 inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-full bg-turquoise text-midnight px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-widest shadow-lg shadow-turquoise/20 hover:-translate-y-0.5 transition-transform"
            >
              <CalendarCheck className="size-4" /> {t("episodes.book")}
            </a>
          )}
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
          {episodes.map((e: any, i: number) => {
            const href = e.spotify_url && e.spotify_url !== "https://open.spotify.com/"
              ? e.spotify_url
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
                <div className={`relative aspect-square bg-gradient-to-br ${g} bg-cover bg-center`}
                  style={e.image_url ? { backgroundImage: `linear-gradient(180deg, rgba(12,49,107,0.35), rgba(12,49,107,0.85)), url(${e.image_url})` } : undefined}
                >
                  <div className="absolute inset-0 grid place-items-center text-center p-8">
                    <div>
                      <div className="text-turquoise text-4xl mb-4 animate-star inline-block">✦</div>
                      <div className="font-display text-2xl md:text-[1.6rem] leading-tight text-balance text-cream">
                        {e.title}
                      </div>
                    </div>
                  </div>
                  {e.category && (
                    <div className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-turquoise font-bold px-2.5 py-1 rounded-full bg-midnight/60 backdrop-blur">
                      {e.category}
                    </div>
                  )}
                  <div className="absolute top-4 right-4 size-9 rounded-full bg-midnight/50 backdrop-blur grid place-items-center text-cream/70 group-hover:bg-turquoise group-hover:text-midnight transition-colors">
                    <ArrowUpRight className="size-4" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] uppercase tracking-widest text-cream/50">
                    <span>{e.duration}</span>
                    <span>Spotify</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
        {episodes.length === 0 && (
          <div className="text-center text-cream/50 py-20">No episodes yet.</div>
        )}
      </section>
    </div>
  );
}