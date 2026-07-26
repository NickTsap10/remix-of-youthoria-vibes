import type { Lang } from "./i18n";

export type LegalSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalDoc = {
  title: string;
  intro: string;
  sections: LegalSection[];
};

export const privacyDoc: Record<Lang, LegalDoc> = {
  el: {
    title: "Πολιτική Απορρήτου — Youthoria Podcast",
    intro:
      "To Youthoria («εμείς», «μας») είναι μια μη κερδοσκοπική πρωτοβουλία podcast για νέους στην Ελλάδα. Σεβόμαστε την ιδιωτικότητά σας και δεσμευόμαστε να προστατεύουμε τα προσωπικά δεδομένα που μοιράζεστε μαζί μας, σύμφωνα με τον Γενικό Κανονισμό Προστασίας Δεδομένων της ΕΕ (GDPR).",
    sections: [
      {
        heading: "1. Υπεύθυνος Επεξεργασίας",
        paragraphs: [
          "Υπεύθυνος για τη διαχείριση των προσωπικών σας δεδομένων είναι το Youthoria. Για οποιαδήποτε απορία ή αίτημα σχετικά με τα δεδομένα σας, μπορείτε να επικοινωνήσετε μαζί μας στο:",
          "Email: info@youthoria.gr",
        ],
      },
      {
        heading: "2. Ποια Προσωπικά Δεδομένα Συλλέγουμε",
        paragraphs: [
          "Όταν αλληλεπιδράτε με την ιστοσελίδα μας (youthoria.gr), συλλέγουμε δεδομένα που μας παρέχετε οικειοθελώς:",
        ],
        bullets: [
          "Φόρμα Επικοινωνίας: Όνομα, επώνυμο, διεύθυνση email, αριθμό τηλεφώνου και το περιεχόμενο του μηνύματός σας.",
          "Αξιολογήσεις / Σχόλια: Όνομα, επώνυμο, διεύθυνση email, βαθμολογία (αστέρια) και το κείμενο της αξιολόγησης.",
          "Τεχνικά Αρχεία Καταγραφής (Server Logs): Όπως οι περισσότερες ιστοσελίδες, οι διακομιστές μας καταγράφουν αυτόματα βασικά τεχνικά δεδομένα (όπως διεύθυνση IP και τύπο περιηγητή) αποκλειστικά για λόγους ασφάλειας και σωστής λειτουργίας.",
        ],
      },
      {
        heading: "3. Γιατί Συλλέγουμε τα Δεδομένα σας",
        bullets: [
          "Για να σας απαντήσουμε: Χρησιμοποιούμε τα στοιχεία επικοινωνίας σας αποκλειστικά για να απαντήσουμε σε μηνύματα, σχόλια ή προτάσεις συνεργασίας.",
          "Για τη δημοσίευση αξιολογήσεων: Εάν υποβάλετε μια αξιολόγηση, χρησιμοποιούμε το όνομα και το σχόλιό σας για την προβολή της στην ιστοσελίδα μας.",
          "Καμία πώληση σε τρίτους: Δεν πουλάμε, δεν νοικιάζουμε και δεν παραχωρούμε τα προσωπικά σας δεδομένα σε διαφημιστικές ή άλλες τρίτες εταιρείες.",
        ],
      },
      {
        heading: "4. Αποθήκευση & Διατήρηση Δεδομένων",
        paragraphs: [
          "Διατηρούμε τα απεσταλμένα μηνύματα και τις αξιολογήσεις μόνο για όσο διάστημα είναι απαραίτητο για την εκπλήρωση του σκοπού για τον οποίο υποβλήθηκαν, ή μέχρι να μας ζητήσετε τη διαγραφή τους.",
        ],
      },
      {
        heading: "5. Εξωτερικοί Σύνδεσμοι",
        paragraphs: [
          "Η ιστοσελίδα μας περιέχει συνδέσμους προς εξωτερικές πλατφόρμες (όπως Spotify, Apple Podcasts και Google Podcasts). Πατώντας αυτούς τους συνδέσμους μεταφέρεστε σε υπηρεσίες τρίτων που λειτουργούν με τις δικές τους πολιτικές απορρήτου.",
        ],
      },
      {
        heading: "6. Τα Δικαιώματά σας (GDPR)",
        paragraphs: ["Έχετε το δικαίωμα να:"],
        bullets: [
          "Ζητήσετε αντίγραφο των προσωπικών δεδομένων που διατηρούμε για εσάς.",
          "Ζητήσετε τη διόρθωση τυχόν ανακριβών στοιχείων.",
          "Ζητήσετε την μόνιμη διαγραφή των δεδομένων σας ή μιας δημοσιευμένης αξιολόγησης («Δικαίωμα στη Λήθη»).",
        ],
      },
      {
        paragraphs: [
          "Για να ασκήσετε οποιοδήποτε από αυτά τα δικαιώματα, στείλτε μας email στο info@youthoria.gr.",
        ],
      },
    ],
  },
  en: {
    title: "Privacy Policy — Youthoria Podcast",
    intro:
      'Youthoria ("we," "us," or "our") is a non-profit youth podcast initiative operating in Greece. We respect your privacy and are committed to protecting the personal data you share with us in accordance with the EU General Data Protection Regulation (GDPR).',
    sections: [
      {
        heading: "1. Data Controller",
        paragraphs: [
          "The entity responsible for handling your personal data is Youthoria. For any privacy-related questions or requests, contact us at:",
          "Email: info@youthoria.gr",
        ],
      },
      {
        heading: "2. Personal Data We Collect",
        paragraphs: [
          "When interacting with our website (youthoria.gr), we collect personal information you voluntarily provide:",
        ],
        bullets: [
          "Contact Form Submissions: First name, last name, email address, phone number, and message contents.",
          "User Reviews & Feedback: First name, last name, email address, star rating, and review text.",
          "Technical Server Logs: Standard connection logs (such as IP address and browser type) recorded automatically for system security and maintenance.",
        ],
      },
      {
        heading: "3. Why We Collect Your Data",
        bullets: [
          "To respond to inquiries: Used solely to reply to contact messages, feedback, or collaboration requests.",
          "To publish reviews: Used to display your review and display name publicly on our website.",
          "No third-party sales: We do not sell, rent, or trade your personal data to third parties or advertisers.",
        ],
      },
      {
        heading: "4. Data Retention",
        paragraphs: [
          "We retain contact submissions and reviews only as long as necessary to fulfill their purpose or until you request deletion.",
        ],
      },
      {
        heading: "5. External Links",
        paragraphs: [
          "Our website contains links to external streaming platforms (Spotify, Apple Podcasts, Google Podcasts). These operate under their own independent privacy policies.",
        ],
      },
      {
        heading: "6. Your Rights (GDPR)",
        paragraphs: [
          'Under GDPR, you have the right to request access to your data, request corrections, or request permanent deletion ("Right to be Forgotten"). To exercise these rights, email info@youthoria.gr.',
        ],
      },
    ],
  },
};

export const termsDoc: Record<Lang, LegalDoc> = {
  el: {
    title: "Όροι Χρήσης — Youthoria Podcast",
    intro:
      "Καλώς ήρθατε στο youthoria.gr. Με την πρόσβαση και χρήση αυτής της ιστοσελίδας, συμφωνείτε να συμμορφώνεστε με τους ακόλουθους όρους.",
    sections: [
      {
        heading: "1. Περιεχόμενο & Πνευματική Ιδιοκτησία",
        paragraphs: [
          "Όλα τα επεισόδια podcast, τα λογότυπα, τα ηχητικά αρχεία, τα γραφικά και τα κείμενα που δημοσιεύονται στο youthoria.gr αποτελούν ιδιοκτησία του Youthoria, εκτός αν αναφέρεται διαφορετικά. Μπορείτε να ακούτε και να μοιράζεστε το περιεχόμενό μας για προσωπική, μη εμπορική χρήση, με την προϋπόθεση ότι αναφέρετε το Youthoria ως πηγή.",
        ],
      },
      {
        heading: "2. Υποβολές Χρηστών & Συμπεριφορά",
        paragraphs: ["Όταν υποβάλετε μηνύματα ή αξιολογήσεις μέσω των φορμών μας, συμφωνείτε:"],
        bullets: [
          "Να μην παρέχετε ψευδή στοιχεία επικοινωνίας ή να υποδύεστε κάποιον άλλον.",
          "Να μην υποβάλετε περιεχόμενο που είναι υβριστικό, δυσφημιστικό, παράνομο ή προσβλητικό.",
          "Ότι τυχόν αξιολόγηση που υποβάλετε μπορεί να εμφανίζεται δημόσια στην ιστοσελίδα.",
        ],
      },
      {
        heading: "3. Αποποίηση Ευθύνης",
        paragraphs: [
          "Το περιεχόμενο στο youthoria.gr παρέχεται για ενημερωτικούς και ψυχαγωγικούς σκοπούς. Αν και καταβάλλουμε κάθε προσπάθεια για την ακρίβεια των πληροφοριών, το Youthoria δεν φέρει ευθύνη για τυχόν σφάλματα ή προβλήματα διαθεσιμότητας σε πλατφόρμες τρίτων (π.χ. Spotify, Apple Podcasts).",
        ],
      },
      {
        heading: "4. Επικοινωνία",
        paragraphs: [
          "Για τυχόν απορίες σχετικά με τους όρους χρήσης, επικοινωνήστε μαζί μας στο info@youthoria.gr.",
        ],
      },
    ],
  },
  en: {
    title: "Terms & Conditions — Youthoria Podcast",
    intro:
      "Welcome to youthoria.gr. By accessing and using this website, you agree to comply with and be bound by the following terms.",
    sections: [
      {
        heading: "1. Content & Intellectual Property",
        paragraphs: [
          "All original podcast episodes, branding, audio content, graphics, and text published on youthoria.gr are the property of Youthoria unless stated otherwise. You may listen to and share our content for personal, non-commercial use provided you attribute Youthoria as the source.",
        ],
      },
      {
        heading: "2. User Submissions & Conduct",
        paragraphs: ["When submitting messages or reviews, you agree:"],
        bullets: [
          "Not to provide false contact details or impersonate others.",
          "Not to submit abusive, defamatory, illegal, or offensive content.",
          "That submitted reviews may be publicly displayed on the website.",
        ],
      },
      {
        heading: "3. Disclaimer",
        paragraphs: [
          "Content on youthoria.gr is provided for general informational and entertainment purposes. Youthoria is not liable for errors or service availability on third-party platforms.",
        ],
      },
      {
        heading: "4. Contact",
        paragraphs: [
          "Questions regarding these terms should be sent to info@youthoria.gr.",
        ],
      },
    ],
  },
};
