import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { LogOut, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/useAuth";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Youthoria" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

type Tab = "episodes" | "atlas" | "marquee";

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
        <p className="mt-4 text-cream/70">Access denied. This area is restricted to Youthoria admins.</p>
        <p className="mt-2 text-xs text-cream/40 break-all">Signed in as {user.email}</p>
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

        <div className="flex gap-2 border-b border-cream/10 mb-8">
          {(["episodes", "atlas", "marquee"] as Tab[]).map((k) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`px-4 py-3 text-sm font-semibold uppercase tracking-widest transition-colors border-b-2 -mb-px ${
                tab === k ? "border-turquoise text-turquoise" : "border-transparent text-cream/50 hover:text-cream"
              }`}
            >
              {k === "episodes" ? "Episodes" : k === "atlas" ? "Atlas Pins" : "Ticker"}
            </button>
          ))}
        </div>

        {tab === "episodes" && <EpisodesTab />}
        {tab === "atlas" && <AtlasTab />}
        {tab === "marquee" && <MarqueeTab />}
      </div>
    </div>
  );
}

/* --------- Episodes --------- */
function EpisodesTab() {
  const qc = useQueryClient();
  const [form, setForm] = useState({ title: "", duration: "", image_url: "", spotify_url: "", category: "" });
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
    const { error } = await supabase.from("episodes").insert({
      title: form.title,
      duration: form.duration,
      image_url: form.image_url || null,
      spotify_url: form.spotify_url,
      category: form.category || null,
      sort_order: (data[0]?.sort_order ?? 0) + 1,
    });
    if (error) return toast.error(error.message);
    toast.success("Episode added");
    setForm({ title: "", duration: "", image_url: "", spotify_url: "", category: "" });
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
      <form onSubmit={add} className="rounded-3xl border border-cream/10 bg-cream/[0.02] p-6 grid gap-4 h-fit">
        <h2 className="font-display text-2xl">New episode</h2>
        <FormField label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
        <FormField label="Duration (e.g. 48 MIN)" value={form.duration} onChange={(v) => setForm({ ...form, duration: v })} required />
        <FormField label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} />
        <FormField label="Background image URL" value={form.image_url} onChange={(v) => setForm({ ...form, image_url: v })} />
        <FormField label="Spotify URL" value={form.spotify_url} onChange={(v) => setForm({ ...form, spotify_url: v })} required />
        <button className="btn-primary justify-center">Add episode</button>
      </form>
      <div className="grid gap-3">
        <h2 className="font-display text-2xl">Existing ({data.length})</h2>
        {data.map((e: any) => (
          <div key={e.id} className="flex items-center justify-between gap-4 rounded-2xl border border-cream/10 bg-cream/[0.02] p-4">
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-widest text-turquoise">{e.category ?? "—"} · {e.duration}</div>
              <div className="font-medium truncate">{e.title}</div>
              <a className="text-xs text-cream/40 truncate block" href={e.spotify_url} target="_blank" rel="noreferrer">{e.spotify_url}</a>
            </div>
            <button onClick={() => del(e.id)} className="text-red-400 hover:text-red-300 shrink-0"><Trash2 className="size-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------- Atlas --------- */
function AtlasTab() {
  const qc = useQueryClient();
  const [form, setForm] = useState({ map_name: "", podcast_name: "", info_text: "", map_x_percent: "50", map_y_percent: "50" });
  const { data = [] } = useQuery({
    queryKey: ["admin-atlas"],
    queryFn: async () => {
      const { data, error } = await supabase.from("atlas_locations").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  async function add(e: React.FormEvent) {
    e.preventDefault();
    const x = Number(form.map_x_percent);
    const y = Number(form.map_y_percent);
    if (isNaN(x) || isNaN(y) || x < 0 || x > 100 || y < 0 || y > 100) return toast.error("X/Y must be 0–100");
    const { error } = await supabase.from("atlas_locations").insert({
      map_name: form.map_name,
      podcast_name: form.podcast_name,
      info_text: form.info_text || null,
      map_x_percent: x,
      map_y_percent: y,
    });
    if (error) return toast.error(error.message);
    toast.success("Location added");
    setForm({ map_name: "", podcast_name: "", info_text: "", map_x_percent: "50", map_y_percent: "50" });
    qc.invalidateQueries({ queryKey: ["admin-atlas"] });
    qc.invalidateQueries({ queryKey: ["atlas"] });
  }

  async function del(id: string) {
    if (!confirm("Delete this pin?")) return;
    const { error } = await supabase.from("atlas_locations").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    qc.invalidateQueries({ queryKey: ["admin-atlas"] });
    qc.invalidateQueries({ queryKey: ["atlas"] });
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <form onSubmit={add} className="rounded-3xl border border-cream/10 bg-cream/[0.02] p-6 grid gap-4 h-fit">
        <h2 className="font-display text-2xl">New pin</h2>
        <FormField label="Map location name (e.g. Athens)" value={form.map_name} onChange={(v) => setForm({ ...form, map_name: v })} required />
        <FormField label="Podcast / episode name" value={form.podcast_name} onChange={(v) => setForm({ ...form, podcast_name: v })} required />
        <label className="block">
          <span className="block text-[11px] font-bold uppercase tracking-[0.24em] text-cream/60 mb-2">Info text</span>
          <textarea rows={3} className="input resize-none" value={form.info_text} onChange={(e) => setForm({ ...form, info_text: e.target.value })} />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="X % (0–100, left→right)" value={form.map_x_percent} onChange={(v) => setForm({ ...form, map_x_percent: v })} />
          <FormField label="Y % (0–100, top→bottom)" value={form.map_y_percent} onChange={(v) => setForm({ ...form, map_y_percent: v })} />
        </div>
        <button className="btn-primary justify-center">Add pin</button>
      </form>
      <div className="grid gap-3">
        <h2 className="font-display text-2xl">Existing ({data.length})</h2>
        {data.map((l: any) => (
          <div key={l.id} className="flex items-center justify-between gap-4 rounded-2xl border border-cream/10 bg-cream/[0.02] p-4">
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-widest text-turquoise">{l.map_name} · x{l.map_x_percent} y{l.map_y_percent}</div>
              <div className="font-medium truncate">{l.podcast_name}</div>
              {l.info_text && <div className="text-xs text-cream/50 line-clamp-2">{l.info_text}</div>}
            </div>
            <button onClick={() => del(l.id)} className="text-red-400 hover:text-red-300 shrink-0"><Trash2 className="size-4" /></button>
          </div>
        ))}
      </div>
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
      <form onSubmit={add} className="rounded-3xl border border-cream/10 bg-cream/[0.02] p-6 grid gap-4 mb-8">
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
    <div className="flex items-center gap-2 rounded-2xl border border-cream/10 bg-cream/[0.02] p-3">
      <input className="input flex-1" value={text} onChange={(e) => setText(e.target.value)} />
      <button
        disabled={!dirty}
        onClick={() => onSave(row.id, text)}
        className="px-4 py-2 rounded-full bg-turquoise text-midnight text-xs font-bold uppercase tracking-widest disabled:opacity-40"
      >
        Save
      </button>
      <button onClick={() => onDelete(row.id)} className="text-red-400 hover:text-red-300 p-2"><Trash2 className="size-4" /></button>
    </div>
  );
}

function FormField({ label, value, onChange, required }: { label: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-bold uppercase tracking-[0.24em] text-cream/60 mb-2">{label}</span>
      <input className="input" value={value} onChange={(e) => onChange(e.target.value)} required={required} />
    </label>
  );
}