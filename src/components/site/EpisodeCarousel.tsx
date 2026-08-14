import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAssetUrl } from "@/lib/assets";
import { getSupabase } from "@/lib/supabase-lazy";

type Ep = {
  id: string;
  title: string;
  description: string | null;
  duration: string;
  category: string | null;
  image_url: string | null;
};

export function EpisodeCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const { data: episodes = [], isLoading } = useQuery({
    queryKey: ["episodes"],
    staleTime: 60_000,
    retry: 1,
    queryFn: async (): Promise<Ep[]> => {
      const supabase = await getSupabase();
      const { data, error } = await supabase
        .from("episodes")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Ep[];
    },
  });

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft >= el.scrollWidth - el.clientWidth - 4,
    });
  }, []);

  useEffect(() => {
    sync();
  }, [sync, episodes.length]);

  const page = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 620), behavior: "smooth" });
  };

  /* pointer drag (desktop mouse + trackpad) */
  const drag = useRef({ active: false, x: 0, left: 0, moved: false });
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return; // native touch scrolling is smoother
    const el = trackRef.current;
    if (!el) return;
    drag.current = { active: true, x: e.clientX, left: el.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.left - dx;
  };
  const endDrag = () => {
    drag.current.active = false;
  };

  const cards: (Ep | null)[] = isLoading && episodes.length === 0 ? [null, null, null] : episodes;

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={sync}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="ep-track flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:gap-10"
      >
        {cards.map((e, i) =>
          e ? (
            <EpisodeCard key={e.id} ep={e} index={i} onNavigate={() => drag.current.moved} />
          ) : (
            <div key={`sk-${i}`} className="w-[80vw] shrink-0 snap-start sm:w-[52vw] lg:w-[30rem]">
              <div className="aspect-[5/4] animate-pulse bg-ink/[0.06]" />
              <div className="mt-6 h-3 w-24 animate-pulse bg-ink/[0.06]" />
              <div className="mt-4 h-7 w-3/4 animate-pulse bg-ink/[0.06]" />
            </div>
          ),
        )}
        {!isLoading && episodes.length === 0 && (
          <p className="py-16 text-mist">No episodes yet.</p>
        )}
      </div>

      {episodes.length > 1 && (
        <div className="mt-8 flex items-center gap-3">
          <button
            type="button"
            onClick={() => page(-1)}
            disabled={edges.start}
            aria-label="Previous episodes"
            className="grid size-11 place-items-center border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-sand disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => page(1)}
            disabled={edges.end}
            aria-label="Next episodes"
            className="grid size-11 place-items-center border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-sand disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
          >
            <ArrowRight className="size-4" />
          </button>
          <span className="ml-2 text-[10px] font-medium uppercase tracking-[0.28em] text-mist">
            Drag / swipe
          </span>
        </div>
      )}
    </div>
  );
}

function EpisodeCard({ ep, index, onNavigate }: { ep: Ep; index: number; onNavigate: () => boolean }) {
  return (
    <Link
      to="/episodes"
      onClick={(e) => {
        if (onNavigate()) e.preventDefault();
      }}
      className="group w-[80vw] shrink-0 snap-start sm:w-[52vw] lg:w-[30rem]"
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-[#CCC7B7]/60">
        {ep.image_url ? (
          <img
            src={getAssetUrl(ep.image_url)}
            alt={ep.title}
            loading="lazy"
            decoding="async"
            draggable={false}
            referrerPolicy="no-referrer"
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 52vw, 480px"
            className="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-[#F7F5EF]">
            <span className="font-display text-5xl text-slate/40">✦</span>
          </div>
        )}
        <span className="absolute left-0 top-0 bg-[#F7F5EF] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.28em] text-ink">
          EP. {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-6 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.26em] text-mist">
        <span>{ep.duration}</span>
        <span className="h-px w-8 bg-ink/20" />
        <span>{ep.category ?? "Youthoria"}</span>
      </div>

      <h3 className="mt-4 font-display text-3xl leading-[1.05] text-ink transition-colors duration-300 group-hover:text-slate md:text-[2.35rem]">
        {ep.title}
      </h3>

      {ep.description && (
        <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-ink/60 line-clamp-3">
          {ep.description}
        </p>
      )}

      <span className="mt-6 inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-[11px] font-medium uppercase tracking-[0.24em] text-ink transition-colors group-hover:border-slate group-hover:text-slate">
        Listen <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
