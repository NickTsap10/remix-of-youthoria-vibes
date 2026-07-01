import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Music2, Mail } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-cream/10 pt-20 pb-24">
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
            <li><a href="#" className="hover:text-turquoise inline-flex items-center gap-2"><Music2 className="size-3.5" /> Spotify</a></li>
            <li><a href="#" className="hover:text-turquoise">Apple Podcasts</a></li>
            <li><a href="#" className="hover:text-turquoise inline-flex items-center gap-2"><Youtube className="size-3.5" /> YouTube</a></li>
          </ul>
        </div>
        <div>
          <h5 className="label-eyebrow mb-5">{t("footer.connect")}</h5>
          <ul className="space-y-3 text-sm text-cream/70">
            <li><a href="#" className="hover:text-turquoise inline-flex items-center gap-2"><Instagram className="size-3.5" /> Instagram</a></li>
            <li><a href="#" className="hover:text-turquoise">TikTok</a></li>
            <li><a href="mailto:hello@youthoria.gr" className="hover:text-turquoise inline-flex items-center gap-2"><Mail className="size-3.5" /> hello@youthoria.gr</a></li>
          </ul>
        </div>
        <div>
          <h5 className="label-eyebrow mb-5">{t("footer.explore")}</h5>
          <ul className="space-y-3 text-sm text-cream/70">
            <li><Link to="/episodes" className="hover:text-turquoise">{t("nav.episodes")}</Link></li>
            <li><Link to="/atlas" className="hover:text-turquoise">{t("nav.atlas")}</Link></li>
            <li><Link to="/team" className="hover:text-turquoise">{t("nav.team")}</Link></li>
            <li><Link to="/support" className="hover:text-turquoise">{t("nav.support")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="container-x mt-16 pt-6 border-t border-cream/5 flex flex-col md:flex-row justify-between gap-3 text-[10px] font-semibold uppercase tracking-widest text-faint">
        <span>© {new Date().getFullYear()} YOUTHORIA PODCAST — {t("footer.rights")}</span>
        <span>ATHENS · SAMOS · GREECE ✦</span>
      </div>
    </footer>
  );
}