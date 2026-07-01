import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { episodes } from "@/data/episodes";
import { EpisodeCard } from "@/components/site/EpisodeCard";
import { StarField } from "@/components/site/StarField";

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

      <section className="container-x mt-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {episodes.map((e, i) => (
            <EpisodeCard key={e.id} episode={e} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}