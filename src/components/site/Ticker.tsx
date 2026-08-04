import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { getSupabase } from "@/lib/supabase-lazy";

async function fetchMarquee() {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from("marquee_text")
    .select("id,text_content,sort_order")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export function Ticker() {
  const ref = useRef<HTMLDivElement>(null);
  // The marquee is below the fold on every page. Keep the Supabase chunk (and its
  // parse cost) off the critical path until the strip is actually near the viewport.
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const { data } = useQuery({
    queryKey: ["marquee"],
    queryFn: fetchMarquee,
    enabled: active,
    staleTime: 5 * 60_000,
    gcTime: 30 * 60_000,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const texts = data && data.length ? data.map((d) => d.text_content) : ["Check new episodes on Spotify"];
  const items = [...texts, ...texts, ...texts];

  return (
    <div ref={ref} className="border-y border-ink/10 bg-stone/40 py-3.5 overflow-hidden cv-auto">
      <div className={`flex whitespace-nowrap gap-12 w-max ${active ? "animate-ticker" : ""}`}>
        {items.map((text, i) => (
          <span
            key={i}
            className="text-xs font-bold uppercase tracking-[0.22em] text-mist inline-flex items-center gap-3"
          >
            <span className="text-slate/70">✦</span> {text}
          </span>
        ))}
      </div>
    </div>
  );
}
