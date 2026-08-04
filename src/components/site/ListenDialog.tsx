import { useState } from "react";
import { Music2, Apple, Podcast, ArrowUpRight, X, ChevronLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const SHOWS = [
  {
    id: "other-side",
    name: "Youthoria: The Other Side",
    links: [
      { name: "Spotify", Icon: Music2, url: "https://open.spotify.com/show/033tiqkThkFSNjscdrqC2Z?si=47308a2746514372" },
      { name: "Apple Podcasts", Icon: Apple, url: "https://podcasts.apple.com/us/podcast/youthoria-%CE%B7-%CE%AC%CE%BB%CE%BB%CE%B7-%CF%80%CE%BB%CE%B5%CF%85%CF%81%CE%AC/id6794648907" },
      { name: "Google Podcasts", Icon: Podcast, url: "https://www.youtube.com/playlist?list=PLHTUslFKcW8o" },
    ],
  },
  {
    id: "interviews",
    name: "Youthoria Interviews",
    links: [
      { name: "Spotify", Icon: Music2, url: "https://open.spotify.com/show/033pMLLmvyCoexR9l5BG4B?si=c5bc90aa97a64099" },
      { name: "Apple Podcasts", Icon: Apple, url: "https://podcasts.apple.com/us/podcast/youthoria-interviews/id6794648312" },
      { name: "Google Podcasts", Icon: Podcast, url: "https://www.youtube.com/playlist?list=PLOO7QDceZXm0" },
    ],
  },
] as const;

function ListenDialog({ onClose }: { onClose: () => void }) {
  const { t } = useI18n();
  const [showId, setShowId] = useState<string | null>(null);
  const show = SHOWS.find((s) => s.id === showId) ?? null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4 bg-ink/50 backdrop-blur-md animate-fade-up"
      role="dialog"
      aria-modal="true"
      aria-label={t("footer.listenToUs")}
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
        <div className="label-eyebrow mb-2">{show ? "Listen on" : t("footer.chooseShow")}</div>
        <h2 className="font-display text-2xl leading-tight text-balance pr-10">
          {show ? show.name : t("footer.listenToUs")}
        </h2>
        <div className="mt-6 grid gap-3">
          {!show &&
            SHOWS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setShowId(s.id)}
                className="flex items-center justify-between gap-3 rounded-2xl bg-slate text-sand px-5 py-4 text-xs font-medium uppercase tracking-[0.14em] text-left transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink"
              >
                <span>{s.name}</span>
                <ArrowUpRight className="size-4 shrink-0" />
              </button>
            ))}
          {show &&
            show.links.map(({ name, url, Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 rounded-2xl bg-slate text-sand px-5 py-4 text-xs font-medium uppercase tracking-[0.14em] transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink"
              >
                <span className="flex items-center gap-3"><Icon className="size-4" /> {name}</span>
                <ArrowUpRight className="size-4" />
              </a>
            ))}
          {show && (
            <button
              type="button"
              onClick={() => setShowId(null)}
              className="mt-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-mist hover:text-ink transition-colors"
            >
              <ChevronLeft className="size-4" /> {t("footer.back")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


export default ListenDialog;
