import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { StarField } from "@/components/site/StarField";
import { claimFirstAdmin } from "@/lib/admin-bootstrap.functions";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Admin Sign In — Youthoria" }, { name: "robots", content: "noindex" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/auth" },
        });
        if (error) return toast.error(error.message);
        if (!data.session) {
          return toast.success("Account created — check your email to confirm, then sign in.");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return toast.error(error.message);
      }

      try {
        const res = await claimFirstAdmin();
        if (res.granted) toast.success("Admin access granted to this account.");
      } catch {
        /* an admin already exists or the check failed — ignore */
      }

      toast.success(mode === "signup" ? "Account created" : "Signed in");
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
          <p className="text-center text-cream/60 mb-8 text-sm">
            Restricted area — only Youthoria team.
          </p>
          <div className="mx-auto mb-6 grid w-full max-w-xs grid-cols-2 rounded-full border border-cream/10 p-1 text-xs font-bold uppercase tracking-widest">
            {(["signin", "signup"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`rounded-full py-2 transition-colors ${
                  mode === m ? "bg-turquoise text-midnight" : "text-cream/60 hover:text-cream"
                }`}
              >
                {m === "signin" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>
          <form onSubmit={submit} className="grid gap-4 rounded-3xl border border-cream/10 bg-cream/[0.02] p-8">
            <label className="block">
              <span className="block text-[11px] font-bold uppercase tracking-[0.24em] text-cream/60 mb-2">Email</span>
              <input required type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className="block">
              <span className="block text-[11px] font-bold uppercase tracking-[0.24em] text-cream/60 mb-2">Password</span>
              <input required type="password" minLength={6} className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button disabled={busy} className="mt-2 rounded-full bg-turquoise text-midnight py-3 font-bold uppercase tracking-widest text-sm disabled:opacity-60">
              {busy ? "..." : mode === "signup" ? "Create Account" : "Sign In"}
            </button>
            <p className="text-[10px] text-center text-cream/40 mt-2 uppercase tracking-widest">
              Private area — the first registered account becomes admin.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}