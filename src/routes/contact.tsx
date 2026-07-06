import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { StarField } from "@/components/site/StarField";
import { useI18n } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Youthoria Podcast" },
      { name: "description", content: "Get in touch with the Youthoria team." },
      { property: "og:title", content: "Contact Youthoria" },
      { property: "og:description", content: "Send us a message." },
    ],
  }),
  component: SupportPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(120),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(255)
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address (e.g. name@example.com)",
    ),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message required").max(2000),
});

function SupportPage() {
  const { lang } = useI18n();
  const isEl = lang === "el";
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const label = (el: string, en: string) => (isEl ? el : en);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setBusy(true);
    const { error } = await supabase.from("support_submissions").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      message: parsed.data.message,
    });
    setBusy(false);
    if (error) {
      console.error("support_submissions insert failed:", error);
      toast.error(
        label(
          `Κάτι πήγε στραβά: ${error.message}`,
          `Something went wrong: ${error.message}`,
        ),
      );
      return;
    }
    toast.success(label("Το μήνυμά σας στάλθηκε!", "Your message has been sent!"));
    setForm({ name: "", email: "", phone: "", message: "" });
  }

  return (
    <div className="pt-32 pb-24">
      <section className="relative">
        <StarField />
        <div className="container-x relative max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cream/15 bg-cream/[0.03] text-[11px] font-semibold uppercase tracking-[0.28em] text-cream/70">
              <span className="size-1.5 rounded-full bg-turquoise animate-pulse" />
              {label("Επικοινωνία", "Get in touch")}
            </div>
            <h1 className="mt-6 font-display text-5xl md:text-7xl leading-[0.95] text-balance">
              {label("Στηρίξτε το Youthoria", "Support Youthoria")}
            </h1>
            <p className="mt-6 text-cream/70 leading-relaxed">
              {label(
                "Στείλτε μας ένα μήνυμα. Θα σας απαντήσουμε σύντομα.",
                "Send us a message and we'll get back to you soon.",
              )}
            </p>
          </div>

          <form onSubmit={onSubmit} className="grid gap-5 rounded-3xl border border-cream/10 bg-cream/[0.02] p-8">
            <Field label={label("Όνομα", "Name")}>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input"
              />
            </Field>
            <Field label="Email">
              <input
                required
                type="email"
                inputMode="email"
                autoComplete="email"
                pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
                title="Please enter a valid email address (e.g. name@example.com)"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input"
              />
            </Field>
            <Field label={label("Τηλέφωνο (προαιρετικό)", "Phone (optional)")}>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="input"
              />
            </Field>
            <Field label={label("Μήνυμα", "Message")}>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="input resize-none"
              />
            </Field>
            <button
              type="submit"
              disabled={busy}
              className="mt-2 inline-flex justify-center items-center gap-2 rounded-full bg-turquoise text-midnight px-8 py-4 text-sm font-bold uppercase tracking-widest disabled:opacity-60 hover:-translate-y-0.5 transition-transform"
            >
              {busy ? label("Αποστολή...", "Sending...") : label("Αποστολή", "Send")}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-bold uppercase tracking-[0.24em] text-cream/60 mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}