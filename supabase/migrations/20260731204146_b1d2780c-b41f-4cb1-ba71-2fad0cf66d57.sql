-- 1) Reviews: server-controlled status via trigger + input validation
CREATE OR REPLACE FUNCTION public.force_review_pending()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.status := 'pending';
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS reviews_force_pending ON public.reviews;
CREATE TRIGGER reviews_force_pending
  BEFORE INSERT ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.force_review_pending();

ALTER TABLE public.reviews
  DROP CONSTRAINT IF EXISTS reviews_rating_range,
  DROP CONSTRAINT IF EXISTS reviews_first_name_len,
  DROP CONSTRAINT IF EXISTS reviews_last_name_len,
  DROP CONSTRAINT IF EXISTS reviews_description_len,
  DROP CONSTRAINT IF EXISTS reviews_status_allowed;

ALTER TABLE public.reviews
  ADD CONSTRAINT reviews_rating_range CHECK (rating BETWEEN 1 AND 5),
  ADD CONSTRAINT reviews_first_name_len CHECK (char_length(btrim(first_name)) BETWEEN 1 AND 60),
  ADD CONSTRAINT reviews_last_name_len CHECK (char_length(btrim(last_name)) BETWEEN 1 AND 60),
  ADD CONSTRAINT reviews_description_len CHECK (char_length(btrim(description)) BETWEEN 1 AND 1000),
  ADD CONSTRAINT reviews_status_allowed CHECK (status IN ('pending', 'approved', 'rejected'));

-- 2) Support submissions: replace permissive insert policy with validated one
DROP POLICY IF EXISTS "Anyone can submit" ON public.support_submissions;
CREATE POLICY "Anyone can submit a validated message"
  ON public.support_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(btrim(name)) BETWEEN 1 AND 120
    AND char_length(email) BETWEEN 5 AND 255
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND (phone IS NULL OR char_length(btrim(phone)) <= 40)
    AND char_length(btrim(message)) BETWEEN 1 AND 2000
  );

-- 3) Harden SECURITY DEFINER helper and remove direct API executability
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
      AND _user_id = auth.uid()
  )
$$;

REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.force_review_pending() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO service_role;
