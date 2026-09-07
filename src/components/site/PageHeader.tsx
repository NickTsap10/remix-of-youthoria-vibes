import type { ReactNode } from "react";
import { StarField } from "@/components/site/StarField";

/**
 * Shared editorial page masthead: eyebrow, oversized display title,
 * optional lede and an action slot. Keeps every inner page in the same
 * typographic system as the homepage hero.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  action,
  index,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  action?: ReactNode;
  index?: string;
}) {
  return (
    <section className="relative">
      <StarField />
      <div className="container-x relative">
        <div className="flex items-center justify-between gap-4">
          <div className="label-eyebrow">{eyebrow}</div>
          {index ? (
            <div className="hidden text-[10px] font-medium uppercase tracking-[0.3em] text-mist/70 sm:block">
              {index}
            </div>
          ) : null}
        </div>

        <h1 className="mt-5 max-w-4xl font-display text-[13vw] leading-[0.92] tracking-[-0.02em] text-balance text-ink sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          {title}
        </h1>

        {(lede || action) && (
          <div className="mt-8 flex flex-col gap-8 border-t border-ink/10 pt-8 md:flex-row md:items-end md:justify-between">
            {lede ? (
              <p className="max-w-[52ch] text-base leading-relaxed text-pretty text-ink/65 md:text-lg">{lede}</p>
            ) : (
              <span />
            )}
            {action}
          </div>
        )}
      </div>
    </section>
  );
}
