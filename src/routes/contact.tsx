import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Send, Instagram, Mail } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { StarField } from "@/components/site/StarField";
import { SOCIALS } from "@/lib/socials";

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M19.6 6.9a5.6 5.6 0 0 1-3.3-1.2 5.5 5.5 0 0 1-2.1-4H11v13.3a2.7 2.7 0 1 1-2.7-2.7c.3 0 .5 0 .8.1V9.2a5.9 5.9 0 1 0 5.1 5.8V9.6a8.3 8.3 0 0 0 5.4 2v-3z" />
    </svg>
  );
}

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Youthoria Podcast" },
      { name: "description", content: "Get in touch with Youthoria Podcast." },
      { property: "og:title", content: "Contact Youthoria" },
      { property: "og:description", content: "Get in touch with Youthoria Podcast." },
    ],
  }),
  component: ContactPage,
});

const inputCls =
  "w-full bg-cream/[0.04] border border-cream/15 rounded-xl px-3.5 py-3 text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-turquoise focus:bg-turquoise/5 transition-colors";

function ContactPage() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  return (
    <div className="pt-32 pb-24">
      <section className="relative">
        <StarField />
        <div className="container-x relative max-w-3xl">
          <div className="label-eyebrow mb-4">{t("contact.eyebrow")}</div>
          <h1 className="font-display text-5xl md:text-7xl leading-tight">{t("contact.title")}</h1>
          <p className="mt-6 text-muted text-lg text-pretty">{t("contact.body")}</p>
        </div>
      </section>

      <section className="container-x mt-16 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="rounded-3xl border border-cream/10 bg-cream/[0.02] p-8 space-y-5"
        >
          <Field label={t("contact.name")}>
            <input required className={inputCls} placeholder="—" />
          </Field>
          <Field label={t("contact.email")}>
            <input required type="email" className={inputCls} placeholder="—" />
          </Field>
          <Field label={t("contact.message")}>
            <textarea required rows={5} className={`${inputCls} resize-none`} placeholder="—" />
          </Field>
          <button type="submit" className="btn-primary">
            <Send className="size-4" /> {t("contact.send")}
          </button>
          {sent && (
            <p className="text-turquoise text-sm">✦ Thank you — we&apos;ll get back to you shortly.</p>
          )}
        </form>

        <aside className="space-y-6 text-sm">
          <div className="rounded-3xl border border-cream/10 p-6 space-y-3">
            <div className="label-eyebrow mb-1">Direct</div>
            <a href={`mailto:${SOCIALS.email}`} className="flex items-center gap-3 text-cream hover:text-turquoise">
              <Mail className="size-4" /> {SOCIALS.email}
            </a>
            <a href={SOCIALS.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-cream hover:text-turquoise">
              <Instagram className="size-4" /> @youthoria.podcast
            </a>
            <a href={SOCIALS.tiktok} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-cream hover:text-turquoise">
              <TikTokIcon className="size-4" /> @youthoria.podcast
            </a>
          </div>
        </aside>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="label-eyebrow block mb-2">{label}</span>
      {children}
    </label>
  );
}