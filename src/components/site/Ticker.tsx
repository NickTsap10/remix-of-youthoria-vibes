import { useI18n, type DictKey } from "@/lib/i18n";

const KEYS: DictKey[] = ["ticker.1", "ticker.2", "ticker.3", "ticker.4", "ticker.5"];

export function Ticker() {
  const { t } = useI18n();
  const items = [...KEYS, ...KEYS, ...KEYS];
  return (
    <div className="border-y border-cream/10 bg-midnight/80 backdrop-blur py-3 overflow-hidden">
      <div className="flex whitespace-nowrap animate-ticker gap-12 w-max">
        {items.map((k, i) => (
          <span
            key={i}
            className="text-xs font-bold uppercase tracking-[0.22em] text-cream/50 inline-flex items-center gap-3"
          >
            <span className="text-turquoise">✦</span> {t(k)}
          </span>
        ))}
      </div>
    </div>
  );
}