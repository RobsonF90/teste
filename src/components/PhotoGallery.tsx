import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Language, translations } from '../translations';
import { 
  Play, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Heart, 
  Sparkles, 
  Share2, 
  LayoutGrid, 
  Columns3,
  GlassWater,
  Music,
  Crown,
  Flame,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Assets
import heroCabaretShow from '../assets/images/gallery_featured_upscaled.jpg';
import cabaretStage from '../assets/images/hero_cabaret_show_1783389240673.jpg';
import cabaretPrivate from '../assets/images/cabaret_lap_dance_1783443747566.jpg';
import vipLounge from '../assets/images/club_vip_lounge_1783389253637.jpg';
import cocktailsBar from '../assets/images/premium_cocktails_bar_1790019561057.jpg';
import champagneFlute from '../assets/images/premium_champagne_flute_1783439129250.jpg';
import galleryItem1 from '../assets/images/gallery/gallery_item_1.jpg';
import galleryItem2 from '../assets/images/gallery/gallery_item_2.jpg';
import galleryItem3 from '../assets/images/gallery/gallery_item_3.jpg';
import galleryItem4 from '../assets/images/gallery/gallery_item_4.jpg';
import galleryItem5 from '../assets/images/gallery/gallery_item_5.jpg';
import galleryItem6 from '../assets/images/gallery/gallery_item_6.jpg';
import galleryItem7 from '../assets/images/gallery/gallery_item_7.jpg';
import galleryItem8 from '../assets/images/gallery/gallery_item_8.jpg';
import nightclubVideo from '../assets/images/gallery/video_nightclub.mp4';

export interface PhotoGalleryItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  videoSrc?: string;
  category: 'shows' | 'ambience' | 'drinks' | 'vip';
  titleEn: string;
  titlePt: string;
  descEn: string;
  descPt: string;
  tagEn: string;
  tagPt: string;
  isFeatured?: boolean;
  aspectClass?: string;
}

interface PhotoGalleryProps {
  language: Language;
}

export default function PhotoGallery({ language }: PhotoGalleryProps) {
  const t = translations[language];

  // Filters and layout state
  const [activeFilter, setActiveFilter] = useState<'all' | 'shows' | 'ambience' | 'drinks' | 'vip'>('all');
  const [layoutMode, setLayoutMode] = useState<'mosaic' | 'grid'>('mosaic');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [likedIds, setLikedIds] = useState<Set<string>>(() => new Set(['photo-stage-1', 'photo-vip-1']));
  const [copiedLink, setCopiedLink] = useState(false);

  // Gallery items focusing on the cabaret's electric atmosphere and live performances
  const galleryItems: PhotoGalleryItem[] = useMemo(
    () => [
      {
        id: 'photo-stage-featured',
        type: 'image',
        src: heroCabaretShow,
        category: 'shows',
        titleEn: 'The Grand Stage Choreography',
        titlePt: 'A Grande Coreografia de Palco',
        descEn: 'Sensational live cabaret performance with dazzling costumes and golden stage ambiance under atmospheric spotlights.',
        descPt: 'Performance sensacional de cabaret ao vivo com figurinos deslumbrantes e ambiente de palco dourado sob focos envolventes.',
        tagEn: 'Signature Performance',
        tagPt: 'Performance de Assinatura',
        isFeatured: true,
        aspectClass: 'col-span-1 sm:col-span-2 lg:col-span-2 row-span-2',
      },
      {
        id: 'photo-stage-1',
        type: 'image',
        src: cabaretStage,
        category: 'shows',
        titleEn: 'Sensual Stage Artistry',
        titlePt: 'Arte e Sedução no Palco',
        descEn: 'World-class international dancers performing intricate, expressive burlesque and contemporary cabaret numbers.',
        descPt: 'Bailarinas internacionais de elite apresentando números expressivos de burlesco e cabaret contemporâneo.',
        tagEn: 'Main Stage • 23:00',
        tagPt: 'Palco Principal • 23:00',
      },
      {
        id: 'photo-vip-lounge',
        type: 'image',
        src: vipLounge,
        category: 'vip',
        titleEn: 'The Royal Velvet VIP Lounge',
        titlePt: 'O Lounge VIP Royal Velvet',
        descEn: 'Sumptuous plush velvet seating, discreet alcoves, and private champagne service tailored for distinguished guests.',
        descPt: 'Assentos luxuosos em veludo, recantos discretos e serviço privado de champanhe pensado para clientes distintos.',
        tagEn: 'VIP Experience',
        tagPt: 'Experiência VIP',
      },
      {
        id: 'photo-cocktail-bar',
        type: 'image',
        src: cocktailsBar,
        category: 'drinks',
        titleEn: 'The Golden Mixology Bar',
        titlePt: 'O Balcão de Mixologia Dourada',
        descEn: 'Expert mixologists preparing signature midnight cocktails infused with premium botanicals, smoke, and edible gold.',
        descPt: 'Mixologistas especializados preparando cocktails de autor com botânicos premium, infusões e ouro comestível.',
        tagEn: 'Artisanal Bar',
        tagPt: 'Bar Artesanal',
      },
      {
        id: 'photo-private-cabaret',
        type: 'image',
        src: cabaretPrivate,
        category: 'shows',
        titleEn: 'Exclusive Private Cabaret',
        titlePt: 'Cabaret Privado Exclusivo',
        descEn: 'Intimate personalized dance performances designed with sensuality, elegance, and absolute discretion.',
        descPt: 'Danças personalizadas e intimistas criadas com sensualidade, elegância e discrição absoluta.',
        tagEn: 'Private Table Service',
        tagPt: 'Serviço de Mesa Privado',
      },
      {
        id: 'photo-grid-1',
        type: 'image',
        src: galleryItem1,
        category: 'shows',
        titleEn: 'Dazzling Choreography & Lights',
        titlePt: 'Brilho e Coreografia sob as Luzes',
        descEn: 'Captivating aerial accents and stage precision under the mesmerizing warm glow of Mardigras.',
        descPt: 'Acrobacias aéreas e precisão de palco sob o calor envolvente das luzes do Mardigras.',
        tagEn: 'Live Cabaret',
        tagPt: 'Cabaret ao Vivo',
      },
      {
        id: 'photo-grid-2',
        type: 'image',
        src: galleryItem2,
        category: 'ambience',
        titleEn: 'Midnight Glow & Golden Ambiance',
        titlePt: 'Brilho da Meia-Noite & Ambiente Dourado',
        descEn: 'The nocturnal soul of Albufeira, marrying dramatic brass architecture with intimate mood lighting.',
        descPt: 'A alma noturna de Albufeira, combinando arquitetura em latão polido com iluminação intimista.',
        tagEn: 'Atmosphere',
        tagPt: 'Atmosfera',
      },
      {
        id: 'photo-champagne',
        type: 'image',
        src: champagneFlute,
        category: 'drinks',
        titleEn: 'Cuvée & Vintage Champagne',
        titlePt: 'Champanhe Cuvée & Vintage',
        descEn: 'Iconic bottles of Dom Pérignon, Billecart-Salmon, and Moët & Chandon chilled to crystal perfection.',
        descPt: 'Garrafas icónicas de Dom Pérignon, Billecart-Salmon e Moët & Chandon servidas com frescura exemplar.',
        tagEn: 'Liquid Prestige',
        tagPt: 'Prestígio Líquido',
      },
      {
        id: 'photo-grid-3',
        type: 'image',
        src: galleryItem3,
        category: 'vip',
        titleEn: 'Private Suites & Alcoves',
        titlePt: 'Suítes Privadas & Recantos',
        descEn: 'Secluded booths offering premium visibility to the stage while guaranteeing privacy and dedicated hosting.',
        descPt: 'Camarotes reservados com visibilidade perfeita para o palco e anfitriã dedicada para a sua mesa.',
        tagEn: 'Exclusive Reserve',
        tagPt: 'Reserva Exclusiva',
      },
      {
        id: 'photo-grid-4',
        type: 'image',
        src: galleryItem4,
        category: 'shows',
        titleEn: 'Electrifying Stage Duets',
        titlePt: 'Duo Eletrizante de Palco',
        descEn: 'High-voltage theatrical routines that ignite the crowd before transitioning into the late-night DJ party.',
        descPt: 'Atuações teatrais de alta energia que aquecem a noite antes do set do DJ residente.',
        tagEn: 'Stage Passion',
        tagPt: 'Paixão em Palco',
      },
      {
        id: 'photo-grid-6',
        type: 'image',
        src: galleryItem6,
        category: 'drinks',
        titleEn: 'Bespoke Midnight Cocktails',
        titlePt: 'Cocktails Noturnos Sob Medida',
        descEn: 'From smoky Bourbons to delicate velvet martinis, crafted to elevate each stage interlude.',
        descPt: 'De Bourbons fumados a martinis aveludados, preparados para elevar cada momento do espetáculo.',
        tagEn: 'Signature Cocktails',
        tagPt: 'Cocktails de Assinatura',
      },
      {
        id: 'photo-grid-7',
        type: 'image',
        src: galleryItem7,
        category: 'ambience',
        titleEn: 'Dark Glamour & Nocturnal Sophistication',
        titlePt: 'Glamour Obscuro & Sofisticação Noturna',
        descEn: 'Where high fashion meets cabaret mystery. Albufeira’s undisputed reference in premier nightlife.',
        descPt: 'Onde a alta elegância se cruza com o mistério do cabaret. A referência noturna de Albufeira.',
        tagEn: 'Albufeira Nights',
        tagPt: 'Noites de Albufeira',
      },
      {
        id: 'photo-grid-5',
        type: 'image',
        src: galleryItem5,
        category: 'ambience',
        titleEn: 'Velvet Whispers & Candlelight',
        titlePt: 'Murmúrios de Veludo & Luz de Velas',
        descEn: 'Soft amber reflections creating a captivating atmosphere for private celebrations and couples.',
        descPt: 'Reflexos dourados suaves criando um ambiente envolvente para celebrações privadas e noites a dois.',
        tagEn: 'Intimate Setting',
        tagPt: 'Ambiente Íntimo',
      },
      {
        id: 'photo-video-highlight',
        type: 'video',
        src: galleryItem8,
        videoSrc: nightclubVideo,
        category: 'shows',
        titleEn: 'Live Cabaret & DJ Motion',
        titlePt: 'Cabaret ao Vivo & Ritmo DJ',
        descEn: 'Experience the electric rhythm, live crowd cheers, and visual pulse of Mardigras in motion.',
        descPt: 'Viva o ritmo eletrizante, a energia da multidão e a pulsação visual do Mardigras em movimento.',
        tagEn: 'Video Highlight',
        tagPt: 'Vídeo em Destaque',
        isFeatured: true,
      },
    ],
    []
  );

  // Filter items
  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return galleryItems;
    return galleryItems.filter((item) => item.category === activeFilter);
  }, [activeFilter, galleryItems]);

  // Counts for each category
  const counts = useMemo(() => {
    const map = { all: galleryItems.length, shows: 0, ambience: 0, drinks: 0, vip: 0 };
    galleryItems.forEach((item) => {
      map[item.category]++;
    });
    return map;
  }, [galleryItems]);

  // Toggle favorite / like
  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Lightbox navigation
  const handlePrev = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev! - 1));
    }
  }, [filteredItems.length, lightboxIndex]);

  const handleNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev! + 1));
    }
  }, [filteredItems.length, lightboxIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, handlePrev, handleNext]);

  // WhatsApp reservation link based on photo
  const getWhatsAppBookingLink = (item: PhotoGalleryItem) => {
    const title = language === 'en' ? item.titleEn : item.titlePt;
    const message = language === 'en'
      ? `Hello! I was admiring the gallery photo "${title}" and would like to reserve a VIP table for tonight's cabaret experience.`
      : `Olá! Estava a ver a fotografia "${title}" na vossa galeria e gostaria de reservar uma mesa VIP para esta noite.`;
    return `https://wa.me/351913208108?text=${encodeURIComponent(message)}`;
  };

  // Copy share link
  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // Fallback
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const currentLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div id="photo-gallery-root" className="w-full">
      {/* Atmosphere Highlights Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-2xl bg-[#080808] border border-neutral-900 shadow-xl">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800/60">
            <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-white uppercase tracking-wider">
                {language === 'en' ? 'Live Cabaret' : 'Cabaret ao Vivo'}
              </p>
              <p className="text-[10px] text-neutral-400">
                {language === 'en' ? 'Shows from 23:00' : 'Espetáculos das 23:00'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800/60">
            <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-white uppercase tracking-wider">
                {language === 'en' ? 'VIP Lounges' : 'Lounges VIP'}
              </p>
              <p className="text-[10px] text-neutral-400">
                {language === 'en' ? 'Exclusive velvet booths' : 'Camarotes de veludo'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800/60">
            <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
              <GlassWater className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-white uppercase tracking-wider">
                {language === 'en' ? 'Top Mixology' : 'Alta Mixologia'}
              </p>
              <p className="text-[10px] text-neutral-400">
                {language === 'en' ? 'Cocktails & Cuvée' : 'Cocktails & Champanhes'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800/60">
            <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
              <Music className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-white uppercase tracking-wider">
                {language === 'en' ? 'Night Pulse' : 'Ritmo da Noite'}
              </p>
              <p className="text-[10px] text-neutral-400">
                {language === 'en' ? 'DJ Party until 05:00' : 'Festa e DJ até às 05:00'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Category Filters & Layout Switcher */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-neutral-900">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            {[
              { key: 'all' as const, label: t.gallery.filterAll, count: counts.all },
              { key: 'shows' as const, label: t.gallery.filterPerformances, count: counts.shows },
              { key: 'ambience' as const, label: t.gallery.filterAmbience, count: counts.ambience },
              { key: 'drinks' as const, label: t.gallery.filterDrinks, count: counts.drinks },
              { key: 'vip' as const, label: t.gallery.filterVip, count: counts.vip },
            ].map((tab) => {
              const isActive = activeFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  id={`gallery-filter-${tab.key}`}
                  onClick={() => {
                    setActiveFilter(tab.key);
                    setLightboxIndex(null);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gold text-black shadow-md shadow-gold/25 font-bold border border-gold'
                      : 'bg-[#0a0a0a] text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-black/30 text-black' : 'bg-neutral-900 text-neutral-400'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Layout Toggle */}
          <div className="flex items-center gap-2 bg-[#0a0a0a] p-1 rounded-xl border border-neutral-800/80">
            <button
              id="gallery-layout-mosaic"
              onClick={() => setLayoutMode('mosaic')}
              className={`p-2 rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                layoutMode === 'mosaic'
                  ? 'bg-gold/20 text-gold border border-gold/40'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
              title={language === 'en' ? 'Curated Editorial Mosaic' : 'Mosaico Editorial'}
            >
              <Columns3 className="w-4 h-4" />
              <span className="hidden md:inline text-[11px] font-medium tracking-wide">
                {language === 'en' ? 'Editorial' : 'Editorial'}
              </span>
            </button>

            <button
              id="gallery-layout-grid"
              onClick={() => setLayoutMode('grid')}
              className={`p-2 rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                layoutMode === 'grid'
                  ? 'bg-gold/20 text-gold border border-gold/40'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
              title={language === 'en' ? 'Uniform Grid' : 'Grelha Uniforme'}
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden md:inline text-[11px] font-medium tracking-wide">
                {language === 'en' ? 'Grid' : 'Grelha'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Cards Grid / Mosaic */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          layout
          className={
            layoutMode === 'mosaic'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 auto-rows-[280px]'
              : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6'
          }
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const isLiked = likedIds.has(item.id);
              const isMosaicSpan = layoutMode === 'mosaic' && (index === 0 || index === 7);

              return (
                <motion.div
                  layout
                  key={item.id}
                  id={`gallery-card-${item.id}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  onClick={() => setLightboxIndex(index)}
                  className={`group relative rounded-2xl overflow-hidden bg-[#090909] border border-neutral-900/90 hover:border-gold/50 cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.18)] transition-all ${
                    layoutMode === 'mosaic'
                      ? isMosaicSpan
                        ? 'sm:col-span-2 row-span-1 sm:row-span-2 min-h-[300px]'
                        : 'col-span-1 row-span-1'
                      : 'aspect-[4/3]'
                  }`}
                >
                  {/* Photo / Media Content */}
                  <img
                    src={item.src}
                    alt={language === 'en' ? item.titleEn : item.titlePt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />

                  {/* Top Floating Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-gold/30 text-gold text-[10px] font-mono tracking-wider uppercase font-semibold flex items-center gap-1.5 shadow-sm">
                      <Sparkles className="w-3 h-3 text-gold" />
                      {language === 'en' ? item.tagEn : item.tagPt}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {/* Favorite Button */}
                      <button
                        onClick={(e) => toggleLike(item.id, e)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition-all cursor-pointer ${
                          isLiked
                            ? 'bg-red-500/20 border-red-500 text-red-400'
                            : 'bg-black/60 border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700'
                        }`}
                        title={isLiked ? 'Favorited' : 'Favorite'}
                        aria-label="Favorite photo"
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>

                      {/* Video / Zoom Icon */}
                      <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-neutral-800 flex items-center justify-center text-neutral-300 group-hover:text-gold group-hover:border-gold/40 transition-colors">
                        {item.type === 'video' ? (
                          <Play className="w-3.5 h-3.5 fill-gold text-gold pl-0.5" />
                        ) : (
                          <Maximize2 className="w-3.5 h-3.5" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Information Card */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10 flex flex-col justify-end">
                    <h3 className="font-serif text-base sm:text-lg font-semibold text-white tracking-wide group-hover:text-gold-light transition-colors line-clamp-1">
                      {language === 'en' ? item.titleEn : item.titlePt}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-neutral-300 mt-1 line-clamp-2 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                      {language === 'en' ? item.descEn : item.descPt}
                    </p>

                    {/* Quick WhatsApp Action prompt visible on hover */}
                    <div className="mt-2.5 pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[10px] text-gold font-mono tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
                      <span>{language === 'en' ? 'Click to inspect & reserve' : 'Clique para ver & reservar'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Deluxe Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {currentLightboxItem && lightboxIndex !== null && (
          <motion.div
            id="gallery-lightbox-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-3 sm:p-6 overflow-hidden"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Toolbar */}
            <div
              className="flex items-center justify-between w-full max-w-7xl mx-auto z-20 pb-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-mono font-semibold tracking-wider uppercase">
                  {currentLightboxItem.category}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  {lightboxIndex + 1} / {filteredItems.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Share link button */}
                <button
                  onClick={handleShare}
                  className="px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Share gallery"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-[#25D366]" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? (language === 'en' ? 'Copied' : 'Copiado') : (language === 'en' ? 'Share' : 'Partilhar')}</span>
                </button>

                {/* Favorite */}
                <button
                  onClick={(e) => toggleLike(currentLightboxItem.id, e)}
                  className={`p-2 rounded-full border transition-colors cursor-pointer ${
                    likedIds.has(currentLightboxItem.id)
                      ? 'bg-red-500/20 border-red-500 text-red-400'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                  aria-label="Favorite in lightbox"
                >
                  <Heart className={`w-4 h-4 ${likedIds.has(currentLightboxItem.id) ? 'fill-red-500' : ''}`} />
                </button>

                {/* Close Button */}
                <button
                  id="lightbox-close-btn"
                  onClick={() => setLightboxIndex(null)}
                  className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-white hover:text-gold hover:border-gold/50 transition-colors cursor-pointer"
                  aria-label="Close lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Central Media Viewer & Nav Arrows */}
            <div className="relative flex-1 flex items-center justify-center w-full max-w-6xl mx-auto my-auto min-h-0 py-2">
              {/* Prev Button */}
              <button
                id="lightbox-prev-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-2 sm:left-4 z-30 p-3 rounded-full bg-black/70 hover:bg-neutral-900 border border-neutral-800 hover:border-gold/50 text-white hover:text-gold transition-all cursor-pointer shadow-xl backdrop-blur-md"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Main Media Item */}
              <div
                className="max-h-[62vh] max-w-full flex items-center justify-center select-none"
                onClick={(e) => e.stopPropagation()}
              >
                {currentLightboxItem.type === 'video' && currentLightboxItem.videoSrc ? (
                  <div className="relative rounded-2xl overflow-hidden border border-gold/40 shadow-[0_0_30px_rgba(212,175,55,0.25)] bg-black max-h-[60vh]">
                    <video
                      key={currentLightboxItem.id}
                      src={currentLightboxItem.videoSrc}
                      controls
                      autoPlay
                      playsInline
                      className="max-h-[60vh] max-w-full rounded-2xl object-contain"
                    />
                  </div>
                ) : (
                  <motion.img
                    key={currentLightboxItem.id}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                    src={currentLightboxItem.src}
                    alt={language === 'en' ? currentLightboxItem.titleEn : currentLightboxItem.titlePt}
                    referrerPolicy="no-referrer"
                    className="max-h-[60vh] max-w-full rounded-2xl object-contain border border-gold/30 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                  />
                )}
              </div>

              {/* Next Button */}
              <button
                id="lightbox-next-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2 sm:right-4 z-30 p-3 rounded-full bg-black/70 hover:bg-neutral-900 border border-neutral-800 hover:border-gold/50 text-white hover:text-gold transition-all cursor-pointer shadow-xl backdrop-blur-md"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption & Instant Reservation Strip */}
            <div
              className="w-full max-w-4xl mx-auto z-20 pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0a0a0a]/90 backdrop-blur-md p-4 rounded-2xl border border-neutral-800/90"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-1 text-center sm:text-left flex-1 min-w-0">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h4 className="font-serif text-base sm:text-lg font-semibold text-white tracking-wide truncate">
                    {language === 'en' ? currentLightboxItem.titleEn : currentLightboxItem.titlePt}
                  </h4>
                  <span className="text-[10px] font-mono text-gold px-2 py-0.5 rounded-full bg-gold/10 border border-gold/20 shrink-0">
                    {language === 'en' ? currentLightboxItem.tagEn : currentLightboxItem.tagPt}
                  </span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2 max-w-2xl">
                  {language === 'en' ? currentLightboxItem.descEn : currentLightboxItem.descPt}
                </p>
              </div>

              {/* Instant WhatsApp Reservation for this performance/ambience */}
              <a
                href={getWhatsAppBookingLink(currentLightboxItem)}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-[0_0_15px_rgba(37,211,102,0.4)] cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.428 1.98 13.96 1.05 11.47 1.05 6.03 1.05 1.61 5.424 1.606 10.856c-.001 1.704.451 3.371 1.31 4.887L1.93 20.17l4.717-1.016zM17.41 14.92c-.317-.159-1.88-.93-2.172-1.036-.29-.105-.503-.159-.714.159-.211.318-.818 1.036-1.003 1.248-.185.21-.37.238-.687.08-1.3-.647-2.316-1.185-3.232-2.76-.242-.415.242-.385.693-1.285.074-.15.037-.282-.019-.395-.056-.113-.503-1.218-.69-1.667-.181-.438-.364-.378-.503-.385-.13-.006-.279-.007-.428-.007-.15 0-.395.056-.602.282-.207.227-.79.773-.79 1.884s.806 2.186.918 2.337c.112.15 1.583 2.427 3.834 3.4s2.996 1.157 3.541 1.012c1.17-.31 1.88-1.22 2.17-2.036z"/>
                </svg>
                <span>{language === 'en' ? 'Book VIP Table' : 'Reservar Mesa VIP'}</span>
              </a>
            </div>

            {/* Thumbnail Strip for Rapid Navigation */}
            <div
              className="w-full max-w-4xl mx-auto overflow-x-auto py-2 flex items-center justify-center gap-2 z-20 no-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {filteredItems.map((thumb, idx) => (
                <button
                  key={`thumb-${thumb.id}`}
                  onClick={() => setLightboxIndex(idx)}
                  className={`relative w-12 h-10 rounded-lg overflow-hidden shrink-0 border transition-all cursor-pointer ${
                    idx === lightboxIndex
                      ? 'border-gold scale-110 shadow-[0_0_10px_rgba(212,175,55,0.4)] opacity-100'
                      : 'border-neutral-800 opacity-50 hover:opacity-80'
                  }`}
                  aria-label={`Jump to photo ${idx + 1}`}
                >
                  <img
                    src={thumb.src}
                    alt=""
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {thumb.type === 'video' && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Play className="w-2.5 h-2.5 fill-gold text-gold" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
