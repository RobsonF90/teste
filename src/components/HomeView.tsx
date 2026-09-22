import React from 'react';
import { Language, translations } from '../translations';
import { Sparkles, GlassWater, Landmark, Calendar, ArrowRight, Play, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';
import CameraFlashEffect from './CameraFlashEffect';

// Import custom generated images
import heroCabaretShow from '../assets/images/gallery_featured_upscaled.jpg';
import clubVipLounge from '../assets/images/club_vip_lounge_1783389253637.jpg';
import galleryItem1 from '../assets/images/gallery/gallery_item_1.jpg';
import galleryItem6 from '../assets/images/gallery/gallery_item_6.jpg';
import showsFeaturedImage from '../assets/images/shows_featured_upscaled.jpg';
import luxuryEntertainmentImage from '../assets/images/pexels-nairodreyes-17750015.jpg';
import luxuryCocktailsImage from '../assets/images/premium_cocktails_bar_1790019561057.jpg';
import sensationShowImage from '../assets/images/pexels-babydov-7787568.jpg';
import atmosphereTeaserImage from '../assets/images/pexels-faizialiphotography-9463617.jpg';

interface HomeViewProps {
  language: Language;
  onNavigate: (view: 'home' | 'shows' | 'gallery' | 'about' | 'contact') => void;
}

export default function HomeView({ language, onNavigate }: HomeViewProps) {
  const t = translations[language];
  const [heroImgSrc, setHeroImgSrc] = React.useState<string>(heroCabaretShow);

  return (
    <div className="space-y-20 pb-20">
      {/* Immersive Hero Section */}
      <section className="relative h-[85vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with elegant cinema lighting */}
        <div 
          className="absolute inset-0 z-0 bg-[#080808]"
          style={{
            backgroundImage: `url(${heroImgSrc}), url('/hero-cabaret-banner.jpg'), url('/images/gallery_featured_upscaled.jpg')`,
            backgroundPosition: 'center 28%',
            backgroundSize: 'cover',
          }}
        >
          <motion.img 
            src={heroImgSrc} 
            alt="Mardigras NightClub Background" 
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onError={() => {
              // Resilient fallback chain for Hostinger deployments
              if (heroImgSrc !== '/hero-cabaret-banner.jpg') {
                setHeroImgSrc('/hero-cabaret-banner.jpg');
              } else if (heroImgSrc !== '/images/gallery_featured_upscaled.jpg') {
                setHeroImgSrc('/images/gallery_featured_upscaled.jpg');
              }
            }}
            className="w-full h-full object-cover object-[center_28%] sm:object-center select-none pointer-events-none opacity-80 brightness-105 contrast-110"
            animate={{
              scale: [1, 1.04, 1]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Subtle warm spotlights to enhance club atmosphere */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-56 h-56 bg-amber-400/20 rounded-full filter blur-3xl mix-blend-screen pointer-events-none"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-1/3 right-1/4 w-48 h-48 bg-purple-500/15 rounded-full filter blur-3xl mix-blend-screen pointer-events-none"
            animate={{ opacity: [0.15, 0.45, 0.15] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          {/* Balanced cinematic gradient overlays ensuring high text legibility without burying the image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/60 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
        </div>

        {/* Dynamic VIP & Paparazzi Camera Flash Effects */}
        <CameraFlashEffect />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="space-y-2"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-gold font-semibold font-mono block">
              {t.home.heroTagline ? (language === 'en' ? 'EXCLUSIVE LUXURY GENTLEMEN\'S CLUB' : 'GENTLEMEN\'S CLUB EXCLUSIVO DE LUXO') : ''}
            </span>
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold tracking-[0.2em] text-gold-gradient select-none">
              MARDIGRAS
            </h1>
            <h2 className="font-serif text-2xl sm:text-4xl tracking-[0.3em] text-white select-none">
              NIGHTCLUB
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sm sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed"
          >
            {t.home.heroTagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
          >
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-8 py-4 bg-gold-gradient text-black font-semibold uppercase tracking-widest text-xs rounded shadow-lg shadow-gold/20 hover:scale-105 active:scale-[0.98] transition-all cursor-pointer"
            >
              {t.home.ctaReserve}
            </button>
            <button
              onClick={() => onNavigate('shows')}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-gold/60 hover:border-gold text-gold font-semibold uppercase tracking-widest text-xs rounded hover:bg-gold/10 active:scale-[0.98] transition-all cursor-pointer"
            >
              {t.home.ctaExplore}
            </button>
          </motion.div>
        </div>
      </section>

      {/* The Stars Experience Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wider text-gold-gradient">
            {t.home.experienceTitle}
          </h2>
          <div className="h-[1px] w-24 bg-gold/30 mx-auto" />
          <p className="text-sm text-neutral-400 max-w-xl mx-auto">
            {t.home.experienceSubtitle}
          </p>
        </div>

        {/* Custom Bento Grid Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="relative overflow-hidden bg-[#0a0a0a] border border-gold rounded-xl p-6 sm:p-8 flex flex-col items-start gap-4 sm:gap-5 min-h-[220px] sm:min-h-[260px] gold-glow-hover transition-all group"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <motion.img 
                src={luxuryEntertainmentImage} 
                alt="Entretenimento ao Vivo de Luxo" 
                loading="lazy"
                decoding="async"
                className="absolute left-0 top-0 h-full w-[120%] max-w-none object-cover object-center opacity-70 group-hover:scale-105 group-hover:opacity-90 transition-all duration-700 select-none pointer-events-none"
                animate={{
                  x: ["0%", "-10%"]
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent pointer-events-none" />
              {/* Extra radial overlay to vignette the corners slightly */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(10,10,10,0.5)_100%)] pointer-events-none" />
            </div>

            {/* Content wrapped in z-10 */}
            <div className="relative z-10 flex flex-col items-start gap-3 h-full w-full">
              <h3 className="font-serif text-xl font-bold text-white tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                {t.home.exp1Title}
              </h3>
              <p className="text-sm text-neutral-100 font-medium leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
                {t.home.exp1Desc}
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="relative overflow-hidden bg-[#0a0a0a] border border-gold rounded-xl p-6 sm:p-8 flex flex-col items-start gap-4 sm:gap-5 min-h-[220px] sm:min-h-[260px] gold-glow-hover transition-all group"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <motion.img 
                src={luxuryCocktailsImage} 
                alt={t.home.exp2Title} 
                loading="lazy"
                decoding="async"
                className="absolute left-0 top-0 h-full w-[120%] max-w-none object-cover object-center opacity-70 group-hover:scale-105 group-hover:opacity-90 transition-all duration-700 select-none pointer-events-none"
                animate={{
                  x: ["0%", "-10%"]
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent pointer-events-none" />
              {/* Extra radial overlay to vignette the corners slightly */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(10,10,10,0.5)_100%)] pointer-events-none" />
            </div>

            {/* Content wrapped in z-10 */}
            <div className="relative z-10 flex flex-col items-start gap-3 h-full w-full">
              <h3 className="font-serif text-xl font-bold text-white tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                {t.home.exp2Title}
              </h3>
              <p className="text-sm text-neutral-100 font-medium leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
                {t.home.exp2Desc}
              </p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="relative overflow-hidden bg-[#0a0a0a] border border-gold rounded-xl p-6 sm:p-8 flex flex-col items-start gap-4 sm:gap-5 min-h-[220px] sm:min-h-[260px] gold-glow-hover transition-all group"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <motion.img 
                src={clubVipLounge} 
                alt="VIP Lounge Background" 
                loading="lazy"
                decoding="async"
                className="absolute left-0 top-0 h-full w-[125%] max-w-none object-cover opacity-55 group-hover:scale-105 group-hover:opacity-75 transition-all duration-700 select-none pointer-events-none"
                animate={{
                  x: ["0%", "-15%"]
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-[#0a0a0a]/30 pointer-events-none" />
              {/* Extra radial overlay to vignette the corners slightly */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(10,10,10,0.6)_100%)] pointer-events-none" />
            </div>

            {/* Content wrapped in z-10 */}
            <div className="relative z-10 flex flex-col items-start gap-3 h-full w-full">
              <h3 className="font-serif text-xl font-bold text-white tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                {t.home.exp3Title}
              </h3>
              <p className="text-sm text-neutral-100 font-medium leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
                {t.home.exp3Desc}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Promo: Tonight's Show / Show Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0a0a0a] border border-gold rounded-2xl overflow-hidden gold-glow">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Content */}
            <div className="p-8 sm:p-12 md:p-16 flex flex-col justify-center space-y-6">
              <span className="text-xs font-mono font-bold tracking-widest text-gold uppercase flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {t.home.previewShowsTitle}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white leading-tight">
                {t.home.tonightShow}
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                {t.home.tonightShowDesc}
              </p>

              {/* Action */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <button
                  onClick={() => onNavigate('shows')}
                  className="px-6 py-3 bg-[#050505] border border-gold text-gold font-semibold uppercase tracking-widest text-xs rounded hover:bg-gold hover:text-black transition-all flex items-center gap-2 cursor-pointer"
                >
                  {t.home.viewFullMenu} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Image Frame */}
            <div className="relative h-64 sm:h-96 lg:h-auto min-h-[280px] sm:min-h-[340px] overflow-hidden group">
              <img
                src={sensationShowImage}
                alt={t.home.tonightShow}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-[center_25%] sm:object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#0a0a0a] lg:via-transparent lg:to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-transparent lg:hidden pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Opening Hours & Atmosphere Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div 
          onClick={() => onNavigate('contact')}
          className="relative rounded-2xl bg-[#0a0a0a] border border-gold/40 hover:border-gold p-6 sm:p-12 md:p-16 overflow-hidden gold-glow transition-all cursor-pointer group min-h-[320px] sm:min-h-[380px]"
        >
          {/* Background Atmosphere Image */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.img 
              src={atmosphereTeaserImage} 
              alt="Mardi Gras Nightclub Atmosphere" 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-[center_30%] sm:object-[center_35%] opacity-70 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700 select-none pointer-events-none brightness-110"
            />
            {/* Cinematic gradient overlays with balanced transparency to keep image luminous and clear */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/45 to-[#0a0a0a]/35 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(10,10,10,0.65)_100%)] pointer-events-none" />
          </div>

          {/* Absolute decorative glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gold/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-xl mx-auto">
            <span className="text-xs font-semibold text-gold tracking-[0.25em] uppercase font-mono block drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              {t.home.hoursTeaser}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
              {t.home.hoursTeaserDesc}
            </h2>
            <p className="text-sm sm:text-base text-gold font-medium tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
              {language === 'en' 
                ? 'Open Every Day | 23:00 – 05:00'
                : 'Aberto Todos os Dias | 23:00 – 05:00'}
            </p>
            <p className="text-sm sm:text-base text-neutral-100 leading-relaxed font-normal drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
              {language === 'en' 
                ? 'Join us for an unforgettable night. Advance reservations by clicking the card below.'
                : 'Junte-se a nós para uma noite inesquecível. Reservas antecipadas clicando no card abaixo.'}
            </p>
            <div className="pt-4">
              <motion.button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 bg-gold-gradient text-black font-semibold uppercase tracking-widest text-xs rounded shadow-lg cursor-pointer"
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 10px 15px -3px rgba(197, 160, 89, 0.15), 0 4px 6px -2px rgba(197, 160, 89, 0.05)",
                    "0 20px 30px 2px rgba(197, 160, 89, 0.5), 0 10px 15px -3px rgba(197, 160, 89, 0.3)",
                    "0 10px 15px -3px rgba(197, 160, 89, 0.15), 0 4px 6px -2px rgba(197, 160, 89, 0.05)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ scale: 1.08 }}
              >
                {t.nav.bookNow}
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
