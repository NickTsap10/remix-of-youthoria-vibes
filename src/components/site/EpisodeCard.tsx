import { Play, ExternalLink } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { Episode } from "@/data/episodes";

const gradients = [
  "from-turquoise/40 via-midnight to-midnight",
  "from-cream/20 via-midnight to-midnight",
  "from-turquoise/30 via-turquoise/5 to-midnight",
  "from-cream/10 via-turquoise/10 to-midnight",
];

export function EpisodeCard({ episode, index = 0 }: { episode: Episode; index?: number }) {
  const { lang, t } = useI18n();
  const g = gradients[index % gradients.length];
  const dateStr = new Date(episode.date).toLocaleDateString(
    lang === "el" ? "el-GR" : "en-GB",
    { day: "2-digit", month: "short", year: "numeric" }
  );

  return (
    <article
      id={episode.id}
      className="group animate-fade-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div
        className={`relative w-full aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-cream/10 mb-6 bg-gradient-to-br ${g} transition-transform duration-500 group-hover:-translate-y-1`}
      >
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="text-turquoise/60 text-4xl mb-2 animate-star inline-block">✦</div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-cream/40">
              Episode {episode.number}
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-midnight/40 opacity-0 group-hover:opacity-100 transition-opacity grid place-items-center">
          <button
            aria-label={t("episodes.play")}
            className="size-16 rounded-full bg-turquoise text-midnight grid place-items-center translate-y-2 group-hover:translate-y-0 transition-transform animate-glow"
          >
            <Play className="size-6 fill-current" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-3 text-[10px] font-bold uppercase tracking-widest">
        <span className="text-turquoise">{episode.category[lang]}</span>
        <span className="text-cream/40">{dateStr}</span>
        <span className="text-cream/40">· {episode.duration} {t("episodes.min")}</span>
      </div>
      <h3 className="text-2xl font-medium leading-tight text-balance group-hover:text-turquoise transition-colors">
        {episode.title[lang]}
      </h3>
      <p className="mt-3 text-cream/60 text-sm leading-relaxed line-clamp-2 text-pretty">
        {episode.description[lang]}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-4 text-xs">
        <a
          href={episode.spotifyUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-turquoise hover:underline"
        >
          <Play className="size-3 fill-current" /> {t("episodes.play")}
        </a>
        <a
          href={episode.spotifyUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-medium uppercase tracking-widest text-cream/50 hover:text-cream"
        >
          Spotify <ExternalLink className="size-3" />
        </a>
      </div>
    </article>
  );
}