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
  "nav.reviews": { el: "Κριτικές", en: "Reviews" },
  "nav.team": { el: "Η Ομάδα", en: "The Team" },
  "nav.about": { el: "Σχετικά", en: "About" },
  "nav.support": { el: "Στήριξη", en: "Support" },
  "nav.contact": { el: "Επικοινωνία", en: "Contact" },
  "nav.privacy": { el: "Πολιτική Απορρήτου", en: "Privacy Policy" },
  "nav.terms": { el: "Όροι Χρήσης", en: "Terms & Conditions" },
  "footer.legal": { el: "Νομικά", en: "Legal" },

  "legal.updated": { el: "Τελευταία ενημέρωση", en: "Last updated" },
  "legal.date": { el: "Ιούλιος 2026", en: "July 2026" },

  "consent.contact.pre": {
    el: "Υποβάλλοντας αυτή τη φόρμα, συμφωνείτε με την επεξεργασία των προσωπικών σας δεδομένων (όνομα, email, τηλέφωνο) για την απάντηση στο αίτημά σας, σύμφωνα με την ",
    en: "By submitting this form, you agree to the processing of your personal data (name, email, phone number) to respond to your inquiry in accordance with our ",
  },
  "consent.review.pre": {
    el: "Συμφωνώ με την επεξεργασία των δεδομένων μου και παραχωρώ στο Youthoria την άδεια να δημοσιεύσει την αξιολόγησή μου μαζί με το όνομά μου στην ιστοσελίδα, σύμφωνα με την ",
    en: "I agree to the processing of my data and grant Youthoria permission to publish my review alongside my provided name on this website in accordance with the ",
  },
  "consent.link": { el: "Πολιτική Απορρήτου", en: "Privacy Policy" },
  "consent.period": { el: ".", en: "." },
  "consent.required": {
    el: "Πρέπει να αποδεχτείτε την Πολιτική Απορρήτου.",
    en: "You must accept the Privacy Policy.",
  },

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

  "reviews.eyebrow": { el: "Κριτικές", en: "Reviews" },
  "reviews.heading": { el: "Τι λέει ο κόσμος για εμάς", en: "What people think about us" },
  "reviews.body": {
    el: "Διάβασε τι λένε οι ακροατές μας — και μοίρασε τη δική σου εμπειρία.",
    en: "Read what our listeners say — and share your own experience.",
  },
  "reviews.cta": { el: "Δες τις κριτικές", en: "See the reviews" },
  "reviews.add": { el: "Πρόσθεσε κριτική", en: "Add a Review" },
  "reviews.empty": {
    el: "Δεν υπάρχουν ακόμη κριτικές. Γίνε ο πρώτος!",
    en: "No reviews yet. Be the first to share one!",
  },

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

  "episodes.book": { el: "Κλείσε το Podcast σου", en: "Book Your Podcast" },

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
  "footer.listenToUs": { el: "Άκου μας", en: "Listen to Us" },
  "footer.chooseShow": { el: "Διάλεξε εκπομπή", en: "Choose a show" },
  "footer.back": { el: "Πίσω", en: "Back" },
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