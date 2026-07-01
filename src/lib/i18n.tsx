import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "el" | "en";

type Dict = Record<string, { el: string; en: string }>;

export const dict = {
  "nav.home": { el: "Αρχική", en: "Home" },
  "nav.episodes": { el: "Επεισόδια", en: "Episodes" },
  "nav.atlas": { el: "Άτλας", en: "Atlas" },
  "nav.team": { el: "Η Ομάδα", en: "The Team" },
  "nav.about": { el: "Σχετικά", en: "About" },
  "nav.support": { el: "Στήριξη", en: "Support" },
  "nav.contact": { el: "Επικοινωνία", en: "Contact" },

  "hero.title": {
    el: "Ενισχύουμε τη φωνή μιας γενιάς.",
    en: "Amplifying the heartbeat of a generation.",
  },
  "hero.subtitle": {
    el: "Από Νέους, Για Νέους.",
    en: "From Young People, For Young People.",
  },
  "hero.cta.spotify": { el: "Άκου στο Spotify", en: "Listen on Spotify" },
  "hero.cta.latest": { el: "Τελευταίο Επεισόδιο", en: "Latest Episode" },
  "hero.cta.support": { el: "Στήριξέ μας", en: "Support Us" },

  "episodes.eyebrow": { el: "Συχνότητα", en: "Frequency" },
  "episodes.title": { el: "Πρόσφατες Εκπομπές", en: "Recent Broadcasts" },
  "episodes.subtitle": {
    el: "Συζητήσεις που ερευνούν τη διασταύρωση κουλτούρας, τεχνολογίας και ταυτότητας.",
    en: "Exploring the intersections of culture, technology and identity.",
  },
  "episodes.viewAll": { el: "Δες όλα τα επεισόδια", en: "View all episodes" },
  "episodes.play": { el: "Άκου Τώρα", en: "Play Now" },
  "episodes.readMore": { el: "Διάβασε Περισσότερα", en: "Read More" },
  "episodes.min": { el: "λεπτά", en: "min" },

  "about.eyebrow": { el: "Ποιοι είμαστε", en: "Who we are" },
  "about.title": {
    el: "Ξαναγράφουμε τον διάλογο μιας νέας εποχής.",
    en: "Redefining the dialogue for a new era.",
  },
  "about.body": {
    el: "Πιστεύουμε ότι οι πιο δυνατές ιστορίες προέρχονται από όσους τις ζουν. Το Youthoria είναι μια πλατφόρμα αφιερωμένη στις αφιλτράριστες φωνές, τις ριζοσπαστικές ιδέες και το δημιουργικό πνεύμα των νέων.",
    en: "We believe the most powerful stories come from those living them. Youthoria is a platform dedicated to the unfiltered voices, radical ideas, and creative spirit of the youth.",
  },
  "about.vision": { el: "Το Όραμά μας", en: "Our Vision" },
  "about.mission": { el: "Η Αποστολή μας", en: "Our Mission" },
  "about.values": { el: "Οι Αξίες μας", en: "Our Values" },

  "values.youth": { el: "Νεολαία", en: "Youth" },
  "values.society": { el: "Κοινωνία", en: "Society" },
  "values.ideas": { el: "Ιδέες", en: "Ideas" },
  "values.culture": { el: "Κουλτούρα", en: "Culture" },
  "values.dreams": { el: "Όνειρα", en: "Dreams" },
  "values.participation": { el: "Συμμετοχή", en: "Participation" },

  "atlas.eyebrow": { el: "Ο Χάρτης μας", en: "Our Map" },
  "atlas.title": { el: "Youthoria Atlas", en: "Youthoria Atlas" },
  "atlas.body": {
    el: "Χαρτογραφούμε ιστορίες σε ολόκληρο το Αιγαίο. Ταξιδεύουμε για να καταγράψουμε τη ζωή των νέων σε κάθε γωνιά της Ελλάδας.",
    en: "Mapping stories across the Aegean. We travel to document the lives of young people in every corner of Greece.",
  },
  "atlas.legend.available": { el: "Διαθέσιμο Επεισόδιο", en: "Episode Available" },
  "atlas.legend.soon": { el: "Έρχεται Σύντομα", en: "Coming Soon" },
  "atlas.explore": { el: "Εξερεύνησε τον Άτλα", en: "Explore the Atlas" },

  "team.eyebrow": { el: "Οι Άνθρωποι", en: "The People" },
  "team.title": { el: "Meet the Youthoria Team", en: "Meet the Youthoria Team" },
  "team.homeTitle": { el: "Meet the Youthoria Team", en: "Meet the Youthoria Team" },

  "support.eyebrow": { el: "Στήριξε Μας", en: "Support Us" },
  "support.title": { el: "Στήριξε το Youthoria.", en: "Support Youthoria." },
  "support.bandTitle": { el: "Στήριξε το Youthoria.", en: "Support Youthoria." },
  "support.body": {
    el: "Η στήριξή σου μας κρατά ανεξάρτητους και καθοδηγούμενους από νέους.",
    en: "Your support keeps us independent and youth-led.",
  },
  "support.donate": { el: "Δωρεά στο Youthoria", en: "Donate to Youthoria" },
  "support.why": { el: "Γιατί να στηρίξεις;", en: "Why support?" },
  "support.reasons.1.t": { el: "Ανεξαρτησία", en: "Independence" },
  "support.reasons.1.b": {
    el: "Χωρίς χορηγούς, χωρίς λογοκρισία. Μόνο πραγματικές συζητήσεις.",
    en: "No sponsors, no censorship. Just real conversations.",
  },
  "support.reasons.2.t": { el: "Ποιότητα", en: "Quality" },
  "support.reasons.2.b": {
    el: "Επενδύουμε στον ήχο και τον εξοπλισμό μας.",
    en: "We invest in our audio and equipment.",
  },
  "support.reasons.3.t": { el: "Κοινότητα", en: "Community" },
  "support.reasons.3.b": {
    el: "Στηρίζεις μια πλατφόρμα από νέους, για νέους.",
    en: "You back a platform by youth, for youth.",
  },

  "contact.eyebrow": { el: "Επικοινωνία", en: "Get in touch" },
  "contact.title": { el: "Πες μας μια ιδέα.", en: "Tell us an idea." },
  "contact.body": {
    el: "Θες να προταθείς ως καλεσμένος, να προτείνεις θέμα ή να συνεργαστούμε; Γράψε μας.",
    en: "Want to pitch as a guest, propose a topic, or collaborate? Drop us a line.",
  },
  "contact.name": { el: "Όνομα", en: "Name" },
  "contact.email": { el: "Email", en: "Email" },
  "contact.message": { el: "Μήνυμα", en: "Message" },
  "contact.send": { el: "Αποστολή", en: "Send" },

  "popup.title": { el: "Στήριξε το Youthoria ✦", en: "Support Youthoria ✦" },
  "popup.body": {
    el: "Ένα ανεξάρτητο podcast από νέους, για νέους. Η στήριξή σου κάνει τη διαφορά.",
    en: "An independent podcast by youth, for youth. Your support makes the difference.",
  },
  "popup.donate": { el: "Θέλω να στηρίξω", en: "I want to support" },
  "popup.later": { el: "Ίσως αργότερα", en: "Maybe later" },

  "ticker.1": { el: "Τσέκαρε τα νέα επεισόδια στο Spotify", en: "Check the new episodes on Spotify" },
  "ticker.2": { el: "Follow us on Instagram & TikTok @youthoria.podcast", en: "Follow us on Instagram & TikTok @youthoria.podcast" },
  "ticker.3": { el: "Email επικοινωνίας info@youthoria.gr", en: "Contact email info@youthoria.gr" },
  "ticker.4": { el: "Στήριξε το Youthoria", en: "Support Youthoria" },
  "ticker.5": { el: "Τσέκαρε τα νέα επεισόδια στο Spotify", en: "Check the new episodes on Spotify" },

  "footer.tagline": {
    el: "Ένα ανεξάρτητο podcast από νέους, για νέους στην Ελλάδα.",
    en: "An independent youth-led podcast based in Greece.",
  },
  "footer.listen": { el: "Άκου", en: "Listen" },
  "footer.connect": { el: "Συνδέσου", en: "Connect" },
  "footer.explore": { el: "Εξερεύνηση", en: "Explore" },
  "footer.rights": { el: "Όλα τα δικαιώματα διατηρούνται.", en: "All rights reserved." },
} satisfies Dict;

export type DictKey = keyof typeof dict;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: DictKey) => string };

const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("el");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("yt-lang") as Lang | null;
      if (saved === "el" || saved === "en") setLangState(saved);
    } catch {}
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("yt-lang", l);
    } catch {}
  }, []);

  const t = useCallback((k: DictKey) => dict[k]?.[lang] ?? k, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}