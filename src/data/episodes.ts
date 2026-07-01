export type Episode = {
  id: string;
  number: number;
  title: { el: string; en: string };
  description: { el: string; en: string };
  category: { el: string; en: string };
  duration: string;
  date: string; // ISO
  spotifyUrl: string;
  region?: string;
};

export const episodes: Episode[] = [
  {
    id: "042",
    number: 42,
    title: {
      el: "Η Φωνή της Σάμου",
      en: "The Voice of Samos",
    },
    description: {
      el: "Ταξιδεύουμε στη Σάμο και συζητάμε με νέους για την απομόνωση, τα σύνορα και τα όνειρα στην άκρη του Αιγαίου.",
      en: "We travel to Samos and speak with young people about isolation, borders, and dreams at the edge of the Aegean.",
    },
    category: { el: "Κοινωνία", en: "Society" },
    duration: "48",
    date: "2024-10-24",
    spotifyUrl: "https://open.spotify.com/",
    region: "samos",
  },
  {
    id: "041",
    number: 41,
    title: {
      el: "Αστικοί Μύθοι της Αθήνας",
      en: "Urban Myths of Athens",
    },
    description: {
      el: "Στους δρόμους της Κυψέλης, ανακαλύπτουμε τους σύγχρονους αστικούς θρύλους μιας γενιάς.",
      en: "Down the streets of Kypseli we discover the modern urban legends of a generation.",
    },
    category: { el: "Κουλτούρα", en: "Culture" },
    duration: "58",
    date: "2024-10-12",
    spotifyUrl: "https://open.spotify.com/",
    region: "athens",
  },
  {
    id: "040",
    number: 40,
    title: {
      el: "Το Μέλλον της Εργασίας",
      en: "The Future of Work",
    },
    description: {
      el: "Τι σημαίνει «καριέρα» το 2026; Συζητάμε με δημιουργούς, freelancers και ψηφιακούς νομάδες.",
      en: "What does “career” mean in 2026? We talk to creators, freelancers and digital nomads.",
    },
    category: { el: "Ιδέες", en: "Ideas" },
    duration: "35",
    date: "2024-10-01",
    spotifyUrl: "https://open.spotify.com/",
  },
  {
    id: "039",
    number: 39,
    title: {
      el: "Καινοτομία στην Εκπαίδευση",
      en: "Innovation in Education",
    },
    description: {
      el: "Πώς αλλάζει το πανεπιστήμιο στην εποχή της τεχνητής νοημοσύνης και του απομακρυσμένου μαθήματος.",
      en: "How the university is changing in the era of AI and remote learning.",
    },
    category: { el: "Ιδέες", en: "Ideas" },
    duration: "52",
    date: "2024-09-18",
    spotifyUrl: "https://open.spotify.com/",
  },
  {
    id: "038",
    number: 38,
    title: {
      el: "Τέχνη και Ακτιβισμός",
      en: "Art and Activism",
    },
    description: {
      el: "Η τέχνη του δρόμου ως εργαλείο κοινωνικής αλλαγής στις γειτονιές της Αθήνας.",
      en: "Street art as a tool for social change in the neighborhoods of Athens.",
    },
    category: { el: "Κουλτούρα", en: "Culture" },
    duration: "44",
    date: "2024-09-04",
    spotifyUrl: "https://open.spotify.com/",
  },
  {
    id: "037",
    number: 37,
    title: {
      el: "Ψυχική Υγεία & Γενιά Z",
      en: "Mental Health & Gen Z",
    },
    description: {
      el: "Μια ειλικρινής συζήτηση για το άγχος, τα social media και την ψυχική ανθεκτικότητα.",
      en: "An honest conversation about anxiety, social media, and mental resilience.",
    },
    category: { el: "Κοινωνία", en: "Society" },
    duration: "61",
    date: "2024-08-22",
    spotifyUrl: "https://open.spotify.com/",
  },
];