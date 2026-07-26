import { createFileRoute } from "@tanstack/react-router";
import { LegalDocView } from "@/components/site/LegalDocView";
import { useI18n } from "@/lib/i18n";
import { privacyDoc } from "@/lib/legal";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Youthoria Podcast" },
      {
        name: "description",
        content:
          "How Youthoria collects, uses, and protects your personal data under the EU GDPR.",
      },
      { property: "og:title", content: "Privacy Policy — Youthoria Podcast" },
      {
        property: "og:description",
        content: "How Youthoria collects, uses, and protects your personal data.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { lang } = useI18n();
  return <LegalDocView doc={privacyDoc[lang]} />;
}