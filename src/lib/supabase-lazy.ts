// Loads the Supabase client on demand so the auth/realtime/postgrest code
// never ships in the initial (root layout) bundle.
export async function getSupabase() {
  const mod = await import("@/integrations/supabase/client");
  return mod.supabase;
}
