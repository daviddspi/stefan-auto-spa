export interface Service {
  name: string;
  desc: string;
  longDesc: string;
  duration: string;
  price?: string;
  prices?: number[];
  note?: string;
  targetId?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  services: Service[];
}

export interface BusinessConfig {
  name: string;
  logo: string;
  slug: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  philosophy: {
    quote: string;
    author: string;
  };
  stats: Array<{ label: string; value: string }>;
  contact: {
    phones: string[];
    emails: string[];
    locations: Array<{ name: string; address: string; mapUrl: string }>;
    workingHours: string;
    social: {
      instagram: string;
    };
  };
  services: Array<{ title: string; description: string; price: string; duration: string; targetId: string }>;
  serviceCategories: ServiceCategory[];
  packages: Array<{
    title: string;
    subtitle: string;
    recommended?: boolean;
    badge?: string;
    items: string[];
    duration: string;
    price?: string;
    prices?: number[];
    currency: string;
  }>;
  reviews: Array<{ name: string; location: string; vehicle: string; service: string; text: string; rating: number }>;
  faqs: Array<{ q: string; a: string }>;
}

export const BUSINESS_CONFIG: BusinessConfig = {
  name: "Stefan Auto Spa",
  logo: "/logo.svg",
  slug: "stefan-auto-spa",
  tagline: "Vrhunski Detailing i Auto Spa u Beogradu.",
  shortDescription: "Specijalizovan studio u Mirijevu za kompletnu negu: od premium pranja i dubinskog čišćenja, do poliranja i vrhunske keramičke zaštite.",
  longDescription: "Smešten na adresi Mihaila Bulgakova 40, naš studio pruža beskompromisni kvalitet u svetu auto-detailinga. Naš pristup podrazumeva upotrebu najsavremenijih tehnologija i materijala, uz strogu pažnju na svaki milimetar vašeg vozila. Bez obzira na to da li je reč o osvežavanju enterijera ili potpunoj restauraciji sjaja karoserije, garantujemo rezultat koji nadilazi očekivanja.",
  philosophy: {
    quote: "Stefan Auto Spa - Transformacija i zaštita vašeg automobila uz maksimalnu posvećenost detaljima.",
    author: "Tim Stefan Auto Spa"
  },
  stats: [
    { label: 'Rating', value: '5.0' },
    { label: 'Reviews', value: '70+' },
    { label: 'Lokacija', value: 'Beograd' },
    { label: 'Iskustvo', value: 'Profesionalno' },
  ],
  contact: {
    phones: ["063 549 946"],
    emails: ["stefanautospa@gmail.com"],
    locations: [
      {
        name: "Stefan Auto Spa",
        address: "Mihaila Bulgakova 40, Beograd",
        mapUrl: "https://www.google.com/maps/place/Stefan+Auto+Spa/@44.787117,20.5421095,800m/data=!3m2!1e3!4b1!4m6!3m5!1s0x475a71001fd9110d:0x1607e7b3756b8091!8m2!3d44.787117!4d20.5421095!16s%2Fg%2F11xzy7_r_p?entry=ttu&g_ep=EgoyMDI2MDQwMS4wIKXMDSoASAFQAw%3D%3D"
      }
    ],
    workingHours: "Pon-Pet: 09:00 - 18:00 | Sub: 09:00 - 16:00",
    social: {
      instagram: "https://www.instagram.com/stefanautospa_detailing/"
    }
  },
  services: [
    {
      title: 'Poliranje Karoserije',
      description: 'Korekcija laka u više faza za vraćanje fabričkog sjaja i uklanjanje ogrebotina.',
      price: 'od 120 EUR',
      duration: '1-3 dana',
      targetId: 'cat-poliranje'
    },
    {
      title: 'Keramička Zaštita',
      description: 'Dugotrajna nano zaštita za lak, felne i stakla sa efektom visokog sjaja.',
      price: 'od 150 EUR',
      duration: '1-2 dana',
      targetId: 'cat-keramika'
    },
    { 
      title: 'Dubinsko Pranje', 
      description: 'Temeljno čišćenje enterijera, sedišta i svih površina uz dezinfekciju.',
      price: 'od 75 EUR',
      duration: '1 dan',
      targetId: 'cat-enterijer'
    }
  ],
  serviceCategories: [
    {
      id: "cat-poliranje",
      title: "Poliranje (Polishing)",
      services: [
        { 
          name: "Jednoslojno poliranje", 
          prices: [120, 150, 180], 
          desc: "Osvežavanje sjaja i uklanjanje sitnih tragova korišćenja.",
          longDesc: "Idealno za vozila sa očuvanim lakom koja su izgubila prvobitni sjaj. Uključuje dekontaminaciju laka i jedan prelaz finom pastom.",
          duration: "1 dan"
        },
        { 
          name: "Dvoslojno poliranje", 
          prices: [150, 180, 210], 
          desc: "Ozbiljnija korekcija laka i uklanjanje dubljih ogrebotina.",
          longDesc: "Dva prelaza (gruba + fina pasta) omogućavaju uklanjanje 70-80% oštećenja na laku i postizanje visokog nivoa refleksije.",
          duration: "2 dana"
        },
        { 
          name: "Troslojno poliranje", 
          prices: [210, 240, 270], 
          desc: "Maksimalna moguća korekcija laka (Showroom look).",
          longDesc: "Detaljan proces u tri faze kojim se uklanjaju sva oštećenja koja nisu prodrla do baze. Rezultat je savršeno ravan i sjajan lak.",
          duration: "3 dana"
        }
      ]
    },
    {
      id: "cat-keramika",
      title: "Keramička Zaštita",
      services: [
        { 
          name: "Keramička laka (Body)", 
          prices: [150, 170, 190], 
          desc: "Dugotrajna zaštita karoserije od spoljnih uticaja.",
          longDesc: "Nanošenje keramike koja štiti lak od UV zračenja, ptičjeg izmeta, hemije i olakšava pranje zbog hidrofobnog efekta.",
          duration: "1 dan"
        },
        { 
          name: "Keramička zaštita felni", 
          prices: [70, 90, 110], 
          desc: "Zaštita felni od kočione prašine i prljavštine.",
          longDesc: "Olakšava održavanje felni i sprečava zapečenje prljavštine na površini.",
          duration: "neka sata"
        },
        { 
          name: "Keramička zaštita stakala", 
          prices: [70, 90, 110], 
          desc: "Nevidljivi brisači za bolju vidljivost po kiši.",
          longDesc: "Poboljšava bezbednost vožnje po lošem vremenu i sprečava lepljenje insekata.",
          duration: "neka sata"
        }
      ]
    },
    {
      id: "cat-enterijer",
      title: "Enterijer (Interior)",
      services: [
        { 
          name: "Dubinsko pranje enterijera", 
          prices: [75, 85, 95], 
          desc: "Kompletno čišćenje unutrašnjosti vozila.",
          longDesc: "Uključuje dubinsko pranje sedišta, poda, gepeka, detailing instrument table i svih plastika uz dezinfekciju parom.",
          duration: "1 dan"
        }
      ]
    }
  ],
  packages: [
    {
      title: "BASIC CLEAN",
      subtitle: "Osnovna nega",
      recommended: true,
      badge: "NAJPOPULARNIJI",
      items: [
        "Detaljno usisavanje celog enterijera (sedišta, patosnice, gepek)",
        "Dubinsko pranje sedišta i tepiha (ekstrakcija)",
        "Čišćenje plastika i svih unutrašnjih površina",
        "Čišćenje pragova i teško dostupnih mesta",
        "Neutralizacija neprijatnih mirisa",
        "Pranje vozila (predpranje + šamponiranje)",
        "Ozon tretman"
      ],
      duration: "1 dan",
      prices: [75, 85, 95],
      currency: "EUR"
    },
    {
      title: "PREMIUM PAKET",
      subtitle: "Detailing preporuka",
      items: [
        "Dubinsko pranje enterijera",
        "Jednoslojno poliranje",
        "Zaštita laka (sealant)",
        "Pranje i sušenje vozila"
      ],
      duration: "1-2 dana",
      prices: [175, 210, 245],
      currency: "EUR"
    },
    {
      title: "FULL PAKET",
      subtitle: "Kompletna transformacija",
      badge: "Preporuka",
      items: [
        "Kompletna transformacija vozila",
        "Dvoslojno poliranje",
        "Keramička zaštita laka (Koch Chemie cb0.01 u trajanju do 36 meseci)",
        "Dubinsko pranje enterijera",
        "Detaljno pranje vozila"
      ],
      duration: "2-3 dana",
      prices: [335, 390, 445],
      currency: "EUR"
    },
    {
      title: "VIP PAKET",
      subtitle: "Najviši nivo zaštite i izgleda",
      badge: "ULTIMATE",
      items: [
        "Troslojno poliranje",
        "Keramička zaštita laka (Koch Chemie cb0.01 u trajanju do 36 meseci)",
        "Keramička zaštita felni",
        "Keramička zaštita stakala",
        "Dubinsko pranje enterijera",
        "Detaljno pranje vozila"
      ],
      duration: "3-4 dana",
      prices: [515, 590, 675],
      currency: "EUR"
    }
  ],
  reviews: [
    { 
      name: 'Andrijana Nikolic', 
      location: 'Beograd', 
      vehicle: 'Personal Car',
      service: 'Detailing',
      text: 'Najbolje! Svaka preporuka za Stefan Auto Spa.', 
      rating: 5 
    },
    { 
      name: 'Lazar Stojicevic', 
      location: 'Beograd', 
      vehicle: 'BMW M4',
      service: 'Poliranje i keramika',
      text: 'Vrhunska usluga, velika pažnja posvećena detaljima. Auto sija kao prvog dana.', 
      rating: 5 
    },
    { 
      name: 'Radomir Borisavljevic', 
      location: 'Beograd', 
      vehicle: 'Audi Q5',
      service: 'Dubinsko pranje',
      text: 'Najbolji auto spa u gradu. Profesionalni i ljubazni.', 
      rating: 5 
    },
    { 
      name: 'Petar Jovanovic', 
      location: 'Beograd', 
      vehicle: 'Mercedes GLE',
      service: 'VIP Paket',
      text: 'Neverovatan rezultat. Auto je bukvalno bolji nego nov. Prezadovoljan sam VIP paketom.', 
      rating: 5 
    },
  ],
  faqs: [
    {
      q: 'Gde se nalazi Stefan Auto Spa?',
      a: 'Nalazimo se u Mirijevu, na adresi Mihaila Bulgakova 40, Beograd.',
    },
    {
      q: 'Da li radite keramičku zaštitu stakala?',
      a: 'Da, nudimo keramičku zaštitu za sva stakla, što značajno poboljšava vidljivost po kiši.',
    },
    {
      q: 'Koliko traje troslojno poliranje?',
      a: 'Zbog detaljnog pristupa i više faza korekcije, proces obično traje do 3 radna dana.',
    },
    {
      q: 'Kada treba raditi dubinsko pranje enterijera?',
      a: 'Preporučujemo barem jednom godišnje kako bi se održala higijena i sprečilo nakupljanje alergena i neprijatnih mirisa.',
    },
  ]
};
