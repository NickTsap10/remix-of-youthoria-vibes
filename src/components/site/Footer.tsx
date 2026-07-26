import { Link } from "@tanstack/react-router";
import { Instagram, Music2, Mail, Heart } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SOCIALS } from "@/lib/socials";

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M19.6 6.9a5.6 5.6 0 0 1-3.3-1.2 5.5 5.5 0 0 1-2.1-4H11v13.3a2.7 2.7 0 1 1-2.7-2.7c.3 0 .5 0 .8.1V9.2a5.9 5.9 0 1 0 5.1 5.8V9.6a8.3 8.3 0 0 0 5.4 2v-3z" />
    </svg>
  );
}

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-cream/10 pt-20 pb-24">
      <div className="container-x mb-16 flex flex-col md:flex-row items-center justify-between gap-6 rounded-3xl border border-turquoise/30 bg-turquoise/[0.06] px-8 py-8">
        <div>
          <div className="font-display text-2xl md:text-3xl">Support Youthoria</div>
          <p className="text-sm text-cream/70 mt-1">{t("footer.tagline")}</p>
        </div>
        <a
          href={SOCIALS.donate}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-turquoise text-midnight px-6 py-3 text-xs font-bold uppercase tracking-widest hover:-translate-y-0.5 transition-transform"
        >
          <Heart className="size-4" /> {t("support.donate")}
        </a>
      </div>
      <div className="container-x grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-turquoise animate-star inline-block">✦</span>
            <span className="font-display text-3xl">Youthoria</span>
          </div>
          <p className="text-muted text-sm max-w-[32ch] leading-relaxed">
            {t("footer.tagline")}
          </p>
        </div>
        <div>
          <h5 className="label-eyebrow mb-5">{t("footer.listen")}</h5>
          <ul className="space-y-3 text-sm text-cream/70">
            <li><a href={SOCIALS.spotifyShow} target="_blank" rel="noreferrer" className="hover:text-turquoise inline-flex items-center gap-2"><Music2 className="size-3.5" /> Spotify</a></li>
          </ul>
        </div>
        <div>
          <h5 className="label-eyebrow mb-5">{t("footer.connect")}</h5>
          <ul className="space-y-3 text-sm text-cream/70">
            <li><a href={SOCIALS.instagram} target="_blank" rel="noreferrer" className="hover:text-turquoise inline-flex items-center gap-2"><Instagram className="size-3.5" /> @youthoria.podcast</a></li>
            <li><a href={SOCIALS.tiktok} target="_blank" rel="noreferrer" className="hover:text-turquoise inline-flex items-center gap-2"><TikTokIcon className="size-3.5" /> @youthoria.podcast</a></li>
            <li><a href={`mailto:${SOCIALS.email}`} className="hover:text-turquoise inline-flex items-center gap-2"><Mail className="size-3.5" /> {SOCIALS.email}</a></li>
          </ul>
        </div>
        <div>
          <h5 className="label-eyebrow mb-5">{t("footer.explore")}</h5>
          <ul className="space-y-3 text-sm text-cream/70">
            <li><Link to="/episodes" className="hover:text-turquoise">{t("nav.episodes")}</Link></li>
            <li><Link to="/reviews" className="hover:text-turquoise">{t("nav.reviews")}</Link></li>
            <li><Link to="/team" className="hover:text-turquoise">{t("nav.team")}</Link></li>
            <li><Link to="/contact" className="hover:text-turquoise">{t("nav.contact")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="container-x mt-16 pt-6 border-t border-cream/5 flex flex-col md:flex-row justify-between gap-3 text-[10px] font-semibold uppercase tracking-widest text-faint">
        <span>© {new Date().getFullYear()} YOUTHORIA PODCAST — {t("footer.rights")}</span>
        <span>Created by Tsiaplias Nikos</span>
      </div>
    </footer>
  );
}