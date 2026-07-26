ALTER TABLE public.episodes
  ADD COLUMN IF NOT EXISTS google_url text,
  ADD COLUMN IF NOT EXISTS apple_url text;

ALTER TABLE public.episodes ALTER COLUMN spotify_url DROP NOT NULL;
ALTER TABLE public.episodes ALTER COLUMN spotify_url SET DEFAULT NULL;