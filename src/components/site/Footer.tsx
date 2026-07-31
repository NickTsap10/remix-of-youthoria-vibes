import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Instagram, Music2, Mail, Heart, Apple, Podcast, ArrowUpRight, X, ChevronLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SOCIALS } from "@/lib/socials";
import { getAssetUrl } from "@/lib/assets";

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M19.6 6.9a5.6 5.6 0 0 1-3.3-1.2 5.5 5.5 0 0 1-2.1-4H11v13.3a2.7 2.7 0 1 1-2.7-2.7c.3 0 .5 0 .8.1V9.2a5.9 5.9 0 1 0 5.1 5.8V9.6a8.3 8.3 0 0 0 5.4 2v-3z" />
    </svg>
  );
}

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

export function Footer() {
  const { t, lang } = useI18n();
  const [listenOpen, setListenOpen] = useState(false);
  return (
    <footer className="border-t border-ink/10 bg-stone/30">
      <div className="container-x pt-24 pb-16">
        {/* Support banner */}
        <div className="grid gap-6 rounded-[1.5rem] border border-ink/10 bg-white/45 px-8 py-9 md:px-12 md:py-11 shadow-[var(--shadow-soft)] md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="font-display text-3xl md:text-4xl leading-tight text-ink">
              Support Youthoria
            </div>
            <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-ink/65">
              {t("footer.tagline")}
            </p>
          </div>
          <a
            href={SOCIALS.donate}
            target="_blank"
            rel="noreferrer"
            className="inline-flex justify-center items-center gap-2 rounded-full bg-slate text-sand px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.16em] transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink"
          >
            <Heart className="size-4" /> {t("support.donate")}
          </a>
        </div>

        {/* Columns */}
        <div className="mt-20 grid gap-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="space-y-5">
            <img
              src={getAssetUrl("/images/brand/youthoria-script-slate.webp")}
              alt="Youthoria"
              className="h-12 w-auto object-contain"
            />
            <p className="max-w-[34ch] text-sm leading-relaxed text-ink/60">
              {t("footer.tagline")}
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              {[
                { href: SOCIALS.instagram, Icon: Instagram, label: "Instagram" },
                { href: SOCIALS.tiktok, Icon: TikTokIcon, label: "TikTok" },
                { href: `mailto:${SOCIALS.email}`, Icon: Mail, label: "Email" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-ink/12 bg-white/50 text-ink/70 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate hover:text-sand hover:border-slate"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="label-eyebrow mb-6">{t("footer.listen")}</h5>
            <button
              type="button"
              onClick={() => setListenOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-slate/30 bg-white/40 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate hover:text-sand hover:border-slate"
            >
              <Music2 className="size-3.5" /> {t("footer.listenToUs")}
            </button>
          </div>

          <div>
            <h5 className="label-eyebrow mb-6">{t("footer.connect")}</h5>
            <ul className="space-y-3.5 text-sm text-ink/65">
              <li>
                <a href={SOCIALS.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-ink">
                  <Instagram className="size-3.5" /> @youthoria.podcast
                </a>
              </li>
              <li>
                <a href={SOCIALS.tiktok} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-ink">
                  <TikTokIcon className="size-3.5" /> @youthoria.podcast
                </a>
              </li>
              <li>
                <a href={`mailto:${SOCIALS.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-ink">
                  <Mail className="size-3.5" /> {SOCIALS.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="label-eyebrow mb-6">{t("footer.explore")}</h5>
            <ul className="space-y-3.5 text-sm text-ink/65">
              {[
                { to: "/episodes", label: t("nav.episodes") },
                { to: "/reviews", label: t("nav.reviews") },
                { to: "/team", label: t("nav.team") },
                { to: "/contact", label: t("nav.contact") },
                { to: "/privacy-policy", label: t("nav.privacy") },
                { to: "/terms", label: t("nav.terms") },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition-colors hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-ink/10 pt-7 text-[10px] font-medium uppercase tracking-[0.16em] text-mist md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} Youthoria Podcast — {t("footer.rights")}</span>
          <span>{lang === "el" ? "Δημιουργήθηκε από" : "Created by"} Tsiaplias Nikos</span>
        </div>
      </div>
      {listenOpen && <ListenDialog onClose={() => setListenOpen(false)} />}
    </footer>
  );
}
