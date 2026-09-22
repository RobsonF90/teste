import React, { useState } from 'react';
import { Language, translations } from '../translations';
import { GlassWater, Clock, Calendar, ShieldCheck, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import custom generated images
import premiumCocktail from '../assets/images/premium_cocktail_1783389265615.jpg';
import premiumChampagneFlute from '../assets/images/premium_champagne_flute_1783439129250.jpg';
import billecartSalmonBrut from '../assets/images/billecart_salmon_brut_1783439259829.jpg';
import premiumChampagneBucket from '../assets/images/premium_champagne_bucket_1783439474818.jpg';
import veuveClicquotBrut from '../assets/images/veuve_clicquot_brut_1783439614829.jpg';
import domPerignonBrut from '../assets/images/dom_perignon_brut_1783439725451.jpg';
import moetRoseImperial from '../assets/images/moet_rose_imperial_1783439870078.jpg';
import moetBrutImperial from '../assets/images/moet_brut_imperial_1783440070920.jpg';
import cabaretLapDance from '../assets/images/cabaret_lap_dance_1783443747566.jpg';
import showsFeaturedImage from '../assets/images/shows_featured_upscaled.jpg';
import heroCabaretShow from '../assets/images/gallery_featured_upscaled.jpg';
import clubVipLounge from '../assets/images/club_vip_lounge_1783389253637.jpg';
import galleryItem1 from '../assets/images/gallery/gallery_item_1.jpg';
import galleryItem2 from '../assets/images/gallery/gallery_item_2.jpg';
import galleryItem3 from '../assets/images/gallery/gallery_item_3.jpg';
import galleryItem4 from '../assets/images/gallery/gallery_item_4.jpg';
import galleryItem5 from '../assets/images/gallery/gallery_item_5.jpg';
import galleryItem6 from '../assets/images/gallery/gallery_item_6.jpg';
import galleryItem7 from '../assets/images/gallery/gallery_item_7.jpg';

interface ShowsViewProps {
  language: Language;
}

type MenuCategory = 'all' | 'premium_drinks' | 'dance';

interface DrinkItem {
  id: string;
  category: 'premium_drinks' | 'dance';
  name: string;
  description: string;
  price: string;
  badge?: string;
  image?: string;
}

export default function ShowsView({ language }: ShowsViewProps) {
  const t = translations[language];
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');

  const drinkCategories = [
    { key: 'all', label: language === 'en' ? 'All Premium Menu' : 'Menu Premium' },
    { key: 'premium_drinks', label: t.shows.categories.premium_drinks },
    { key: 'dance', label: t.shows.categories.dance },
  ] as const;

  const drinkItems: DrinkItem[] = [
    // Premium Drinks Section
    {
      id: 'champagne_flute',
      category: 'premium_drinks',
      name: 'Premium Drinks Champagne Flute',
      description: language === 'en'
        ? 'An elegant, sparkling glass of chilled luxury house champagne, ideal for starting your celebration.'
        : 'Uma elegante taça flûte de champanhe da casa bem gelado, ideal para iniciar a sua celebração.',
      price: '€60.00',
      image: premiumChampagneFlute,
      badge: 'Sparkling',
    },
    {
      id: 'billecart_salmon',
      category: 'premium_drinks',
      name: 'Premium Drinks Billecart Salmon Brut',
      description: language === 'en'
        ? 'Renowned Billecart-Salmon Brut champagne, featuring refined notes of fresh fruit and ripe pear.'
        : 'O consagrado champanhe Billecart-Salmon Brut, com notas refinadas de frutas frescas e pera madura.',
      price: '€660.00',
      image: billecartSalmonBrut,
      badge: 'Highly Rated',
    },
    {
      id: 'premium_champagne',
      category: 'premium_drinks',
      name: 'Premium Drinks Champagne',
      description: language === 'en'
        ? 'A high-end, premium champagne selection served cold in our exclusive luxury bottle ritual.'
        : 'Uma seleção de champanhe premium servida fresca no nosso exclusivo ritual de garrafa de luxo.',
      price: '€250.00',
      image: premiumChampagneBucket,
      badge: 'VIP Choice',
    },
    {
      id: 'veuve_clicquot',
      category: 'premium_drinks',
      name: 'Premium Drinks Velve Cliquot Brut',
      description: language === 'en'
        ? 'Veuve Clicquot Yellow Label, characterized by its golden hues, structured body, and complex richness.'
        : 'Veuve Clicquot Yellow Label, caracterizado pelos tons dourados, corpo estruturado e riqueza complexa.',
      price: '€560.00',
      image: veuveClicquotBrut,
      badge: 'Velvet Choice',
    },
    {
      id: 'dom_perignon',
      category: 'premium_drinks',
      name: 'Premium Selection Dom Pérignon Brut',
      description: language === 'en'
        ? 'The ultimate prestige vintage champagne, offering incredible depth, balance, and fine minerality.'
        : 'O champanhe vintage de prestígio supremo, que oferece profundidade incrível, equilíbrio e mineralidade fina.',
      price: '€1.500,00',
      image: domPerignonBrut,
      badge: 'Prestige VIP',
    },
    {
      id: 'moet_rose',
      category: 'premium_drinks',
      name: 'Premium Drinks Moët & Chandon Rosé Impérial',
      description: language === 'en'
        ? 'Moët & Chandon Rosé Impérial, a spontaneous, radiant, romantic expression of the Moët style.'
        : 'Moët & Chandon Rosé Impérial, uma expressão espontânea, radiante e romântica do estilo icónico da Moët.',
      price: '€300.00',
      image: moetRoseImperial,
      badge: 'Elegant Rosé',
    },
    {
      id: 'moet_brut',
      category: 'premium_drinks',
      name: 'Premium Drinks Moët & Chandon Brut Impérial',
      description: language === 'en'
        ? 'The standard-setter for luxury champagne. Elegant, rich, vibrant, and always memorable.'
        : 'O champanhe de referência para o luxo. Elegante, rico, vibrante e sempre memorável.',
      price: '€350.00',
      image: moetBrutImperial,
      badge: 'Classic Brut',
    },

    // Dance Section
    {
      id: 'private_dance_30m',
      category: 'dance',
      name: 'Private Dance 30 minutes',
      description: language === 'en'
        ? 'An exclusive, immersive 30-minute private performance in our luxurious, discreet VIP areas.'
        : 'Uma performance privada exclusiva e imersiva de 30 minutos nas nossas luxuosas e discretas áreas VIP.',
      price: '€150.00',
      image: galleryItem7,
      badge: 'VIP Long Show',
    },
    {
      id: 'vip_room_party',
      category: 'dance',
      name: 'VIP ROOM PARTY',
      description: language === 'en'
        ? 'The ultimate private suite celebration with dedicated dancers, premium bottle service, and absolute privacy.'
        : 'A celebração definitiva em suíte privada com bailarinas dedicadas, serviço de garrafa premium e privacidade total.',
      price: '€500.00',
      image: clubVipLounge,
      badge: 'Prestige VIP',
    },
    {
      id: 'stage_show',
      category: 'dance',
      name: 'Stage Show',
      description: language === 'en'
        ? 'Breathtaking main stage choreography featuring our beautiful international stars under high-end lights.'
        : 'Coreografia deslumbrante no palco principal com as nossas belas estrelas internacionais sob luzes de alta tecnologia.',
      price: '€150.00',
      image: heroCabaretShow,
      badge: 'Main Stage',
    },
    {
      id: 'lap_dance',
      category: 'dance',
      name: 'Lap Dance Experience',
      description: language === 'en'
        ? 'An intimate, high-intensity lap dance experience delivered with seductive elegance and charm.'
        : 'Uma experiência de lap dance íntima e de alta intensidade, realizada com elegância sedutora.',
      price: '€50.00',
      image: cabaretLapDance,
      badge: 'Sensual',
    },
    {
      id: 'special_stage_show',
      category: 'dance',
      name: 'Special Stage Show',
      description: language === 'en'
        ? 'A tailor-made, high-energy special themed performance choreographed for celebrations and VIP guests.'
        : 'Uma performance temática especial e sob medida, coreografada para celebrações e convidados VIP.',
      price: '€250.00',
      image: galleryItem4,
      badge: 'Exquisite',
    },
    {
      id: 'private_dance',
      category: 'dance',
      name: 'Private Dance',
      description: language === 'en'
        ? 'A personal, captivating one-on-one dance experience in one of our cozy VIP booths.'
        : 'Uma experiência pessoal e cativante de dança um-a-um numa das nossas acolhedoras cabines VIP.',
      price: '€80.00',
      image: galleryItem3,
      badge: 'Popular',
    },
    {
      id: 'private_dance_2songs',
      category: 'dance',
      name: 'Private Dance 2 Songs',
      description: language === 'en'
        ? 'An extended private dance across two songs of your choice, ensuring double the connection and excitement.'
        : 'Uma dança privada prolongada ao longo de duas músicas à sua escolha, garantindo o dobro da conexão e emoção.',
      price: '€100.00',
      image: galleryItem5,
      badge: 'Extended',
    },
  ];

  const filteredItems = activeCategory === 'all'
    ? drinkItems
    : drinkItems.filter(item => item.category === activeCategory);

  return (
    <div className="space-y-20 pb-20">
      {/* Intro section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center space-y-3 mb-12">
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-wider text-gold-gradient">
            {t.shows.title}
          </h1>
          <div className="h-[1px] w-24 bg-gold/30 mx-auto" />
          <p className="text-sm md:text-base text-neutral-400 max-w-2xl mx-auto">
            {t.shows.subtitle}
          </p>
        </div>

        {/* Dynamic Split Frame: Cabaret Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#0a0a0a] border border-gold/20 rounded-2xl overflow-hidden p-6 sm:p-10 md:p-12 gold-glow">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-wide">
              {language === 'en' ? 'An Unforgettable Night of Entertainment' : 'Uma Noite Inesquecível de Entretenimento'}
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              {t.shows.experienceDesc}
            </p>

            <div className="border-t border-neutral-900 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex gap-3 items-start">
                <Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-white mb-1">
                    {language === 'en' ? 'Showtime Timings' : 'Horários dos Shows'}
                  </h4>
                  <p className="text-xs text-neutral-400">
                    {language === 'en' ? 'Intermittent sets starting from 23:00 till late' : 'Sets intermitentes a partir das 23:00 até tarde'}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Calendar className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-white mb-1">
                    {language === 'en' ? 'Opening Schedule' : 'Dias e Horário de Abertura'}
                  </h4>
                  <p className="text-xs text-neutral-400">
                    {language === 'en' ? 'Every day, doors open 23:00 – 05:00' : 'Todos os dias, abertura das 23:00 às 05:00'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden group border border-gold/30 gold-glow">
            <img
              src={showsFeaturedImage}
              alt="Mardigras NightClub Performance Stage"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-[center_20%] sm:object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 bg-black/80 border border-gold/40 rounded px-3 py-1 text-[10px] font-mono tracking-wider text-gold">
              {language === 'en' ? 'LIVE STAGE SHOWS' : 'ESPETÁCULOS AO VIVO'}
            </div>
          </div>
        </div>
      </section>

      {/* Show schedule timeline details */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-[#0a0a0a]/40 border border-neutral-900 rounded-xl p-8 space-y-6 text-center">
          <h3 className="font-serif text-2xl font-semibold text-white">
            {t.shows.scheduleTitle}
          </h3>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
            {t.shows.scheduleDesc}
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-stretch gap-4 pt-4 max-w-lg mx-auto">
            <div className="bg-[#050505] border border-neutral-900 rounded-lg p-4 flex-1">
              <span className="text-[10px] font-mono font-bold text-gold block mb-1">23:00</span>
              <p className="text-xs font-semibold text-white">{language === 'en' ? 'DOORS OPEN' : 'ABERTURA DE PORTAS'}</p>
              <p className="text-[10px] text-neutral-500 mt-1">{language === 'en' ? 'Lounge & Welcome Drinks' : 'Lounge e Bebidas de Boas-Vindas'}</p>
            </div>
            <div className="bg-[#050505] border border-gold/20 rounded-lg p-4 flex-1">
              <span className="text-[10px] font-mono font-bold text-gold block mb-1">23:00</span>
              <p className="text-xs font-semibold text-white">{language === 'en' ? 'SHOWTIME CURTAIN' : 'INÍCIO DO SHOW'}</p>
              <p className="text-[10px] text-neutral-400 mt-1">{language === 'en' ? 'Main performances begin' : 'Começam as performances'}</p>
            </div>
            <div className="bg-[#050505] border border-neutral-900 rounded-lg p-4 flex-1">
              <span className="text-[10px] font-mono font-bold text-gold block mb-1">01:30 - 05:00</span>
              <p className="text-xs font-semibold text-white">{language === 'en' ? 'VIP DJ SET' : 'DJ SET DE ENCERRAMENTO'}</p>
              <p className="text-[10px] text-neutral-500 mt-1">{language === 'en' ? 'Seductive club atmosphere till 05:00' : 'Clube e dança até às 05:00'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Liquid Luxury Menu section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-mono font-bold text-gold">
            {language === 'en' ? 'THE ART OF DRINK' : 'A ARTE DE BEBER'}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wider text-gold-gradient">
            {t.shows.menuTitle}
          </h2>
          <div className="h-[1px] w-24 bg-gold/30 mx-auto" />
          <p className="text-sm text-neutral-400 max-w-xl mx-auto">
            {t.shows.menuSubtitle}
          </p>
        </div>

        {/* Categories toggler bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {drinkCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider border transition-all cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-gold border-gold text-black font-semibold shadow-md shadow-gold/20'
                  : 'bg-[#0a0a0a] border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Premium Banner image for Premium Drinks */}
        {activeCategory === 'premium_drinks' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 sm:mb-12 rounded-xl overflow-hidden border border-gold/40 relative gold-glow"
          >
            <img
              src={galleryItem6}
              alt="Premium Drinks Selection"
              loading="lazy"
              decoding="async"
              className="w-full h-[200px] sm:h-[260px] md:h-[300px] object-cover object-center opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 space-y-1">
              <span className="text-[10px] font-mono text-gold uppercase tracking-widest font-bold">MARDIGRAS PREMIUM SELECTION</span>
              <h3 className="font-serif text-lg sm:text-2xl text-white font-semibold">
                {language === 'en' ? 'Exquisite Liquid Gold & Champagne' : 'Champanhes & Ouro Líquido Requintados'}
              </h3>
            </div>
          </motion.div>
        )}

        {/* Premium Banner image for Dance */}
        {activeCategory === 'dance' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 sm:mb-12 rounded-xl overflow-hidden border border-gold/40 relative gold-glow"
          >
            <img
              src={galleryItem2}
              alt="Dance Performance VIP"
              loading="lazy"
              decoding="async"
              className="w-full h-[200px] sm:h-[260px] md:h-[300px] object-cover object-center opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 space-y-1">
              <span className="text-[10px] font-mono text-gold uppercase tracking-widest font-bold">MARDIGRAS PRIVATE DANCES</span>
              <h3 className="font-serif text-lg sm:text-2xl text-white font-semibold">
                {language === 'en' ? 'Sensual Private Performances' : 'Performances Privadas Sensuais'}
              </h3>
            </div>
          </motion.div>
        )}

        {/* Interactive Menu Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="bg-[#0a0a0a] border border-neutral-900 rounded-xl p-5 sm:p-6 hover:border-gold/40 hover:bg-neutral-900/10 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4 w-full">
                  {item.image && (
                    <div className="w-full h-44 sm:h-52 rounded-lg overflow-hidden border border-neutral-950 bg-[#060606] shadow-inner group-hover:border-gold/25 transition-all relative flex items-center justify-center">
                      {/* Ambient blurred backdrop so portrait bottles or wide photos blend seamlessly */}
                      <img
                        src={item.image}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover blur-md opacity-25 scale-110 select-none pointer-events-none"
                        loading="lazy"
                        decoding="async"
                      />
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        loading="lazy"
                        decoding="async"
                        className={`relative z-10 w-full h-full ${
                          item.category === 'premium_drinks'
                            ? 'object-contain p-2.5 max-h-[165px] sm:max-h-[195px] drop-shadow-[0_10px_20px_rgba(0,0,0,0.85)]'
                            : 'object-cover'
                        } transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none`}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-base sm:text-lg font-medium text-white tracking-wide">
                          {item.name}
                        </h4>
                        {item.badge && (
                          <span className="bg-gold/10 border border-gold/30 text-gold text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded font-mono">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-gold font-mono font-semibold shrink-0 text-sm md:text-base">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed pr-6">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Micro interaction link */}
                <div className="pt-4 flex items-center justify-between text-[10px] uppercase font-mono text-neutral-500 border-t border-neutral-900/60 mt-4">
                  <span>Category: {item.category}</span>
                  <span className="flex items-center gap-1 text-gold/50 hover:text-gold transition-colors cursor-pointer">
                    <Heart className="w-3 h-3" /> VIP Choice
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Footer warning on premium quality and responsibility */}
      <section className="max-w-3xl mx-auto px-4 text-center">
        <p className="text-[10px] text-neutral-500 font-mono leading-relaxed uppercase">
          {language === 'en'
            ? 'PRICES INCLUDE VAT. WE RESERVE THE RIGHT TO LIMIT ACCESS AND BOTTLE SERVING. WE ADHERE TO THE MAXIMUM SAFETY STANDARDS. CHIPPED CRYSTAL WARE CHARGED TO VISITOR.'
            : 'OS PREÇOS INCLUEM IVA À TAXA LEGAL EM VIGOR. RESERVAMOS O DIREITO DE LIMITAR O ACESSO E SERVIÇO DE GARRAFAS. O COPO OU CRISTAL QUEBRADO SERÁ COBRADO.'}
        </p>
      </section>
    </div>
  );
}
