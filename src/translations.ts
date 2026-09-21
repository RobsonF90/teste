export type Language = 'en' | 'pt';

export interface TranslationSchema {
  splash: {
    welcome: string;
    description: string;
    choose: string;
    ageCheck: string;
    enter: string;
    ageWarning: string;
  };
  nav: {
    home: string;
    shows: string;
    gallery: string;
    about: string;
    contact: string;
    bookNow: string;
    casting: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    heroTagline: string;
    ctaReserve: string;
    ctaExplore: string;
    experienceTitle: string;
    experienceSubtitle: string;
    exp1Title: string;
    exp1Desc: string;
    exp2Title: string;
    exp2Desc: string;
    exp3Title: string;
    exp3Desc: string;
    previewShowsTitle: string;
    previewShowsDesc: string;
    tonightShow: string;
    tonightShowDesc: string;
    viewFullMenu: string;
    hoursTeaser: string;
    hoursTeaserDesc: string;
  };
  shows: {
    title: string;
    subtitle: string;
    experienceIntro: string;
    experienceDesc: string;
    scheduleTitle: string;
    scheduleDesc: string;
    menuTitle: string;
    menuSubtitle: string;
    categories: {
      premium_drinks: string;
      dance: string;
    };
  };
  gallery: {
    title: string;
    subtitle: string;
    filterAll: string;
    filterPerformances: string;
    filterAmbience: string;
    filterDrinks: string;
    filterVip: string;
    mediaAlt: string;
    videoTitle: string;
  };
  about: {
    title: string;
    subtitle: string;
    conceptTitle: string;
    conceptP1: string;
    conceptP2: string;
    reviewsTitle: string;
    reviewsSubtitle: string;
    review1Author: string;
    review1Text: string;
    review2Author: string;
    review2Text: string;
    review3Author: string;
    review3Text: string;
    starsBadge: string;
    starsBadgeDesc: string;
  };
  contact: {
    title: string;
    subtitle: string;
    formTitle: string;
    formName: string;
    formEmail: string;
    formPhone: string;
    formDate: string;
    formGuests: string;
    formMessage: string;
    formSubmit: string;
    formSuccess: string;
    infoTitle: string;
    addressLabel: string;
    addressValue: string;
    hoursLabel: string;
    hoursValue: string;
    phoneLabel: string;
    phoneValue: string;
    emailLabel: string;
    emailValue: string;
    socialLabel: string;
    viewMap: string;
  };
  footer: {
    rights: string;
    description: string;
    quickLinks: string;
    warningAge: string;
  };
  casting: {
    heroTitle: string;
    heroSubtitle: string;
    badgeLocation: string;
    badgeIncome: string;
    badgeSafe: string;
    vacanciesTitle: string;
    vacanciesSubtitle: string;
    roleDancersTitle: string;
    roleDancersDesc: string;
    roleDancersTag: string;
    roleHostessTitle: string;
    roleHostessDesc: string;
    roleHostessTag: string;
    roleBarTitle: string;
    roleBarDesc: string;
    roleBarTag: string;
    benefitsTitle: string;
    benefitsSubtitle: string;
    benefit1Title: string;
    benefit1Desc: string;
    benefit2Title: string;
    benefit2Desc: string;
    benefit3Title: string;
    benefit3Desc: string;
    benefit4Title: string;
    benefit4Desc: string;
    benefit5Title: string;
    benefit5Desc: string;
    ctaSectionTitle: string;
    ctaInstructionsTitle: string;
    ctaInstruction1: string;
    ctaInstruction2: string;
    ctaInstruction3: string;
    whatsappBtn: string;
    emailLabel: string;
    legalNotice: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    splash: {
      welcome: "MARDIGRAS NIGHTCLUB",
      description: "Step into the most exclusive gentlemen's club and nightlife lounge experience at Mardigras NightClub.",
      choose: "Select Your Language",
      ageCheck: "I confirm that I am 18 years of age or older.",
      enter: "Enter Experience",
      ageWarning: "You must confirm your age to enter this site.",
    },
    nav: {
      home: "Home",
      shows: "Shows & Drinks",
      gallery: "Gallery",
      about: "About",
      contact: "Contact",
      bookNow: "Reserve Table",
      casting: "Careers / Casting",
    },
    home: {
      heroTitle: "MARDIGRAS",
      heroSubtitle: "NIGHTCLUB",
      heroTagline: "World-class adult entertainment. Stunning dancers, breathtaking performances, and signature cocktails for those seeking to escape the ordinary.",
      ctaReserve: "Reserve VIP Table",
      ctaExplore: "Discover Shows",
      experienceTitle: "The Mardigras Experience",
      experienceSubtitle: "A curated multi-sensory journey designed for those seeking the extraordinary.",
      exp1Title: "Luxury Live Entertainment",
      exp1Desc: "Experience breathtaking performances by stunning international dancers, expertly choreographed in an atmosphere of luxury and sophistication.",
      exp2Title: "Cocktails & Premium Drinks",
      exp2Desc: "Enjoy expertly crafted signature cocktails, premium spirits, and an exceptional drinks selection designed to elevate your night.",
      exp3Title: "Exclusive VIP Lounge",
      exp3Desc: "Relax in an elegant private setting with luxurious interiors, premium service, and complete discretion.",
      previewShowsTitle: "Tonight's Seduction",
      previewShowsDesc: "Every evening at Mardigras NightClub is unique. Prepare your senses for an unforgettable sequence of live performances.",
      tonightShow: "The Sensation Show",
      tonightShowDesc: "An exclusive performance featuring beautiful international dancers, elegant choreography, and an unforgettable nightlife experience. Show starts at 23:00.",
      viewFullMenu: "View Full Experiences & Menu",
      hoursTeaser: "Doors Open At 23:00",
      hoursTeaserDesc: "Join us for signature cocktails and an unforgettable night under the starry lights.",
    },
    shows: {
      title: "Shows & Experiences",
      subtitle: "A symphony of visual arts, exquisite performance, and top-tier spirits.",
      experienceIntro: "The Show & Artistry",
      experienceDesc: "Mardigras presents a stunning lineup of international dancers delivering captivating performances, exceptional choreography, and an unforgettable nightlife experience. Every show is designed to combine elegance, energy, and excitement.",
      scheduleTitle: "Performance Schedule",
      scheduleDesc: "Doors open every day at 23:00. Main stage shows begin at 23:00 and run intermittently throughout the night, with the final act culminating in a high-energy DJ set to dance under golden lights until 05:00.",
      menuTitle: "The Liquid Luxury Menu",
      menuSubtitle: "Handcrafted cocktails and the world's finest champagnes and spirits curated for the elite palette.",
      categories: {
        premium_drinks: "Premium Drinks",
        dance: "Dance",
      },
    },
    gallery: {
      title: "Visual Splendor",
      subtitle: "Catch a glimpse of the luxury, the artistry, and the captivating nights at Mardigras NightClub.",
      filterAll: "All Media",
      filterPerformances: "Live Shows",
      filterAmbience: "Ambience & VIP",
      filterDrinks: "Cocktails",
      filterVip: "VIP Lounge",
      mediaAlt: "Mardigras NightClub atmosphere",
      videoTitle: "Experience The Midnight Energy",
    },
    about: {
      title: "The Mardigras Legacy",
      subtitle: "Unveiling the mystery of the premier luxury nightlife institution.",
      conceptTitle: "The Concept: Gold, Velvet, and Intrigue",
      conceptP1: "Mardigras NightClub was founded as a haven for connoisseurs of fine entertainment, high-end hospitality, and beautiful sensory experiences.",
      conceptP2: "Our architecture blends deep noir velvet and shimmering brass details, creating an atmosphere of dark romance and timeless glamour. We believe that night entertainment is a fine art—one that deserves exquisite drinks, passionate performances, and absolute privacy for our esteemed guests.",
      reviewsTitle: "Eminent Testimonials",
      reviewsSubtitle: "Read what global travelers and tastemakers say about their unforgettable nights.",
      review1Author: "Charlotte V., London",
      review1Text: "Absolute perfection. The dancers are extraordinarily talented, the cocktails are sheer art, and the atmosphere feels like an exclusive Parisian club. A must-visit!",
      review2Author: "Guillaume L., Paris",
      review2Text: "An incredible club with extremely high production standards. The VIP bottle service was impeccable, and the staff are incredibly professional. 10/10.",
      review3Author: "Ana S., Lisbon",
      review3Text: "The golden cocktail is a masterpiece! The venue is absolutely stunning, dark and golden. Ideal place to spend an unforgettable evening at Mardigras NightClub.",
      starsBadge: "5-Star Hospitality",
      starsBadgeDesc: "Consistently rated as one of the top-tier luxury entertainment venues.",
    },
    contact: {
      title: "Secure Your Presence",
      subtitle: "Guarantee your reservation. Indulge in an evening of absolute luxury.",
      formTitle: "VIP Table Booking Request",
      formName: "Full Name",
      formEmail: "Email Address",
      formPhone: "Phone Number",
      formDate: "Preferred Date",
      formGuests: "Number of Guests",
      formMessage: "Special Requests (VIP Table, Birthday, Dietaries)",
      formSubmit: "Send Booking Request",
      formSuccess: "Thank you. Your request was received. Our VIP host will contact you shortly to finalize your reservation.",
      infoTitle: "Location & Contact",
      addressLabel: "Address",
      addressValue: "R. Fernão de Magalhães, 8200-129 Albufeira, Portugal",
      hoursLabel: "Opening Hours",
      hoursValue: "Every day: 23:00 - 05:00 AM",
      phoneLabel: "Phone / WhatsApp",
      phoneValue: "+351 913 208 108",
      emailLabel: "Email Reservations",
      emailValue: "patty.ps@icloud.com",
      socialLabel: "Follow Our Nightlife",
      viewMap: "View Map Directions",
    },
    footer: {
      rights: "© 2026 Mardigras NightClub. All rights reserved.",
      description: "Your unforgettable party begins here, at the epicenter of the vibrant Albufeira Strip.",
      quickLinks: "Quick Access",
      warningAge: "Access is strictly restricted to individuals aged 18 and over. Smart elegant dress code required.",
    },
  },
  pt: {
    splash: {
      welcome: "MARDIGRAS NIGHTCLUB",
      description: "Entre na experiência mais exclusiva de gentlemen's club e lounge no Mardigras NightClub.",
      choose: "Selecione o seu Idioma",
      ageCheck: "Confirmo que tenho 18 anos de idade ou mais.",
      enter: "Entrar na Experiência",
      ageWarning: "Deve confirmar a sua idade para entrar neste site.",
    },
    nav: {
      home: "Início",
      shows: "Shows e Bebidas",
      gallery: "Galeria",
      about: "Sobre Nós",
      contact: "Contacto",
      bookNow: "Reservar Mesa",
    },
    home: {
      heroTitle: "MARDIGRAS",
      heroSubtitle: "NIGHTCLUB",
      heroTagline: "Entretenimento adulto de classe mundial. Dançarinas deslumbrantes, apresentações de tirar o fôlego e coquetéis exclusivos para quem busca fugir do comum.",
      ctaReserve: "Reservar Mesa VIP",
      ctaExplore: "Descobrir Shows",
      experienceTitle: "A Experiência Mardigras",
      experienceSubtitle: "Uma jornada multissensorial curada para quem procura o extraordinário.",
      exp1Title: "Entretenimento ao Vivo de Luxo",
      exp1Desc: "Experimente performances deslumbrantes por bailarinas internacionais fantásticas, habilmente coreografadas numa atmosfera de luxo e sofisticação.",
      exp2Title: "Cocktails e Bebidas Premium",
      exp2Desc: "Desfrute de cocktails de autor habilmente preparados, bebidas espirituosas premium e uma seleção de bebidas excecional desenhada para elevar a sua noite.",
      exp3Title: "Lounge VIP Exclusivo",
      exp3Desc: "Relaxe num ambiente privado elegante com interiores luxuosos, serviço premium e discrição total.",
      previewShowsTitle: "A Sedução de Hoje",
      previewShowsDesc: "Cada noite no Mardigras NightClub é única. Prepare os seus sentidos para uma sequência inesquecível de espetáculos ao vivo.",
      tonightShow: "O Sensation Show",
      tonightShowDesc: "Uma performance exclusiva com belas bailarinas internacionais, coreografias elegantes e uma experiência noturna inesquecível. O espetáculo começa às 23:00.",
      viewFullMenu: "Ver Menu Completo e Experiências",
      hoursTeaser: "Portas Abrem às 23:00",
      hoursTeaserDesc: "Junte-se a nós cedo para cocktails pré-show sob a noite estrelada.",
    },
    shows: {
      title: "Shows e Experiências",
      subtitle: "Uma sinfonia de artes visuais, espetáculos requintados e bebidas espirituosas de alto nível.",
      experienceIntro: "O Show e a Arte",
      experienceDesc: "Mardigras apresenta um elenco deslumbrante de bailarinas internacionais com performances cativantes, coreografia excecional e uma experiência de vida noturna inesquecível. Cada espetáculo é desenhado para combinar elegância, energia e emoção.",
      scheduleTitle: "Horário dos Espetáculos",
      scheduleDesc: "As portas abrem todos os dias às 23:00. Os shows no palco principal começam às 23:00 e decorrem intermitentemente ao longo da noite, culminando com um set de DJ de alta energia para dançar sob as luzes douradas até às 05:00.",
      menuTitle: "O Menu de Luxo Líquido",
      menuSubtitle: "Cocktails artesanais e os melhores champanhes e espirituosos do mundo curados para o paladar de elite.",
      categories: {
        premium_drinks: "Premium Drinks",
        dance: "Dance",
      },
    },
    gallery: {
      title: "Esplendor Visual",
      subtitle: "Vislumbre o luxo, a arte e as noites cativantes do Mardigras NightClub.",
      filterAll: "Todos",
      filterPerformances: "Shows ao Vivo",
      filterAmbience: "Ambiente e VIP",
      filterDrinks: "Cocktails",
      filterVip: "Lounge VIP",
      mediaAlt: "Atmosfera Mardigras NightClub",
      videoTitle: "Sinta a Energia da Meia-Noite",
    },
    about: {
      title: "O Legado Mardigras",
      subtitle: "Revelando o mistério da instituição de vida noturna de referência.",
      conceptTitle: "O Conceito: Ouro, Veludo e Intriga",
      conceptP1: "O Mardigras NightClub foi fundado como um refúgio para apreciadores de entretenimento sofisticado, hospitalidade premium e belas experiências sensoriais.",
      conceptP2: "A nossa arquitetura funde veludo preto profundo com detalhes cintilantes de latão, criando uma atmosfera de romance misterioso e glamour intemporal. Acreditamos que o entretenimento noturno é uma arte fina—que merece bebidas requintadas, performances apaixonadas e privacidade absoluta para os nossos ilustres convidados.",
      reviewsTitle: "Testemunhos Ilustres",
      reviewsSubtitle: "Leia o que viajantes globais e formadores de opinião dizem sobre as suas noites inesquecíveis.",
      review1Author: "Charlotte V., Londres",
      review1Text: "Perfeição absoluta. Os bailarinos são incrivelmente talentosos, os cocktails são verdadeira arte e a atmosfera é simplesmente fantástica. Visita obrigatória!",
      review2Author: "Guillaume L., Paris",
      review2Text: "Um clube incrível com elevados padrões de produção. O serviço de garrafas VIP foi impecável e os funcionários são super profissionais. 10/10.",
      review3Author: "Ana S., Lisboa",
      review3Text: "O cocktail com ouro é uma obra-prima! O espaço é absolutamente deslumbrante, escuro e dourado. Local ideal para passar uma noite inesquecível no Mardigras NightClub.",
      starsBadge: "Hospitalidade 5 Estrelas",
      starsBadgeDesc: "Consistentemente classificado como um dos locais de entretenimento de maior prestígio.",
    },
    contact: {
      title: "Assegure a Sua Presença",
      subtitle: "Garanta a sua reserva. Entregue-se a uma noite de absoluto luxo.",
      formTitle: "Pedido de Reserva de Mesa VIP",
      formName: "Nome Completo",
      formEmail: "Endereço de Email",
      formPhone: "Número de Telefone",
      formDate: "Data Pretendida",
      formGuests: "Número de Pessoas",
      formMessage: "Pedidos Especiais (Mesa VIP, Aniversário, Requisitos Dietéticos)",
      formSubmit: "Enviar Pedido de Reserva",
      formSuccess: "Obrigado. O seu pedido foi recebido. O nosso anfitrião VIP entrará em contacto em breve para finalizar a sua reserva.",
      infoTitle: "Localização e Contacto",
      addressLabel: "Morada",
      addressValue: "R. Fernão de Magalhães, 8200-129 Albufeira, Portugal",
      hoursLabel: "Horário de Funcionamento",
      hoursValue: "Todos os dias: 23:00 às 05:00",
      phoneLabel: "Telefone / WhatsApp",
      phoneValue: "+351 913 208 108",
      emailLabel: "Reservas por Email",
      emailValue: "patty.ps@icloud.com",
      socialLabel: "Siga as Nossas Noites",
      viewMap: "Ver Direções no Mapa",
    },
    footer: {
      rights: "© 2026 Mardigras NightClub. Todos os direitos reservados.",
      description: "Sua festa inesquecível começa aqui, no epicentro da vibrante Albufeira Strip.",
      quickLinks: "Acesso Rápido",
      warningAge: "O acesso é estritamente reservado a maiores de 18 anos. Código de vestuário elegante e sofisticado obrigatório.",
    },
  },
};
