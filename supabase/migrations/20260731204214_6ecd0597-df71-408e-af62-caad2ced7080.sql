-- RLS policies calling has_role are evaluated with the caller's privileges,
-- so authenticated needs EXECUTE. The function is hardened to only answer for auth.uid().
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
