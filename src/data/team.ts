import { getAssetUrl } from "@/lib/assets";

export type Member = {
  name: string;
  role: { el: string; en: string };
  bio?: { el: string; en: string };
  email: string;
  photo: string;
};

export const team: Member[] = [
  {
    name: "Myron Plagiannakos",
    role: { el: "Founder, Content Producer & Director", en: "Founder, Content Producer & Director" },
    email: "myron@youthoria.gr",
    photo: getAssetUrl("/images/team/myron.jpg"),
  },
  {
    name: "Dimitris Alexandrou",
    role: {
      el: "General Manager & Head of Social Media and Public Relations",
      en: "General Manager & Head of Social Media and Public Relations",
    },
    email: "dimitris@youthoria.gr",
    photo: getAssetUrl("/images/team/dimitris.jpg"),
  },
  {
    name: "Thanasis Gkampis",
    role: { el: "Community & Engagement ︱ Write Director", en: "Community & Engagement ︱ Write Director" },
    email: "thanasis@youthoria.gr",
    photo: getAssetUrl("/images/team/thanasis.jpg"),
  },
  {
    name: "Maria Tsigara",
    role: { el: "Community & Engagement ︱ Write Director", en: "Community & Engagement ︱ Write Director" },
    email: "maria@youthoria.gr",
    photo: getAssetUrl("/images/team/maria.jpg"),
  },
  {
    name: "Marilia Skriapa",
    role: { el: "Community & Engagement Team", en: "Community & Engagement Team" },
    email: "info@youthoria.gr",
    photo: getAssetUrl("/images/team/marilia.jpg"),
  },
  {
    name: "Sotiris Euaggelinos",
    role: { el: "Community & Engagement Team", en: "Community & Engagement Team" },
    email: "info@youthoria.gr",
    photo: getAssetUrl("/images/team/sotiris.jpg"),
  },
];