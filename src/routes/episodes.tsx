import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { StarField } from "@/components/site/StarField";
import { SOCIALS } from "@/lib/socials";

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
  return (
    <div className="pt-32 pb-24">
      <section className="relative">
        <StarField />
        <div className="container-x relative">
          <div className="label-eyebrow mb-4">{t("episodes.eyebrow")}</div>
          <h1 className="font-display text-5xl md:text-7xl leading-tight max-w-3xl">
            {t("episodes.title")}
          </h1>
          <p className="mt-6 text-muted max-w-[52ch] text-pretty">
            {t("episodes.subtitle")}
          </p>
        </div>
      </section>

      <section className="container-x mt-16 grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-cream/10 bg-cream/[0.02] p-4 overflow-hidden">
          <iframe
            title="Youthoria Podcast on Spotify"
            src={`https://open.spotify.com/embed/show/${SOCIALS.spotifyShowId}?utm_source=generator&theme=0`}
            width="100%"
            height="520"
            frameBorder={0}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-2xl"
          />
        </div>
        <div className="rounded-3xl border border-cream/10 bg-cream/[0.02] p-4 overflow-hidden">
          <iframe
            title="Youthoria Podcast — Alternate Show on Spotify"
            src={`https://open.spotify.com/embed/show/${SOCIALS.spotifyShowAltId}?utm_source=generator&theme=0`}
            width="100%"
            height="520"
            frameBorder={0}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-2xl"
          />
        </div>
      </section>
    </div>
  );
}