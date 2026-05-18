import { Message } from "@/types/message";

export const METADATA = {
  title: "Pahargyan Agung Ira & Faizal",
  description:
    "Kepada Yth. Bapak/Ibu/Saudara/i kami mengundang untuk hadir di acara pernikahan kami",
  ogImages: `${process.env.BASE_URL}/assets/og-image.png`,
};

export const SITECONFIG = {
  logoSplashScreen: `/assets/logo-wedding.png`,
  introAvatars: [`/assets/profile-filda.png`, `/assets/profile-raffly.png`],
  titleGroup: "Wedding Ira & Faizal",
  introTxtBtn: "Join Group",
  groomName: "Ira",
  brideName: "Faizal",
  logoGroup: "/assets/profile-group.png",
  subTitleGroup:
    "Grup ini dibuat untuk mengundang semua para tamu pernikahan Ira & Faizal",
  memberHeader: "Ira, Faizal",
  groupTitleWithIcon1: "Pahargyan Agung Ira & Faizal",
  groupTitleWithIcon2: "Media, Tautan, Dokumen",
  groupTitleWithIcon3: "Kirim Hadiah, untuk kedua mempelai",
  descriptionGroup: `\nAssalamualaikum Warahmatullahi Wabarakatuh!\n\nDengan penuh rasa syukur dan bahagia, kami ingin berbagi kabar yang gembira. Kami akan melangsungkan acara pernikahan kami pada tanggal 30 Mei 2026. Kami ingin merayakan kebahagiaan ini bersama orang-orang terkasih dalam acara pernikahan kami.\n\n📅 Tanggal: 30 Mei 2026\n\n⏰ Waktu: 08.00 WIB\n\n📍 Tempat: Dusun Cumpleng, Desa Brondong, Kec. Brondong, Kab. Lamongan\n\nDoa dan restu kalian semua adalah anugrah terindah bagi perjalanan baru kami. Semoga pernikahan ini penuh berkah, cinta, dan kebahagiaan yang abadi. aamiin🙏🏼\n\nSalam hangat dari Faizal & Ira💕`,
  imgGift: "/assets/kirim-hadiah.png",
  linkMap: "https://maps.app.goo.gl/GvWyJUzWKY6QW7Uz7",
  noRekening: "6059 01 016191 539",
  namaRekening: "Faizal Syawalludin",
  bankName: "BRI",
  expiryDate: "30/26",
  videoCall: "/assets/video-call.mp4",
  voiceCall: "/assets/voice-call.wav",
  bgMusic: "/assets/donne.mp3",
};

export const dummyMessages: Message[] = [
  {
    id: 1,
    name: "Faizal",
    message: "Assalamualaikum Wr. Wb. Hallo semua pada sehat-sehat kan?",
    timestamp: new Date(Date.now()).toISOString(),
    writingDelay: 1200,
    avatar: "/assets/profile-raffly.png",
  },
  {
    id: 2,
    name: "Faizal",
    message: "Aku sama Ira mau ngasih kabar nihh😁",
    timestamp: new Date(Date.now()).toISOString(),
    writingDelay: 1800,
    avatar: "/assets/profile-raffly.png",
  },
  {
    id: 3,
    name: "Ira",
    message: "Iyaaaa, Jadiiiiiiiii emmmm…",
    timestamp: new Date(Date.now()).toISOString(),
    writingDelay: 2000,
    avatar: "/assets/profile-filda.png",
  },
  {
    id: 4,
    name: "Ira",
    message: "Jadi kita mau kasih kabar kalo kita mau menikah guys🥹",
    timestamp: new Date(Date.now()).toISOString(),
    writingDelay: 2500,
    image: "/assets/prewed/image-6.jpg",
    avatar: "/assets/profile-filda.png",
  },
  {
    id: 5,
    name: "Faizal",
    message:
      "Iya, Nikahnya tgl 30 Mei 2026, untuk info detail nya ada di description group yaahh manteman",
    timestamp: new Date(Date.now()).toISOString(),
    writingDelay: 2200,
    avatar: "/assets/profile-raffly.png",
  },
  {
    id: 6,
    name: "Ira",
    message: "Jangan lupa check di google maps di bawah untuk lokasinyaa yaahh",
    timestamp: new Date(Date.now()).toISOString(),
    writingDelay: 1500,
    linkMap:
      "https://www.google.com/maps?q=-6.882471,112.2405207&hl=id&z=17&output=embed",
    avatar: "/assets/profile-filda.png",
  },
  {
    id: 7,
    name: "Faizal",
    message: "Mohon doanya agar rencananya lancar ya, Terimakasih🙏",
    timestamp: new Date(Date.now()).toISOString(),
    writingDelay: 2200,
    avatar: "/assets/profile-raffly.png",
  },
];

export const GALLERY_IMAGES = [
  "/assets/prewed/image-1.jpg",
  "/assets/prewed/image-2.jpg",
  "/assets/prewed/image-3.jpg",
  "/assets/prewed/image-4.jpg",
  "/assets/prewed/image-5.jpg",
  "/assets/prewed/image-6.jpg",
  "/assets/prewed/image-7.jpg",
  "/assets/prewed/image-8.jpg",
];

export const defaultIntroMessage = `
 Kepada Yth, Bapak/Ibu/Saudara/i,
[namatamu]
---
Assalamualaikum Wr. Wb.

Bismillahirrahmanirrahim.
Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus sahabat, untuk menghadiri acara pernikahan kami.

Berikut link untuk informasi lebih lanjut tentang acara pernikahan kami:
[link-undangan]

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i, berkenan hadir dan memberikan doa restu kepada kami.

Wassalamualaikum Wr. Wb.
Terima kasih banyak atas perhatiannya.

Salam hangat dari Ira & Faizal 💖
`;
