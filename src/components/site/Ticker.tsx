import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

async function fetchMarquee() {
  const { data, error } = await supabase
    .from("marquee_text")
    .select("id,text_content,sort_order")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export function Ticker() {
  const { data } = useQuery({ queryKey: ["marquee"], queryFn: fetchMarquee });
  const texts = (data && data.length ? data.map((d) => d.text_content) : [
    "Check new episodes on Spotify",
  ]);
  const items = [...texts, ...texts, ...texts];
  return (
    <div className="border-y border-ink/10 bg-stone/40 py-3.5 overflow-hidden">
      <div className="flex whitespace-nowrap animate-ticker gap-12 w-max">
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