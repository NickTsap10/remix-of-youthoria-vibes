
-- Role system
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Support submissions (write-open, read admin-only)
CREATE TABLE public.support_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.support_submissions TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.support_submissions TO authenticated;
GRANT ALL ON public.support_submissions TO service_role;
ALTER TABLE public.support_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit" ON public.support_submissions
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view submissions" ON public.support_submissions
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete submissions" ON public.support_submissions
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Episodes (public read, admin write)
CREATE TABLE public.episodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  duration TEXT NOT NULL,
  image_url TEXT,
  spotify_url TEXT NOT NULL,
  category TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.episodes TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.episodes TO authenticated;
GRANT ALL ON public.episodes TO service_role;
ALTER TABLE public.episodes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view episodes" ON public.episodes FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can manage episodes" ON public.episodes FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Atlas locations
CREATE TABLE public.atlas_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  map_name TEXT NOT NULL,
  podcast_name TEXT NOT NULL,
  info_text TEXT,
  map_x_percent NUMERIC NOT NULL,
  map_y_percent NUMERIC NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.atlas_locations TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.atlas_locations TO authenticated;
GRANT ALL ON public.atlas_locations TO service_role;
ALTER TABLE public.atlas_locations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view locations" ON public.atlas_locations FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can manage locations" ON public.atlas_locations FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Marquee text
CREATE TABLE public.marquee_text (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text_content TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.marquee_text TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.marquee_text TO authenticated;
GRANT ALL ON public.marquee_text TO service_role;
ALTER TABLE public.marquee_text ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view marquee" ON public.marquee_text FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can manage marquee" ON public.marquee_text FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
