export type Region = {
  id: string;
  name: { el: string; en: string };
  x: number; // % of viewBox 100
  y: number;
  episodeId?: string;
  description?: { el: string; en: string };
};

export const regions: Region[] = [
  { id: "athens", name: { el: "Αθήνα", en: "Athens" }, x: 44, y: 58, episodeId: "041",
    description: { el: "Η καρδιά της συζήτησης.", en: "The heart of the conversation." } },
  { id: "samos", name: { el: "Σάμος", en: "Samos" }, x: 74, y: 55, episodeId: "042",
    description: { el: "Ιστορίες από τα σύνορα του Αιγαίου.", en: "Stories from the Aegean frontier." } },
  { id: "thessaloniki", name: { el: "Θεσσαλονίκη", en: "Thessaloniki" }, x: 42, y: 20 },
  { id: "patras", name: { el: "Πάτρα", en: "Patras" }, x: 28, y: 55 },
  { id: "heraklion", name: { el: "Ηράκλειο", en: "Heraklion" }, x: 58, y: 92 },
  { id: "ioannina", name: { el: "Ιωάννινα", en: "Ioannina" }, x: 22, y: 30 },
  { id: "rhodes", name: { el: "Ρόδος", en: "Rhodes" }, x: 86, y: 82 },
  { id: "corfu", name: { el: "Κέρκυρα", en: "Corfu" }, x: 12, y: 28 },
  { id: "kalamata", name: { el: "Καλαμάτα", en: "Kalamata" }, x: 32, y: 75 },
  { id: "lesvos", name: { el: "Λέσβος", en: "Lesbos" }, x: 72, y: 38 },
  { id: "chania", name: { el: "Χανιά", en: "Chania" }, x: 46, y: 92 },
  { id: "volos", name: { el: "Βόλος", en: "Volos" }, x: 44, y: 38 },
];