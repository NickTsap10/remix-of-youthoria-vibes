import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { StarField } from "@/components/site/StarField";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Admin Sign In — Youthoria" }, { name: "robots", content: "noindex" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return toast.error(error.message);

      toast.success("Signed in");
      navigate({ to: "/admin" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="pt-32 pb-24 min-h-[80vh]">
      <section className="relative">
        <StarField />
        <div className="container-x relative max-w-md mx-auto">
          <h1 className="font-display text-5xl text-center mb-2">Admin Access</h1>
          <p className="text-center text-ink/60 mb-8 text-sm">
            Restricted area — only Youthoria team.
          </p>
          <form onSubmit={submit} className="grid gap-4 rounded-3xl border border-ink/10 bg-ink/[0.02] p-8">
            <label className="block">
              <span className="block text-[11px] font-bold uppercase tracking-[0.24em] text-ink/60 mb-2">Email</span>
              <input required type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className="block">
              <span className="block text-[11px] font-bold uppercase tracking-[0.24em] text-ink/60 mb-2">Password</span>
              <input required type="password" minLength={6} className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button disabled={busy} className="mt-2 rounded-full bg-slate text-sand py-3 font-bold uppercase tracking-widest text-sm disabled:opacity-60">
              {busy ? "..." : "Sign In"}
            </button>
            <p className="text-[10px] text-center text-ink/40 mt-2 uppercase tracking-widest">
              Private area — registrations are closed.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}