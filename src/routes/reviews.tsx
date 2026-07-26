import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Star, X } from "lucide-react";
import { z } from "zod";
import { useI18n } from "@/lib/i18n";
import { StarField } from "@/components/site/StarField";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — What People Think About Youthoria" },
      { name: "description", content: "Read listener reviews of the Youthoria podcast and share your own experience." },
      { property: "og:title", content: "Youthoria Reviews" },
      { property: "og:description", content: "Read listener reviews of the Youthoria podcast and share your own experience." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReviewsPage,
});

const reviewSchema = z.object({
  first_name: z.string().trim().min(1, "First name is required").max(60),
  last_name: z.string().trim().min(1, "Last name is required").max(60),
  rating: z.number().int().min(1).max(5),
  description: z.string().trim().min(1, "Please write a few words").max(1000),
});

function ReviewsPage() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("id, first_name, last_name, rating, description, created_at")
        .eq("status", "approved")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="pt-32 pb-24">
      <section className="relative">
        <StarField />
        <div className="container-x relative">
          <button onClick={() => setOpen(true)} className="btn-primary">
            <Star className="size-4" /> {t("reviews.add")}
          </button>
          <h1 className="mt-8 font-display text-4xl sm:text-5xl md:text-7xl leading-tight text-balance">
            {t("reviews.heading")}
          </h1>
        </div>
      </section>

      <section className="container-x mt-12">
        {isLoading ? (
          <div className="text-cream/60">Loading…</div>
        ) : reviews.length === 0 ? (
          <div className="rounded-2xl border border-cream/10 bg-cream/[0.02] p-6 text-cream/60 text-sm">
            {t("reviews.empty")}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r: any) => (
              <article key={r.id} className="rounded-3xl border border-cream/10 bg-cream/[0.02] p-6 flex flex-col gap-3">
                <Stars value={r.rating} />
                <p className="text-sm text-cream/80 leading-relaxed whitespace-pre-wrap flex-1">{r.description}</p>
                <footer className="pt-2 border-t border-cream/10">
                  <div className="font-medium text-sm">{r.first_name} {r.last_name}</div>
                  <time className="text-[10px] uppercase tracking-widest text-cream/40">
                    {new Date(r.created_at).toLocaleDateString()}
                  </time>
                </footer>
              </article>
            ))}
          </div>
        )}
      </section>

      {open && <ReviewModal onClose={() => setOpen(false)} />}
    </div>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`size-4 ${i < value ? "fill-turquoise text-turquoise" : "text-cream/25"}`} />
      ))}
    </div>
  );
}

function ReviewModal({ onClose }: { onClose: () => void }) {
  const qc = useQueryClient();
  const { t } = useI18n();
  const [form, setForm] = useState({ first_name: "", last_name: "", description: "" });
  const [rating, setRating] = useState(5);
  const [consent, setConsent] = useState(false);
  const [saving, setSaving] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) return toast.error(t("consent.required"));
    const parsed = reviewSchema.safeParse({ ...form, rating });
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setSaving(true);
    const { error } = await supabase.from("reviews").insert({ ...parsed.data, status: "pending" });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Thanks! Your review was submitted for approval.");
    qc.invalidateQueries({ queryKey: ["reviews"] });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-midnight/80 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-3xl border border-cream/10 bg-midnight p-6 sm:p-8 grid gap-4 my-8"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-display text-3xl">Add a Review</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="text-cream/60 hover:text-cream">
            <X className="size-5" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="First name" value={form.first_name} onChange={(v) => setForm({ ...form, first_name: v })} />
          <Field label="Last name" value={form.last_name} onChange={(v) => setForm({ ...form, last_name: v })} />
        </div>

        <div>
          <span className="block text-[11px] font-bold uppercase tracking-[0.24em] text-cream/60 mb-2">Rating</span>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} stars`}>
                <Star className={`size-7 transition-transform hover:scale-110 ${n <= rating ? "fill-turquoise text-turquoise" : "text-cream/25"}`} />
              </button>
            ))}
          </div>
        </div>

        <label className="block">
          <span className="block text-[11px] font-bold uppercase tracking-[0.24em] text-cream/60 mb-2">Your review</span>
          <textarea
            rows={5}
            maxLength={1000}
            className="input resize-none"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </label>

        <label className="flex items-start gap-3 text-xs text-cream/60 leading-relaxed">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 size-4 shrink-0 accent-turquoise"
          />
          <span>
            {t("consent.review.pre")}
            <Link to="/privacy-policy" className="text-turquoise underline underline-offset-2">
              {t("consent.link")}
            </Link>
            {t("consent.period")}
          </span>
        </label>

        <button disabled={saving} className="btn-primary justify-center disabled:opacity-50">
          {saving ? "Submitting…" : "Submit review"}
        </button>
        <p className="text-xs text-cream/45 text-center">Reviews appear after approval by our team.</p>
      </form>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-bold uppercase tracking-[0.24em] text-cream/60 mb-2">{label}</span>
      <input className="input" value={value} maxLength={60} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}