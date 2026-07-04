import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useI18n } from "@/lib/i18n";
import { GreeceMap } from "@/components/site/GreeceMap";
import { StarField } from "@/components/site/StarField";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/atlas")({
  head: () => ({
    meta: [
      { title: "Youthoria Atlas — A Map of Greek Youth" },
      { name: "description", content: "Mapping youth stories across the Greek archipelago." },
      { property: "og:title", content: "Youthoria Atlas" },
      { property: "og:description", content: "Mapping youth stories across the Greek archipelago." },
    ],
  }),
  component: AtlasPage,
});

function AtlasPage() {
  const { t } = useI18n();
  const { data: locations = [] } = useQuery({
    queryKey: ["atlas"],
    queryFn: async () => {
      const { data, error } = await supabase.from("atlas_locations").select("*").order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    },
  });
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = locations.find((l: any) => l.id === activeId) ?? locations[0];

  return (
    <div className="pt-32 pb-24">
      <section className="relative">
        <StarField />
        <div className="container-x relative">
          <div className="label-eyebrow mb-4">{t("atlas.eyebrow")}</div>
          <h1 className="font-display text-5xl md:text-7xl leading-tight">
            {t("atlas.title")}
          </h1>
          <p className="mt-6 text-muted max-w-[52ch] text-pretty">{t("atlas.body")}</p>
        </div>
      </section>

      <section className="container-x mt-16 grid lg:grid-cols-[1fr_1.1fr] gap-12 items-start">
        <div className="grid gap-4 order-2 lg:order-1">
          <div className="label-eyebrow">Locations ({locations.length})</div>
          <div className="grid gap-3 max-h-[560px] overflow-y-auto pr-2">
            {locations.map((l: any) => {
              const isActive = active?.id === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => setActiveId(l.id)}
                  className={`text-left rounded-2xl border p-5 transition-all ${
                    isActive
                      ? "border-turquoise/60 bg-turquoise/[0.06]"
                      : "border-cream/10 bg-cream/[0.02] hover:border-cream/25"
                  }`}
                >
                  <div className="text-[10px] uppercase tracking-widest text-turquoise font-bold">{l.map_name}</div>
                  <div className="font-display text-2xl mt-1 leading-tight">{l.podcast_name}</div>
                  {l.info_text && <p className="mt-2 text-sm text-cream/70 leading-relaxed">{l.info_text}</p>}
                </button>
              );
            })}
            {locations.length === 0 && (
              <div className="rounded-2xl border border-cream/10 bg-cream/[0.02] p-6 text-cream/60 text-sm">
                {t("atlas.soon.body")}
              </div>
            )}
          </div>
        </div>
        <div className="order-1 lg:order-2 rounded-3xl border border-cream/10 bg-cream/[0.02] p-6 lg:sticky lg:top-24">
          <GreeceMap
            pins={locations.map((l: any) => ({
              id: l.id,
              name: l.map_name,
              x: Number(l.map_x_percent),
              y: Number(l.map_y_percent),
              active: active?.id === l.id,
              onClick: () => setActiveId(l.id),
            }))}
          />
        </div>
      </section>
    </div>
  );
}