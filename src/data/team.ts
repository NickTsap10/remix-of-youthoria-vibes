export type Member = {
  name: string;
  role: { el: string; en: string };
  bio: { el: string; en: string };
  email: string;
  socials: { label: string; url: string }[];
};

export const team: Member[] = [
  {
    name: "Αλέξανδρος Μ.",
    role: { el: "Ιδρυτής & Παρουσιαστής", en: "Founder & Host" },
    bio: {
      el: "Δημοσιογράφος και φοιτητής πολιτικών επιστημών. Το μικρόφωνο είναι η δική του γεωγραφία.",
      en: "Journalist and political science student. The microphone is his geography.",
    },
    email: "alex@youthoria.gr",
    socials: [
      { label: "Instagram", url: "#" },
      { label: "LinkedIn", url: "#" },
    ],
  },
  {
    name: "Ελένη Σ.",
    role: { el: "Παραγωγός Ήχου", en: "Audio Producer" },
    bio: {
      el: "Ηχολήπτρια με πάθος για την αφήγηση. Δουλεύει σε στούντιο και στην ύπαιθρο.",
      en: "Sound engineer with a passion for storytelling. Works in studio and out in the field.",
    },
    email: "eleni@youthoria.gr",
    socials: [{ label: "Instagram", url: "#" }],
  },
  {
    name: "Νίκος Κ.",
    role: { el: "Επικεφαλής Έρευνας", en: "Head of Research" },
    bio: {
      el: "Ερευνητής κοινωνικών επιστημών. Ψάχνει τα ερωτήματα πριν από τις απαντήσεις.",
      en: "Social sciences researcher. Finds the questions before the answers.",
    },
    email: "nikos@youthoria.gr",
    socials: [{ label: "LinkedIn", url: "#" }],
  },
  {
    name: "Μαρία Λ.",
    role: { el: "Δημιουργική Διευθύντρια", en: "Creative Lead" },
    bio: {
      el: "Σχεδιάστρια και εικαστικός. Επιμελείται τη φωτογραφία και την ταυτότητα του Youthoria.",
      en: "Designer and visual artist. Curates the photography and identity of Youthoria.",
    },
    email: "maria@youthoria.gr",
    socials: [
      { label: "Instagram", url: "#" },
      { label: "Behance", url: "#" },
    ],
  },
];