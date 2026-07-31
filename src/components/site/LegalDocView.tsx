import { StarField } from "@/components/site/StarField";
import { useI18n } from "@/lib/i18n";
import type { LegalDoc } from "@/lib/legal";

export function LegalDocView({ doc }: { doc: LegalDoc }) {
  const { t } = useI18n();
  return (
    <div className="pt-32 pb-24">
      <section className="relative">
        <StarField />
        <div className="container-x relative max-w-3xl mx-auto">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-tight text-balance">
            {doc.title}
          </h1>
          <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.24em] text-ink/50">
            {t("legal.updated")}: {t("legal.date")}
          </p>
          <p className="mt-8 text-ink/75 leading-relaxed">{doc.intro}</p>

          <div className="mt-10 space-y-10">
            {doc.sections.map((s, i) => (
              <section key={i}>
                {s.heading && (
                  <h2 className="font-display text-2xl md:text-3xl mb-3">{s.heading}</h2>
                )}
                {s.paragraphs?.map((p, j) => (
                  <p key={j} className="text-ink/75 leading-relaxed mb-3">
                    {p}
                  </p>
                ))}
                {s.bullets && (
                  <ul className="mt-2 space-y-2 list-disc pl-5 text-ink/75 leading-relaxed">
                    {s.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}