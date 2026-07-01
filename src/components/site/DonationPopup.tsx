import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SOCIALS } from "@/lib/socials";

const KEY = "yt-donation-dismissed";

export function DonationPopup() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY)) return;
    } catch {}
    const timer = setTimeout(() => setOpen(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center px-4 pointer-events-none">
      <div
        className="absolute inset-0 bg-midnight/70 backdrop-blur-sm pointer-events-auto animate-fade-up"
        onClick={dismiss}
      />
      <div className="relative pointer-events-auto max-w-md w-full rounded-3xl border border-turquoise/30 bg-midnight p-8 shadow-2xl animate-fade-up">
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-4 right-4 size-8 grid place-items-center rounded-full text-cream/60 hover:text-cream hover:bg-cream/5"
        >
          <X className="size-4" />
        </button>
        <div className="text-turquoise text-3xl mb-4 animate-star inline-block">✦</div>
        <h3 className="font-display text-3xl leading-tight mb-3">{t("popup.title")}</h3>
        <p className="text-cream/70 text-sm leading-relaxed mb-6">{t("popup.body")}</p>
        <div className="flex flex-wrap gap-3">
          <a
            href={SOCIALS.donate}
            target="_blank"
            rel="noreferrer"
            onClick={dismiss}
            className="btn-primary"
          >
            {t("popup.donate")}
          </a>
          <button onClick={dismiss} className="btn-ghost">
            {t("popup.later")}
          </button>
        </div>
      </div>
    </div>
  );
}