import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useI18n, type Lang, type DictKey } from "@/lib/i18n";

const links: { to: string; key: DictKey }[] = [
  { to: "/", key: "nav.home" },
  { to: "/episodes", key: "nav.episodes" },
  { to: "/atlas", key: "nav.atlas" },
  { to: "/team", key: "nav.team" },
  { to: "/about", key: "nav.about" },
  { to: "/support", key: "nav.support" },
  { to: "/contact", key: "nav.contact" },
];

export function Nav() {
  const { lang, setLang, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 16);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-midnight/85 backdrop-blur-xl border-b border-cream/10"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-turquoise text-lg animate-star inline-block">✦</span>
          <span className="font-display text-2xl leading-none tracking-tight">
            Youthoria
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-7 text-[13px] font-medium text-cream/75">
          {links.slice(1).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative transition-colors hover:text-turquoise"
              activeProps={{ className: "text-turquoise" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {t(l.key)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LangSwitcher lang={lang} onChange={setLang} />
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden size-9 grid place-items-center rounded-full border border-cream/15"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-cream/10 bg-midnight/95 backdrop-blur-xl">
          <div className="container-x flex flex-col py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 text-cream/80 hover:text-turquoise text-sm font-medium border-b border-cream/5 last:border-0"
              >
                {t(l.key)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function LangSwitcher({ lang, onChange }: { lang: Lang; onChange: (l: Lang) => void }) {
  return (
    <div className="flex items-center rounded-full bg-cream/5 border border-cream/10 p-1 text-[11px] font-semibold">
      {(["el", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => onChange(l)}
          className={`px-3 py-1 rounded-full uppercase tracking-wider transition-colors ${
            lang === l ? "bg-turquoise text-midnight" : "text-cream/60 hover:text-cream"
          }`}
          aria-pressed={lang === l}
        >
          {l}
        </button>
      ))}
    </div>
  );
}