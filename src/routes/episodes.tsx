import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, CalendarCheck, X, Music2, Podcast, Apple } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useI18n } from "@/lib/i18n";
import { StarField } from "@/components/site/StarField";
import { supabase } from "@/integrations/supabase/client";
import { getAssetUrl } from "@/lib/assets";

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
  const { data: episodes = [], isLoading, isError } = useQuery({
    queryKey: ["episodes"],
    staleTime: 60_000,
    retry: 1,
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
  return (
    <div className="pt-36 md:pt-44 pb-28">
      <section className="relative">
        <StarField />
        <div className="container-x relative">
          <a
            href="https://youthoria-booking-studio.lovable.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-8 inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-full bg-slate text-sand px-7 py-3.5 text-[11px] sm:text-xs font-medium uppercase tracking-[0.16em] shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink"
          >
            <CalendarCheck className="size-4" /> {t("episodes.book")}
          </a>
          <div className="label-eyebrow mb-4">{t("episodes.eyebrow")}</div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] max-w-3xl text-balance text-ink">
            {t("episodes.title")}
          </h1>
          <p className="mt-7 text-lg text-ink/65 max-w-[52ch] leading-relaxed text-pretty">
            {t("episodes.subtitle")}
          </p>
        </div>
      </section>

      <section className="container-x mt-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {episodes.map((e: any, i: number) => (
            <button
                key={e.id}
                type="button"
                onClick={() => setSelected(e)}
                className="group block w-full text-left animate-fade-up"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-ink/10 bg-stone/45 shadow-[var(--shadow-soft)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[var(--shadow-lift)]">
                  {e.image_url ? (
                    <img
                      src={getAssetUrl(e.image_url)}
                      alt={e.title}
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 768px) 92vw, 380px"
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center bg-gradient-to-br from-white/60 via-stone/40 to-stone/70">
                      <span className="animate-star text-4xl text-slate/50">✦</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  {e.category && (
                    <div className="absolute left-4 top-4 rounded-full bg-sand/85 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-ink/70 backdrop-blur">
                      {e.category}
                    </div>
                  )}
                  <span className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full bg-sand/90 text-ink opacity-0 translate-y-2 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
                <div className="mt-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-mist">
                  <span>{e.duration}</span>
                  <span className="h-px w-6 bg-ink/20" />
                  <span>Listen</span>
                </div>
                <h2 className="mt-3 font-display text-2xl md:text-[1.7rem] leading-tight text-ink text-balance transition-colors duration-300 group-hover:text-slate">
                  {e.title}
                </h2>
            </button>
          ))}
        </div>
        {isLoading && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] rounded-[1.25rem] bg-stone/50" />
                <div className="mt-5 h-3 w-24 rounded bg-stone/50" />
                <div className="mt-3 h-6 w-3/4 rounded bg-stone/50" />
              </div>
            ))}
          </div>
        )}
        {isError && (
          <div className="text-center text-mist py-24">
            Couldn't load episodes right now. Please refresh the page.
          </div>
        )}
        {!isLoading && !isError && episodes.length === 0 && (
          <div className="text-center text-mist py-24">No episodes yet.</div>
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
      className="fixed inset-0 z-50 grid place-items-center p-4 bg-ink/50 backdrop-blur-md animate-fade-up"
      role="dialog"
      aria-modal="true"
      aria-label={`Listen to ${episode.title}`}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-[1.5rem] border border-ink/10 bg-sand p-6 sm:p-8 shadow-[var(--shadow-lift)]"
        onClick={(ev) => ev.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 size-9 rounded-full bg-ink/5 grid place-items-center text-ink/60 hover:text-ink transition-colors"
        >
          <X className="size-4" />
        </button>
        <div className="label-eyebrow mb-2">Listen on</div>
        <h3 className="font-display text-2xl leading-tight text-balance pr-10 text-ink">{episode.title}</h3>
        <div className="mt-6 grid gap-3">
          {platforms.map(({ name, url, Icon }) =>
            url ? (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-3 rounded-2xl bg-slate text-sand px-5 py-4 text-xs font-medium uppercase tracking-[0.14em] transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink"
              >
                <span className="flex items-center gap-3"><Icon className="size-4" /> {name}</span>
                <ArrowUpRight className="size-4" />
              </a>
            ) : (
              <span
                key={name}
                aria-disabled="true"
                title="Not available for this episode"
                className="flex items-center justify-between gap-3 rounded-2xl bg-ink/5 text-ink/35 px-5 py-4 text-xs font-medium uppercase tracking-[0.14em] cursor-not-allowed"
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