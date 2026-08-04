import { Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Heart } from "lucide-react";
import { useI18n, type Lang, type DictKey } from "@/lib/i18n";
import { SOCIALS } from "@/lib/socials";
import { getAssetUrl } from "@/lib/assets";

const links: { to: string; key: DictKey }[] = [
  { to: "/", key: "nav.home" },
  { to: "/episodes", key: "nav.episodes" },
  { to: "/reviews", key: "nav.reviews" },
  { to: "/team", key: "nav.team" },
  { to: "/about", key: "nav.about" },
  { to: "/contact", key: "nav.contact" },
];

export function Nav() {
  const { lang, setLang, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const goHome = (e: React.MouseEvent) => {
    if (router.state.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0 });
    }
    setOpen(false);
  };

  useEffect(() => {
    // rAF-throttled so fast mobile scrolls don't fire a React update per event.
    let frame = 0;
    const apply = () => {
      frame = 0;
      setScrolled(window.scrollY > 16);
    };
    const on = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      window.removeEventListener("scroll", on);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-700 ${
        scrolled
          ? "bg-sand/95 md:bg-sand/70 md:backdrop-blur-xl border-b border-ink/10 shadow-[0_10px_40px_-30px_rgba(44,55,66,0.6)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div
        className={`container-x grid grid-cols-[minmax(0,1fr)_auto] items-center transition-all duration-700 ${
          scrolled ? "h-16 md:h-20" : "h-20 md:h-28"
        }`}
      >
        <Link
          to="/"
          onClick={goHome}
          className="flex min-w-0 items-center gap-2 group"
          aria-label="Youthoria"
        >
          <img
            src={getAssetUrl("/images/brand/youthoria-script-slate-300.webp")}
            srcSet={`${getAssetUrl("/images/brand/youthoria-script-slate-300.webp")} 300w, ${getAssetUrl("/images/brand/youthoria-script-slate-600.webp")} 600w`}
            sizes="(max-width: 768px) 120px, 200px"
            alt="Youthoria"
            width={300}
            height={144}
            decoding="async"
            fetchPriority="high"
            className={`w-auto object-contain transition-all duration-700 group-hover:opacity-80 ${
              scrolled ? "h-9 md:h-11" : "h-11 md:h-14"
            }`}
          />
        </Link>

        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden lg:flex items-center gap-8 text-[13px] font-medium text-ink/65">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={l.to === "/" ? goHome : undefined}
                className="relative py-1 transition-colors duration-300 hover:text-ink after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-slate after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
                activeProps={{ className: "text-ink after:scale-x-100" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {t(l.key)}
              </Link>
            ))}
          </div>

          <a
            href={SOCIALS.donate}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex shrink-0 items-center gap-1.5 rounded-full bg-slate text-sand px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.14em] transition-all duration-300 hover:bg-ink hover:-translate-y-0.5"
          >
            <Heart className="size-3.5" /> {t("support.donate")}
          </a>
          <LangSwitcher lang={lang} onChange={setLang} />
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden size-10 shrink-0 grid place-items-center rounded-full border border-ink/15 bg-white/40 text-ink transition-colors hover:bg-white/70"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-ink/10 bg-sand animate-fade-up">
          <div className="container-x flex flex-col py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={(e) => {
                  if (l.to === "/") goHome(e);
                  setOpen(false);
                }}
                className="py-3.5 text-ink/75 hover:text-ink text-sm font-medium border-b border-ink/5 last:border-0 transition-colors"
              >
                {t(l.key)}
              </Link>
            ))}
            <a
              href={SOCIALS.donate}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex justify-center items-center gap-2 rounded-full bg-slate text-sand px-5 py-3.5 text-xs font-medium uppercase tracking-[0.14em]"
            >
              <Heart className="size-4" /> {t("support.donate")}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

function LangSwitcher({ lang, onChange }: { lang: Lang; onChange: (l: Lang) => void }) {
  return (
    <div className="flex shrink-0 items-center rounded-full bg-white/40 border border-ink/10 p-1 text-[11px] font-medium">
      {(["el", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => onChange(l)}
          className={`px-3 py-1 rounded-full uppercase tracking-[0.12em] transition-colors duration-300 ${
            lang === l ? "bg-slate text-sand" : "text-ink/55 hover:text-ink"
          }`}
          aria-pressed={lang === l}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
