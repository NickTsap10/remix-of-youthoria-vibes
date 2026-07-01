import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Send, Instagram, Mail } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { StarField } from "@/components/site/StarField";

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
          <div className="rounded-3xl border border-cream/10 p-6">
            <div className="label-eyebrow mb-3">Direct</div>
            <a href="mailto:hello@youthoria.gr" className="flex items-center gap-3 text-cream hover:text-turquoise">
              <Mail className="size-4" /> hello@youthoria.gr
            </a>
            <a href="#" className="mt-3 flex items-center gap-3 text-cream hover:text-turquoise">
              <Instagram className="size-4" /> @youthoriapodcast
            </a>
          </div>
          <div className="rounded-3xl border border-cream/10 p-6">
            <div className="label-eyebrow mb-3">Studio</div>
            <p className="text-cream/70">Athens · Samos<br />Greece ✦</p>
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