import { createMiddleware } from "@tanstack/react-start";

import { getSupabase } from "./supabase-lazy";

// Project-specific replacement for the generated `attachSupabaseAuth`.
// Identical behaviour (attaches the bearer token to serverFn RPCs) but the
// Supabase client is imported lazily so auth/realtime/postgrest code stays
// out of the initial page bundle.
export const attachSupabaseAuthLazy = createMiddleware({ type: "function" }).client(
  async ({ next }) => {
    const supabase = await getSupabase();
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    return next({ headers: token ? { Authorization: `Bearer ${token}` } : {} });
  },
);
