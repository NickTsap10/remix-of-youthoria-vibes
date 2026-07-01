import myronPhoto from "@/assets/team/myron.jpg.asset.json";
import dimitrisPhoto from "@/assets/team/dimitris.jpg.asset.json";
import ioannisPhoto from "@/assets/team/ioannis.jpg.asset.json";
import thanasisPhoto from "@/assets/team/thanasis.jpg.asset.json";
import mariaPhoto from "@/assets/team/maria.jpg.asset.json";
import mariliaPhoto from "@/assets/team/marilia.jpg.asset.json";
import sotirisPhoto from "@/assets/team/sotiris.jpg.asset.json";

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
    photo: myronPhoto.url,
  },
  {
    name: "Dimitris Alexandrou",
    role: {
      el: "General Manager & Head of Social Media and Public Relations",
      en: "General Manager & Head of Social Media and Public Relations",
    },
    email: "dimitris@youthoria.gr",
    photo: dimitrisPhoto.url,
  },
  {
    name: "Ioannis Ntinas",
    role: { el: "Video & Reel Editor", en: "Video & Reel Editor" },
    email: "ioannis@youthoria.gr",
    photo: ioannisPhoto.url,
  },
  {
    name: "Thanasis Gkampis",
    role: { el: "Community & Engagement ︱ Write Director", en: "Community & Engagement ︱ Write Director" },
    email: "thanasis@youthoria.gr",
    photo: thanasisPhoto.url,
  },
  {
    name: "Maria Tsigara",
    role: { el: "Community & Engagement ︱ Write Director", en: "Community & Engagement ︱ Write Director" },
    email: "maria@youthoria.gr",
    photo: mariaPhoto.url,
  },
  {
    name: "Marilia Skriapa",
    role: { el: "Community & Engagement Team", en: "Community & Engagement Team" },
    email: "info@youthoria.gr",
    photo: mariliaPhoto.url,
  },
  {
    name: "Sotiris Euaggelinos",
    role: { el: "Community & Engagement Team", en: "Community & Engagement Team" },
    email: "info@youthoria.gr",
    photo: sotirisPhoto.url,
  },
];