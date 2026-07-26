import { createFileRoute } from "@tanstack/react-router";
import { LegalDocView } from "@/components/site/LegalDocView";
import { useI18n } from "@/lib/i18n";
import { termsDoc } from "@/lib/legal";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Youthoria Podcast" },
      {
        name: "description",
        content:
          "The terms that govern the use of youthoria.gr, its content, and user submissions.",
      },
      { property: "og:title", content: "Terms & Conditions — Youthoria Podcast" },
      {
        property: "og:description",
        content: "Terms governing use of youthoria.gr, its content, and user submissions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  const { lang } = useI18n();
  return <LegalDocView doc={termsDoc[lang]} />;
}