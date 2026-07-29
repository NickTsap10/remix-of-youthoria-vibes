import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, CalendarCheck, X, Music2, Podcast, Apple } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useI18n } from "@/lib/i18n";
import { StarField } from "@/components/site/StarField";
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
  const [selected, setSelected] = useState<any | null>(null);
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
          <a
            href="https://youthoria-booking-studio.lovable.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-6 inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-full bg-turquoise text-midnight px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-widest shadow-lg shadow-turquoise/20 hover:-translate-y-0.5 transition-transform"
          >
            <CalendarCheck className="size-4" /> {t("episodes.book")}
          </a>
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
            const g = gradients[i % gradients.length];
            return (
              <button
                key={e.id}
                type="button"
                onClick={() => setSelected(e)}
                className="group relative block w-full text-left rounded-3xl overflow-hidden ring-1 ring-cream/10 hover:ring-turquoise/50 transition-all duration-500 hover:-translate-y-1 animate-fade-up"
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
                    <span>Listen</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        {episodes.length === 0 && (
          <div className="text-center text-cream/50 py-20">No episodes yet.</div>
        )}
      </section>

      {selected && <PlatformDialog episode={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function PlatformDialog({ episode, onClose }: { episode: any; onClose: () => void }) {
  const spotify =
    episode.spotify_url && episode.spotify_url !== "https://open.spotify.com/"
      ? episode.spotify_url
      : null;
  const platforms = [
    { name: "Spotify", url: spotify, Icon: Music2 },
    { name: "Google Podcasts", url: episode.google_url || null, Icon: Podcast },
    { name: "Apple Podcasts", url: episode.apple_url || null, Icon: Apple },
  ];

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4 bg-midnight/80 backdrop-blur-sm animate-fade-up"
      role="dialog"
      aria-modal="true"
      aria-label={`Listen to ${episode.title}`}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl border border-cream/10 bg-midnight p-6 sm:p-8"
        onClick={(ev) => ev.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 size-9 rounded-full bg-cream/5 grid place-items-center text-cream/60 hover:text-cream"
        >
          <X className="size-4" />
        </button>
        <div className="label-eyebrow mb-2">Listen on</div>
        <h2 className="font-display text-2xl leading-tight text-balance pr-10">{episode.title}</h2>
        <div className="mt-6 grid gap-3">
          {platforms.map(({ name, url, Icon }) =>
            url ? (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-3 rounded-2xl bg-turquoise text-midnight px-5 py-4 text-sm font-bold uppercase tracking-widest hover:-translate-y-0.5 transition-transform"
              >
                <span className="flex items-center gap-3"><Icon className="size-4" /> {name}</span>
                <ArrowUpRight className="size-4" />
              </a>
            ) : (
              <span
                key={name}
                aria-disabled="true"
                title="Not available for this episode"
                className="flex items-center justify-between gap-3 rounded-2xl bg-cream/5 text-cream/35 px-5 py-4 text-sm font-bold uppercase tracking-widest cursor-not-allowed"
              >
                <span className="flex items-center gap-3"><Icon className="size-4" /> {name}</span>
                <span className="text-[10px] tracking-widest">Unavailable</span>
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}