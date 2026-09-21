import React, { useState } from 'react';
import { Language, translations } from '../translations';
import { Play, X, ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import custom generated and enhanced images
import heroCabaretShow from '../assets/images/gallery_featured_upscaled.jpg';
import galleryItem1 from '../assets/images/gallery/gallery_item_1.jpg';
import galleryItem2 from '../assets/images/gallery/gallery_item_2.jpg';
import galleryItem3 from '../assets/images/gallery/gallery_item_3.jpg';
import galleryItem4 from '../assets/images/gallery/gallery_item_4.jpg';
import galleryItem5 from '../assets/images/gallery/gallery_item_5.jpg';
import galleryItem6 from '../assets/images/gallery/gallery_item_6.jpg';
import galleryItem7 from '../assets/images/gallery/gallery_item_7.jpg';
import galleryItem8 from '../assets/images/gallery/gallery_item_8.jpg';
import nightclubVideo from '../assets/images/gallery/video_nightclub.mp4';

interface GalleryViewProps {
  language: Language;
}

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  videoSrc?: string;
  category: 'shows' | 'ambience' | 'drinks' | 'vip';
  title: string;
  desc: string;
}

export default function GalleryView({ language }: GalleryViewProps) {
  const t = translations[language];
  const [activeFilter, setActiveFilter] = useState<'all' | 'shows' | 'ambience' | 'drinks' | 'vip'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filters = [
    { key: 'all', label: t.gallery.filterAll },
    { key: 'shows', label: t.gallery.filterPerformances },
    { key: 'ambience', label: t.gallery.filterAmbience },
    { key: 'drinks', label: t.gallery.filterDrinks },
    { key: 'vip', label: t.gallery.filterVip },
  ] as const;

  const mediaList: MediaItem[] = [
    {
      id: 'media-featured',
      type: 'image',
      src: heroCabaretShow,
      category: 'shows',
      title: language === 'en' ? 'The Grand Stage Choreography' : 'A Grande Coreografia de Palco',
      desc: language === 'en' ? 'Sensational live cabaret performance with dazzling costumes and golden stage ambiance.' : 'Performance sensacional de cabaret ao vivo com figurinos deslumbrantes e ambiente de palco dourado.',
    },
    {
      id: 'media-grid-1',
      type: 'image',
      src: galleryItem1,
      category: 'shows',
      title: language === 'en' ? 'Dazzling Stage Artistry' : 'Arte e Brilho de Palco',
      desc: language === 'en' ? 'Captivating dance choreography under the golden lights of Mardigras.' : 'Coreografia cativante de dança sob as luzes douradas do Mardigras.',
    },
    {
      id: 'media-grid-2',
      type: 'image',
      src: galleryItem2,
      category: 'ambience',
      title: language === 'en' ? 'VIP Nightlife Ambiance' : 'Ambiente Noturno VIP',
      desc: language === 'en' ? 'Immerse in the electric nightlife atmosphere surrounded by golden elegance.' : 'Mergulhe na atmosfera elétrica da noite rodeada por elegância dourada.',
    },
    {
      id: 'media-grid-3',
      type: 'image',
      src: galleryItem3,
      category: 'vip',
      title: language === 'en' ? 'Exclusive Lounges' : 'Lounges Exclusivos',
      desc: language === 'en' ? 'Intimate seating and bespoke bottle service for distinguished guests.' : 'Espaços íntimos e serviço de garrafa personalizado para convidados distintos.',
    },
    {
      id: 'media-grid-4',
      type: 'image',
      src: galleryItem4,
      category: 'shows',
      title: language === 'en' ? 'Electrifying Performances' : 'Performances Eletrizantes',
      desc: language === 'en' ? 'International dancers captivating the crowd with world-class choreographies.' : 'Bailarinas internacionais cativando o público com coreografias de nível mundial.',
    },
    {
      id: 'media-grid-5',
      type: 'image',
      src: galleryItem5,
      category: 'ambience',
      title: language === 'en' ? 'Golden Glow Moments' : 'Momentos de Luz Dourada',
      desc: language === 'en' ? 'Every detail curated to provide an unforgettable Albufeira night.' : 'Cada detalhe pensado para proporcionar uma noite inesquecível em Albufeira.',
    },
    {
      id: 'media-grid-6',
      type: 'image',
      src: galleryItem6,
      category: 'drinks',
      title: language === 'en' ? 'Luxury Spirits & Mixology' : 'Espirituosos e Mixologia de Luxo',
      desc: language === 'en' ? 'Finest champagnes, premium liquors, and handcrafted signature cocktails.' : 'Os melhores champanhes, bebidas espirituosas premium e cocktails de assinatura.',
    },
    {
      id: 'media-grid-7',
      type: 'image',
      src: galleryItem7,
      category: 'vip',
      title: language === 'en' ? 'Private Suites & Prestige' : 'Suites Privadas & Prestígio',
      desc: language === 'en' ? 'Private luxury tables with dedicated hostess service.' : 'Mesas privadas de luxo com serviço de anfitriã dedicada.',
    },
    {
      id: 'media-grid-8',
      type: 'video',
      src: galleryItem8,
      videoSrc: nightclubVideo,
      category: 'shows',
      title: language === 'en' ? 'Live Nightlife Pulse' : 'O Ritmo da Noite ao Vivo',
      desc: language === 'en' ? 'Experience the high-energy live atmosphere and vibrant dance sets.' : 'Sinta a energia viva e os vibrantes sets de dança do nosso clube.',
    },
  ];

  const filteredMedia = activeFilter === 'all'
    ? mediaList
    : mediaList.filter(item => item.category === activeFilter);

  // Helper for navigating within lightbox
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === 0 ? filteredMedia.length - 1 : prev! - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === filteredMedia.length - 1 ? 0 : prev! + 1));
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Title */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 text-center">
        <div className="space-y-3">
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-wider text-gold-gradient">
            {t.gallery.title}
          </h1>
          <div className="h-[1px] w-24 bg-gold/30 mx-auto" />
          <p className="text-sm md:text-base text-neutral-400 max-w-xl mx-auto">
            {t.gallery.subtitle}
          </p>
        </div>
      </section>

      {/* Filter Menu */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => {
                setActiveFilter(filter.key);
                setLightboxIndex(null); // Clear lightbox references to prevent index misalignment
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all cursor-pointer ${
                activeFilter === filter.key
                  ? 'bg-gold border-gold text-black shadow-md shadow-gold/20'
                  : 'bg-[#0a0a0a] border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredMedia.map((item, index) => {
              const isFirst = index === 0;
              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className={`group relative rounded-xl sm:rounded-2xl overflow-hidden bg-[#0a0a0a] border border-neutral-900 cursor-pointer gold-glow-hover transition-all ${
                    isFirst
                      ? 'col-span-1 sm:col-span-2 lg:col-span-3 aspect-[16/9] sm:aspect-[21/9] min-h-[260px] sm:min-h-[380px]'
                      : 'aspect-[4/3]'
                  }`}
                  onClick={() => setLightboxIndex(index)}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Glowing Overlay Hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent transition-opacity duration-300 flex flex-col justify-end ${
                      isFirst
                        ? 'p-6 sm:p-10 opacity-90 group-hover:opacity-100'
                        : 'p-6 opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <div className="space-y-1.5 transform transition-transform duration-300">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] sm:text-xs uppercase tracking-widest text-gold font-semibold font-mono">
                          {item.category}
                        </span>
                        {isFirst && (
                          <span className="px-2 py-0.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-[9px] font-mono tracking-wider uppercase">
                            {language === 'en' ? 'Featured' : 'Destaque'}
                          </span>
                        )}
                      </div>
                      <h3
                        className={`font-serif font-semibold text-white tracking-wide flex items-center gap-2 ${
                          isFirst ? 'text-xl sm:text-3xl lg:text-4xl' : 'text-lg'
                        }`}
                      >
                        {item.title} <Eye className={`${isFirst ? 'w-5 h-5' : 'w-4 h-4'} text-gold opacity-80`} />
                      </h3>
                      <p
                        className={`text-neutral-300 leading-relaxed ${
                          isFirst ? 'text-xs sm:text-sm max-w-2xl' : 'text-[11px] line-clamp-2'
                        }`}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Corner indicator */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/75 border border-gold/30 flex items-center justify-center opacity-90 group-hover:scale-110 transition-transform">
                    {item.type === 'video' ? (
                      <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold fill-gold pl-0.5" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Video Highlight Banner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden border border-gold/40 h-64 md:h-80 bg-[#0a0a0a] flex items-center justify-center gold-glow">
          <div className="absolute inset-0 z-0">
            <img
              src={galleryItem4}
              alt="Live Show Ambient"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70" />
          </div>

          <div className="relative z-10 text-center space-y-4 px-4 max-w-lg">
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-white">
              {t.gallery.videoTitle}
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {language === 'en'
                ? 'Enjoy professional burlesque, custom acrobatics, and luxury dance sets. Reserve your premium presence for the full sensory event.'
                : 'Desfrute de burlesco profissional, acrobacias personalizadas e sets de dança de luxo. Reserve o seu lugar premium.'}
            </p>
            <div className="pt-2 flex justify-center">
              <button
                onClick={() => {
                  const videoIndex = filteredMedia.findIndex((m) => m.type === 'video');
                  if (videoIndex !== -1) {
                    setLightboxIndex(videoIndex);
                  } else {
                    setLightboxIndex(0);
                  }
                }}
                className="w-12 h-12 rounded-full bg-gold text-black flex items-center justify-center cursor-pointer shadow-lg shadow-gold/20 hover:scale-110 active:scale-95 transition-all animate-pulse"
                aria-label="Play video"
              >
                <Play className="w-5 h-5 fill-black pl-0.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/98 flex flex-col items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white hover:text-gold-light p-2 rounded-full bg-neutral-900/80 border border-neutral-800 transition-colors z-50 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Main Lightbox Frame */}
            <div className="relative w-full max-w-5xl h-[70vh] flex items-center justify-center">
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 text-white hover:text-gold-light p-2 sm:p-3 rounded-full bg-neutral-900/80 border border-neutral-800 transition-colors z-10 cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {filteredMedia[lightboxIndex].type === 'video' && filteredMedia[lightboxIndex].videoSrc ? (
                <div
                  className="max-w-full max-h-full flex items-center justify-center rounded-lg overflow-hidden border border-gold/30 gold-glow bg-black"
                  onClick={(e) => e.stopPropagation()}
                >
                  <video
                    key={filteredMedia[lightboxIndex].id}
                    src={filteredMedia[lightboxIndex].videoSrc}
                    controls
                    autoPlay
                    playsInline
                    className="max-w-full max-h-[68vh] object-contain rounded-lg"
                  />
                </div>
              ) : (
                <motion.img
                  key={filteredMedia[lightboxIndex].id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  src={filteredMedia[lightboxIndex].src}
                  alt={filteredMedia[lightboxIndex].title}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-full object-contain rounded-lg border border-gold/30 gold-glow select-none pointer-events-none"
                  onClick={(e) => e.stopPropagation()}
                />
              )}

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 text-white hover:text-gold-light p-2 sm:p-3 rounded-full bg-neutral-900/80 border border-neutral-800 transition-colors z-10 cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Description Card */}
            <motion.div
              key={`desc-${filteredMedia[lightboxIndex].id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mt-6 text-center max-w-xl px-4 pointer-events-none select-none"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-gold uppercase block mb-1">
                {filteredMedia[lightboxIndex].category} • {lightboxIndex + 1} / {filteredMedia.length}
              </span>
              <h4 className="font-serif text-lg sm:text-xl font-semibold text-white tracking-wide">
                {filteredMedia[lightboxIndex].title}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                {filteredMedia[lightboxIndex].desc}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
