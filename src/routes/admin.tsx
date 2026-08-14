import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { LogOut, Trash2, Check, X, Star, Pencil } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getAssetUrl } from "@/lib/assets";
import { useAuth } from "@/lib/useAuth";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Youthoria" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

type Tab = "episodes" | "reviews" | "marquee" | "messages";

function AdminPage() {
  const { user, loading, isAdmin, roleLoading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("episodes");

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  if (loading || (user && roleLoading)) {
    return <div className="pt-32 container-x">Loading…</div>;
  }
  if (!user) return null;
  if (!isAdmin) {
    return (
      <div className="pt-32 pb-24 container-x max-w-md text-center mx-auto">
        <h1 className="font-display text-6xl">403</h1>
        <p className="mt-4 text-ink/70">Access denied. This area is restricted to Youthoria admins.</p>
        <p className="mt-2 text-xs text-ink/40 break-all">Signed in as {user.email}</p>
        <div className="mt-6 flex gap-3 justify-center">
          <button
            onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/auth" }); }}
            className="btn-ghost"
          >
            Sign out
          </button>
          <Link to="/" className="btn-primary">Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <div className="container-x">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="label-eyebrow mb-2">Admin Panel</div>
            <h1 className="font-display text-5xl">Youthoria Studio</h1>
          </div>
          <button
            onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/auth" }); }}
            className="btn-ghost"
          >
            <LogOut className="size-4" /> Sign out
          </button>
        </div>

        <div className="flex gap-2 border-b border-ink/10 mb-8">
          {(["episodes", "reviews", "marquee", "messages"] as Tab[]).map((k) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`px-4 py-3 text-sm font-semibold uppercase tracking-widest transition-colors border-b-2 -mb-px ${
                tab === k ? "border-slate text-slate" : "border-transparent text-ink/50 hover:text-ink"
              }`}
            >
              {k === "episodes" ? "Episodes" : k === "reviews" ? "Reviews" : k === "marquee" ? "Ticker" : "Messages"}
            </button>
          ))}
        </div>

        {tab === "episodes" && <EpisodesTab />}
        {tab === "reviews" && <ReviewsTab />}
        {tab === "marquee" && <MarqueeTab />}
        {tab === "messages" && <MessagesTab />}
      </div>
    </div>
  );
}

/* --------- Contact messages --------- */
function MessagesTab() {
  const qc = useQueryClient();
  const { data = [], isLoading } = useQuery({
    queryKey: ["admin-messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("support_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  async function del(id: string) {
    if (!confirm("Delete this message?")) return;
    const { error } = await supabase.from("support_submissions").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    qc.invalidateQueries({ queryKey: ["admin-messages"] });
  }

  if (isLoading) return <div className="text-ink/60">Loading messages…</div>;

  return (
    <div className="max-w-4xl">
      <h2 className="font-display text-2xl mb-6">Contact messages ({data.length})</h2>
      {data.length === 0 ? (
        <div className="text-ink/50 rounded-2xl border border-ink/10 bg-ink/[0.02] p-6">
          No messages yet.
        </div>
      ) : (
        <div className="grid gap-4">
          {data.map((m: any) => (
            <article key={m.id} className="rounded-2xl border border-ink/10 bg-ink/[0.02] p-5">
              <header className="flex items-start justify-between gap-4 mb-3">
                <div className="min-w-0">
                  <div className="font-medium truncate">{m.name}</div>
                  <div className="text-xs text-ink/60 truncate">
                    <a href={`mailto:${m.email}`} className="hover:text-slate">{m.email}</a>
                    {m.phone && <span> · {m.phone}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <time className="text-[10px] uppercase tracking-widest text-ink/40">
                    {new Date(m.created_at).toLocaleString()}
                  </time>
                  <button onClick={() => del(m.id)} className="text-red-400 hover:text-red-300">
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </header>
              <p className="text-sm text-ink/80 whitespace-pre-wrap">{m.message}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

/* --------- Episodes --------- */
function EpisodesTab() {
  const qc = useQueryClient();
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    image_url: "",
    spotify_url: "",
    google_url: "",
    apple_url: "",
    category: "",
  });
  const [urlError, setUrlError] = useState<string | null>(null);
  const [editing, setEditing] = useState<any | null>(null);
  const { data = [] } = useQuery({
    queryKey: ["admin-episodes"],
    queryFn: async () => {
      const { data, error } = await supabase.from("episodes").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!form.spotify_url.trim() && !form.google_url.trim() && !form.apple_url.trim()) {
      setUrlError("At least one podcast URL is required (Spotify, Google or Apple).");
      toast.error("At least one podcast URL is required");
      return;
    }
    setUrlError(null);
    const { error } = await supabase.from("episodes").insert({
      title: form.title,
      description: form.description || null,
      duration: form.duration,
      image_url: form.image_url || null,
      spotify_url: form.spotify_url.trim() || null,
      google_url: form.google_url.trim() || null,
      apple_url: form.apple_url.trim() || null,
      category: form.category || null,
      sort_order: (data[0]?.sort_order ?? 0) + 1,
    });
    if (error) return toast.error(error.message);
    toast.success("Episode added");
    setForm({ title: "", description: "", duration: "", image_url: "", spotify_url: "", google_url: "", apple_url: "", category: "" });
    qc.invalidateQueries({ queryKey: ["admin-episodes"] });
    qc.invalidateQueries({ queryKey: ["episodes"] });
  }

  async function del(id: string) {
    if (!confirm("Delete this episode?")) return;
    const { error } = await supabase.from("episodes").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    qc.invalidateQueries({ queryKey: ["admin-episodes"] });
    qc.invalidateQueries({ queryKey: ["episodes"] });
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <form onSubmit={add} className="rounded-3xl border border-ink/10 bg-ink/[0.02] p-6 grid gap-4 h-fit">
        <h2 className="font-display text-2xl">New episode</h2>
        <FormField label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
        <FormField label="Short description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} textarea />
        <FormField label="Duration (e.g. 48 MIN)" value={form.duration} onChange={(v) => setForm({ ...form, duration: v })} required />
        <FormField label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} />
        <FormField label="Background image URL" value={form.image_url} onChange={(v) => setForm({ ...form, image_url: v })} />
        <FormField label="Spotify URL" value={form.spotify_url} onChange={(v) => setForm({ ...form, spotify_url: v })} />
        <FormField label="Google Podcasts URL" value={form.google_url} onChange={(v) => setForm({ ...form, google_url: v })} />
        <FormField label="Apple Podcasts URL" value={form.apple_url} onChange={(v) => setForm({ ...form, apple_url: v })} />
        {urlError && (
          <p role="alert" className="text-xs text-red-400 -mt-1">{urlError}</p>
        )}
        <button className="btn-primary justify-center">Add episode</button>
      </form>
      <div className="grid gap-3">
        <h2 className="font-display text-2xl">Existing ({data.length})</h2>
        {data.map((e: any) => (
          <div key={e.id} className="flex items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-ink/[0.02] p-4">
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-widest text-slate">{e.category ?? "—"} · {e.duration}</div>
              <div className="font-medium truncate">{e.title}</div>
              {e.description && <p className="text-xs text-ink/50 line-clamp-2">{e.description}</p>}
              <div className="text-xs text-ink/40 flex flex-wrap gap-x-3">
                {[["Spotify", e.spotify_url], ["Google", e.google_url], ["Apple", e.apple_url]].map(([label, url]: any) =>
                  url ? (
                    <a key={label} href={url} target="_blank" rel="noreferrer" className="hover:text-slate">{label}</a>
                  ) : (
                    <span key={label} className="opacity-40 line-through">{label}</span>
                  )
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => setEditing(e)} aria-label="Edit episode" className="p-2 rounded-full bg-slate/15 text-slate hover:bg-slate/25"><Pencil className="size-4" /></button>
              <button onClick={() => del(e.id)} aria-label="Delete episode" className="text-red-400 hover:text-red-300 p-2"><Trash2 className="size-4" /></button>
            </div>
          </div>
        ))}
      </div>
      {editing && <EpisodeEditor episode={editing} onClose={() => setEditing(null)} />}
    </div>
  );
}

function EpisodeEditor({ episode, onClose }: { episode: any; onClose: () => void }) {
  const qc = useQueryClient();
  const [f, setF] = useState({
    title: episode.title ?? "",
    description: episode.description ?? "",
    duration: episode.duration ?? "",
    category: episode.category ?? "",
    image_url: episode.image_url ?? "",
    spotify_url: episode.spotify_url ?? "",
    google_url: episode.google_url ?? "",
    apple_url: episode.apple_url ?? "",
    sort_order: String(episode.sort_order ?? 0),
  });
  const [saving, setSaving] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(null);

  async function save(ev: React.FormEvent) {
    ev.preventDefault();
    if (!f.spotify_url.trim() && !f.google_url.trim() && !f.apple_url.trim()) {
      setUrlError("At least one podcast URL is required (Spotify, Google or Apple).");
      return;
    }
    setUrlError(null);
    setSaving(true);
    const { error } = await supabase
      .from("episodes")
      .update({
        title: f.title,
        description: f.description.trim() || null,
        duration: f.duration,
        category: f.category.trim() || null,
        image_url: f.image_url.trim() || null,
        spotify_url: f.spotify_url.trim() || null,
        google_url: f.google_url.trim() || null,
        apple_url: f.apple_url.trim() || null,
        sort_order: Number(f.sort_order) || 0,
      })
      .eq("id", episode.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Episode updated");
    qc.invalidateQueries({ queryKey: ["admin-episodes"] });
    qc.invalidateQueries({ queryKey: ["episodes"] });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-ink/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Edit ${episode.title}`}
      onClick={onClose}
    >
      <form
        onSubmit={save}
        onClick={(ev) => ev.stopPropagation()}
        className="mx-auto my-8 grid w-full max-w-lg gap-4 rounded-3xl border border-ink/10 bg-sand p-6 shadow-[var(--shadow-lift)]"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-display text-2xl">Edit episode</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="grid size-9 place-items-center rounded-full bg-ink/5 text-ink/60 hover:text-ink">
            <X className="size-4" />
          </button>
        </div>
        {f.image_url && (
          <img
            src={getAssetUrl(f.image_url)}
            alt=""
            className="h-32 w-full rounded-2xl border border-ink/10 object-cover"
            onError={(ev) => { (ev.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
        )}
        <FormField label="Title" value={f.title} onChange={(v) => setF({ ...f, title: v })} required />
        <FormField label="Short description" value={f.description} onChange={(v) => setF({ ...f, description: v })} textarea />
        <FormField label="Duration (e.g. 48 MIN)" value={f.duration} onChange={(v) => setF({ ...f, duration: v })} required />
        <FormField label="Category" value={f.category} onChange={(v) => setF({ ...f, category: v })} />
        <FormField label="Image URL (/images/... or https://...)" value={f.image_url} onChange={(v) => setF({ ...f, image_url: v })} />
        <FormField label="Spotify URL" value={f.spotify_url} onChange={(v) => setF({ ...f, spotify_url: v })} />
        <FormField label="Google Podcasts URL" value={f.google_url} onChange={(v) => setF({ ...f, google_url: v })} />
        <FormField label="Apple Podcasts URL" value={f.apple_url} onChange={(v) => setF({ ...f, apple_url: v })} />
        <FormField label="Sort order" value={f.sort_order} onChange={(v) => setF({ ...f, sort_order: v })} />
        {urlError && <p role="alert" className="-mt-1 text-xs text-red-400">{urlError}</p>}
        <div className="flex gap-3">
          <button disabled={saving} className="btn-primary justify-center flex-1 disabled:opacity-50">{saving ? "Saving…" : "Save changes"}</button>
          <button type="button" onClick={onClose} className="btn-ghost justify-center">Cancel</button>
        </div>
      </form>
    </div>
  );
}

/* --------- Reviews --------- */
function ReviewsTab() {
  const qc = useQueryClient();
  const [filter, setFilter] = useState<"pending" | "approved" | "rejected">("pending");
  const { data = [], isLoading } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: async () => {
      const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  async function setStatus(id: string, status: "approved" | "rejected") {
    const { error } = await supabase.from("reviews").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(status === "approved" ? "Approved" : "Rejected");
    qc.invalidateQueries({ queryKey: ["admin-reviews"] });
    qc.invalidateQueries({ queryKey: ["reviews"] });
  }

  async function del(id: string) {
    if (!confirm("Delete this review?")) return;
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    qc.invalidateQueries({ queryKey: ["admin-reviews"] });
    qc.invalidateQueries({ queryKey: ["reviews"] });
  }

  const rows = data.filter((r: any) => r.status === filter);

  if (isLoading) return <div className="text-ink/60">Loading reviews…</div>;

  return (
    <div className="max-w-4xl">
      <div className="flex flex-wrap gap-2 mb-6">
        {(["pending", "approved", "rejected"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${
              filter === s ? "bg-slate text-sand" : "bg-ink/5 text-ink/60 hover:text-ink"
            }`}
          >
            {s} ({data.filter((r: any) => r.status === s).length})
          </button>
        ))}
      </div>

      {rows.length === 0 ? (
        <div className="text-ink/50 rounded-2xl border border-ink/10 bg-ink/[0.02] p-6">
          No {filter} reviews.
        </div>
      ) : (
        <div className="grid gap-4">
          {rows.map((r: any) => (
            <article key={r.id} className="rounded-2xl border border-ink/10 bg-ink/[0.02] p-5">
              <header className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div className="min-w-0">
                  <div className="font-medium truncate">{r.first_name} {r.last_name}</div>
                  <div className="flex items-center gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`size-3.5 ${i < r.rating ? "fill-slate text-slate" : "text-ink/25"}`} />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <time className="text-[10px] uppercase tracking-widest text-ink/40">
                    {new Date(r.created_at).toLocaleDateString()}
                  </time>
                  {r.status !== "approved" && (
                    <button onClick={() => setStatus(r.id, "approved")} className="p-2 rounded-full bg-slate/15 text-slate hover:bg-slate/25" aria-label="Approve">
                      <Check className="size-4" />
                    </button>
                  )}
                  {r.status !== "rejected" && (
                    <button onClick={() => setStatus(r.id, "rejected")} className="p-2 rounded-full bg-ink/5 text-ink/60 hover:text-ink" aria-label="Reject">
                      <X className="size-4" />
                    </button>
                  )}
                  <button onClick={() => del(r.id)} className="text-red-400 hover:text-red-300 p-2" aria-label="Delete">
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </header>
              <p className="text-sm text-ink/80 whitespace-pre-wrap">{r.description}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

/* --------- Marquee --------- */
function MarqueeTab() {
  const qc = useQueryClient();
  const [newText, setNewText] = useState("");
  const { data = [] } = useQuery({
    queryKey: ["admin-marquee"],
    queryFn: async () => {
      const { data, error } = await supabase.from("marquee_text").select("*").order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!newText.trim()) return;
    const nextOrder = (data[data.length - 1]?.sort_order ?? 0) + 1;
    const { error } = await supabase.from("marquee_text").insert({ text_content: newText.trim(), sort_order: nextOrder });
    if (error) return toast.error(error.message);
    toast.success("Added");
    setNewText("");
    qc.invalidateQueries({ queryKey: ["admin-marquee"] });
    qc.invalidateQueries({ queryKey: ["marquee"] });
  }

  async function update(id: string, text: string) {
    const { error } = await supabase.from("marquee_text").update({ text_content: text, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["admin-marquee"] });
    qc.invalidateQueries({ queryKey: ["marquee"] });
  }

  async function del(id: string) {
    if (!confirm("Delete?")) return;
    const { error } = await supabase.from("marquee_text").delete().eq("id", id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["admin-marquee"] });
    qc.invalidateQueries({ queryKey: ["marquee"] });
  }

  return (
    <div className="max-w-2xl">
      <form onSubmit={add} className="rounded-3xl border border-ink/10 bg-ink/[0.02] p-6 grid gap-4 mb-8">
        <h2 className="font-display text-2xl">Add ticker line</h2>
        <input className="input" placeholder="e.g. Follow us @youthoria.podcast" value={newText} onChange={(e) => setNewText(e.target.value)} />
        <button className="btn-primary justify-center">Add</button>
      </form>

      <h2 className="font-display text-2xl mb-4">Current ticker</h2>
      <div className="grid gap-3">
        {data.map((m: any) => (
          <MarqueeRow key={m.id} row={m} onSave={update} onDelete={del} />
        ))}
      </div>
    </div>
  );
}

function MarqueeRow({ row, onSave, onDelete }: { row: any; onSave: (id: string, t: string) => void; onDelete: (id: string) => void }) {
  const [text, setText] = useState(row.text_content);
  const dirty = text !== row.text_content;
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-ink/10 bg-ink/[0.02] p-3">
      <input className="input flex-1" value={text} onChange={(e) => setText(e.target.value)} />
      <button
        disabled={!dirty}
        onClick={() => onSave(row.id, text)}
        className="px-4 py-2 rounded-full bg-slate text-sand text-xs font-bold uppercase tracking-widest disabled:opacity-40"
      >
        Save
      </button>
      <button onClick={() => onDelete(row.id)} className="text-red-400 hover:text-red-300 p-2"><Trash2 className="size-4" /></button>
    </div>
  );
}

function FormField({ label, value, onChange, required, textarea }: { label: string; value: string; onChange: (v: string) => void; required?: boolean; textarea?: boolean }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-bold uppercase tracking-[0.24em] text-ink/60 mb-2">{label}</span>
      {textarea ? (
        <textarea className="input min-h-24 resize-y" value={value} onChange={(e) => onChange(e.target.value)} required={required} />
      ) : (
        <input className="input" value={value} onChange={(e) => onChange(e.target.value)} required={required} />
      )}
    </label>
  );
}