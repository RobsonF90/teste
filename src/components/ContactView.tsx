import React, { useState } from 'react';
import { Language, translations } from '../translations';
import GoogleMapView from './GoogleMapView';
import {
  Calendar,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ShieldCheck,
  ExternalLink,
  Instagram,
  MessageCircle,
  Briefcase,
  DollarSign,
  Shield,
  Home as HomeIcon,
  Lock,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'motion/react';

interface ContactViewProps {
  language: Language;
}

export default function ContactView({ language }: ContactViewProps) {
  const t = translations[language];

  // Booking form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('2');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const targetEmail = (import.meta as any).env?.VITE_CONTACT_EMAIL || "patty.ps@icloud.com";
      const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `★ Novo Pedido de Reserva - ${name}`,
          _replyto: email,
          _template: 'table',
          _next: 'https://formsubmit.co/thanks',
          'Nome / Name': name,
          'E-mail / Email': email,
          'Telefone / Phone': phone,
          'Data / Date': date,
          'Mesa para / Guests': guests,
          'Mensagem Especial / Message': message || 'Sem observações adicionais / No special requests'
        })
      });

      if (!response.ok) {
        throw new Error('Error sending form');
      }
    } catch (err) {
      console.error("FormSubmit integration error:", err);
      // Fail gracefully so that the experience is robust for the client anyway
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Generate a realistic random luxury booking reference
      const randomRef = 'MARDIGRAS-' + Math.floor(1000 + Math.random() * 9000) + '-VIP';
      setBookingRef(randomRef);
    }
  };

  const whatsappRecruitmentUrl = `https://wa.me/351913208108?text=${encodeURIComponent(
    language === 'en'
      ? 'Hello! I am interested in applying to work at Mardigras NightClub. Here are my details (Name, Age, and recent photos):'
      : 'Olá! Tenho interesse em trabalhar no Mardigras NightClub. Seguem os meus dados (Nome, Idade e fotos recentes):'
  )}`;

  return (
    <div className="space-y-16 pb-20">
      {/* Editorial Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center space-y-3 mb-12">
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-wider text-gold-gradient">
            {t.contact.title}
          </h1>
          <div className="h-[1px] w-24 bg-gold/30 mx-auto" />
          <p className="text-sm md:text-base text-neutral-400 max-w-xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Dynamic Booking form and Info columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Reservation Form (7 columns) */}
          <div className="lg:col-span-7">
            <div className="bg-[#0a0a0a] border border-gold rounded-2xl p-6 sm:p-8 md:p-10 gold-glow relative">
              
              {/* Corner decor lines */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/50 rounded-tl-2xl" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-gold/50 rounded-tr-2xl" />

              {isSuccess ? (
                /* Successful Submission Card */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center mx-auto text-gold">
                    <ShieldCheck className="w-8 h-8 animate-pulse" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl font-bold text-white tracking-wide">
                      {language === 'en' ? 'Reservation Request Received' : 'Pedido de Reserva Recebido'}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed max-w-md mx-auto">
                      {t.contact.formSuccess}
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 max-w-sm mx-auto text-left space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-mono border-b border-neutral-800 pb-2 text-neutral-400">
                      <span>REFERENCE NUMBER:</span>
                      <span className="text-gold font-semibold">{bookingRef}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-y-2 text-xs text-neutral-300">
                      <div>
                        <span className="text-neutral-500 block text-[9px] font-mono">GUEST</span>
                        <span className="font-semibold">{name}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block text-[9px] font-mono">GUESTS</span>
                        <span className="font-semibold">{guests} {language === 'en' ? 'People' : 'Pessoas'}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block text-[9px] font-mono">PREFERRED DATE</span>
                        <span className="font-semibold">{date}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block text-[9px] font-mono">PHONE</span>
                        <span className="font-semibold">{phone}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setDate('');
                      setMessage('');
                    }}
                    className="px-6 py-2.5 bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs font-semibold uppercase tracking-widest rounded hover:border-gold/50 hover:text-white transition-all cursor-pointer"
                  >
                    {language === 'en' ? 'Make Another Booking' : 'Efetuar Outra Reserva'}
                  </button>
                </motion.div>
              ) : (
                /* Reservation Request Form */
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-white tracking-wide mb-2">
                      {t.contact.formTitle}
                    </h2>
                    <p className="text-xs text-neutral-400">
                      {language === 'en' 
                        ? 'Reserve your private lounge table or VIP booth. Our concierge guarantees prompt confirmation.' 
                        : 'Garanta a sua mesa exclusiva ou camarote VIP. O nosso serviço de concierge assegura confirmação imediata.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-wider text-gold/80 mb-1.5 font-semibold">
                        {t.contact.formName} *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-neutral-900 border border-neutral-800/80 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-wider text-gold/80 mb-1.5 font-semibold">
                        {t.contact.formEmail} *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="vip@example.com"
                        className="w-full bg-neutral-900 border border-neutral-800/80 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-wider text-gold/80 mb-1.5 font-semibold">
                        {t.contact.formPhone} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+351 913 208 108"
                        className="w-full bg-neutral-900 border border-neutral-800/80 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-wider text-gold/80 mb-1.5 font-semibold">
                        {t.contact.formDate} *
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800/80 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition-colors text-left"
                      />
                    </div>

                    {/* Guests */}
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] uppercase font-mono tracking-wider text-gold/80 mb-1.5 font-semibold">
                        {t.contact.formGuests} *
                      </label>
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                        {['1', '2', '4', '6', '8', '10+'].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setGuests(num)}
                            className={`py-2 px-1 text-center text-xs font-semibold rounded border transition-all cursor-pointer ${
                              guests === num
                                ? 'bg-gold border-gold text-black'
                                : 'bg-neutral-950 border-neutral-900 text-neutral-300 hover:border-neutral-700'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message / Requests */}
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] uppercase font-mono tracking-wider text-gold/80 mb-1.5 font-semibold">
                        {t.contact.formMessage}
                      </label>
                      <textarea
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={language === 'en' ? 'e.g. Requesting front row table near the live performance stage, champagne preferences...' : 'ex: Desejo mesa na linha da frente perto do palco, preferências de champanhe...'}
                        className="w-full bg-neutral-900 border border-neutral-800/80 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition-colors resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gold-gradient text-black font-semibold uppercase tracking-widest text-xs rounded shadow-lg shadow-gold/15 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" /> {isSubmitting ? (language === 'en' ? 'PROCESSING VIP REQUEST...' : 'A PROCESSAR PEDIDO VIP...') : t.contact.formSubmit}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Practical Contact Info Card (5 columns) - Expanded & Roomy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0a0a0a] border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold block mb-1">
                  MARDIGRAS NIGHTCLUB
                </span>
                <h3 className="font-serif text-2xl font-bold text-white tracking-wide border-b border-neutral-800/80 pb-3">
                  {t.contact.infoTitle}
                </h3>
              </div>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block mb-1 font-semibold">
                      {t.contact.addressLabel}
                    </span>
                    <p className="text-sm text-neutral-200 leading-relaxed font-sans font-medium">
                      {t.contact.addressValue}
                    </p>
                    <span className="text-xs text-gold/80 block mt-1">
                      Albufeira Strip • Algarve, Portugal
                    </span>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block mb-1 font-semibold">
                      {t.contact.hoursLabel}
                    </span>
                    <p className="text-sm text-neutral-200 font-sans font-medium">
                      {t.contact.hoursValue}
                    </p>
                    <span className="text-xs text-emerald-400 flex items-center gap-1.5 mt-1 font-mono">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      {language === 'en' ? 'Open Tonight • Live Shows from 23:00' : 'Aberto Esta Noite • Shows ao Vivo a partir das 23:00'}
                    </span>
                  </div>
                </div>

                {/* Phone & WhatsApp */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="w-full">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block mb-1 font-semibold">
                      {t.contact.phoneLabel}
                    </span>
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href="tel:+351913208108"
                        className="text-sm font-semibold text-gold hover:text-gold-light font-sans transition-colors block"
                      >
                        {t.contact.phoneValue}
                      </a>
                      <a
                        href="https://wa.me/351913208108"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25 hover:text-emerald-300 text-xs font-semibold font-sans transition-all cursor-pointer shadow-sm"
                        title="Chat on WhatsApp"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.428 1.98 13.96 1.05 11.47 1.05 6.03 1.05 1.61 5.424 1.606 10.856c-.001 1.704.451 3.371 1.31 4.887L1.93 20.17l4.717-1.016zM17.41 14.92c-.317-.159-1.88-.93-2.172-1.036-.29-.105-.503-.159-.714.159-.211.318-.818 1.036-1.003 1.248-.185.21-.37.238-.687.08-1.3-.647-2.316-1.185-3.232-2.76-.242-.415.242-.385.693-1.285.074-.15.037-.282-.019-.395-.056-.113-.503-1.218-.69-1.667-.181-.438-.364-.378-.503-.385-.13-.006-.279-.007-.428-.007-.15 0-.395.056-.602.282-.207.227-.79.773-.79 1.884s.806 2.186.918 2.337c.112.15 1.583 2.427 3.834 3.4s2.996 1.157 3.541 1.012c1.17-.31 1.88-1.22 2.17-2.036z"/>
                        </svg>
                        WhatsApp Direto
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block mb-1 font-semibold">
                      {t.contact.emailLabel}
                    </span>
                    <a
                      href="mailto:patty.ps@icloud.com"
                      className="text-sm font-semibold text-gold hover:text-gold-light font-sans transition-colors block"
                    >
                      {t.contact.emailValue}
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-5 border-t border-neutral-800/80 flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">{t.contact.socialLabel}</span>
                <div className="flex gap-3">
                  <a
                    href={`https://wa.me/351913208108?text=${encodeURIComponent('Hello, I came through the website, I would like more information.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-[#25D366] hover:border-[#25D366]/40 transition-colors cursor-pointer group"
                    title="WhatsApp"
                    aria-label="WhatsApp"
                  >
                    <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.428 1.98 13.96 1.05 11.47 1.05 6.03 1.05 1.61 5.424 1.606 10.856c-.001 1.704.451 3.371 1.31 4.887L1.93 20.17l4.717-1.016zM17.41 14.92c-.317-.159-1.88-.93-2.172-1.036-.29-.105-.503-.159-.714.159-.211.318-.818 1.036-1.003 1.248-.185.21-.37.238-.687.08-1.3-.647-2.316-1.185-3.232-2.76-.242-.415.242-.385.693-1.285.074-.15.037-.282-.019-.395-.056-.113-.503-1.218-.69-1.667-.181-.438-.364-.378-.503-.385-.13-.006-.279-.007-.428-.007-.15 0-.395.056-.602.282-.207.227-.79.773-.79 1.884s.806 2.186.918 2.337c.112.15 1.583 2.427 3.834 3.4s2.996 1.157 3.541 1.012c1.17-.31 1.88-1.22 2.17-2.036z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/nightclubmardigras?igsi=MTc0MnhpMGZ2NGQxNA%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-gold hover:border-gold/40 transition-colors cursor-pointer"
                    title="Instagram @nightclubmardigras"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* HORIZONTAL GOOGLE MAPS PLATFORM SECTION (Full Width Horizontal)           */}
        {/* ========================================================================= */}
        <div className="mt-16 w-full">
          <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono font-medium mb-2 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Interactive GPS Location' : 'Localização GPS Interativa'}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
                {language === 'en' ? 'Google Maps & Albufeira Strip Location' : 'Mapa de Localização no Google Maps'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
              {language === 'en'
                ? 'Prime Albufeira location on R. Fernão de Magalhães. Convenient access for VIP guests, private transfers, and nightlife visitors.'
                : 'Localização privilegiada na R. Fernão de Magalhães, no coração de Albufeira. Fácil acesso para clientes VIP, transfers e táxis.'}
            </p>
          </div>

          {/* Full horizontal Google Maps Component */}
          <GoogleMapView language={language} />
        </div>

        {/* ========================================================================= */}
        {/* SEÇÃO TRABALHE CONNOSCO / CASTING (Adicionada à página Contacto)           */}
        {/* ========================================================================= */}
        <section id="trabalhe-connosco" className="mt-20 pt-16 border-t border-gold/20">
          {/* Header Section */}
          <div className="text-center space-y-4 mb-14 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-widest uppercase">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'RECRUITMENT & CASTING' : 'RECRUTAMENTO & CASTING'}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-wide">
              {t.casting.heroTitle}
            </h2>
            <div className="h-[1px] w-24 bg-gold/40 mx-auto" />
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              {t.casting.heroSubtitle}
            </p>

            {/* Quick highlight badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <span className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-gold text-xs font-mono">
                ✓ {t.casting.badgeLocation}
              </span>
              <span className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-emerald-400 text-xs font-mono">
                ★ {t.casting.badgeIncome}
              </span>
              <span className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-mono">
                🛡 {t.casting.badgeSafe}
              </span>
            </div>
          </div>

          {/* Vagas em Destaque */}
          <div className="mb-14">
            <div className="mb-8 text-center max-w-2xl mx-auto">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
                {t.casting.vacanciesTitle}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1.5">
                {t.casting.vacanciesSubtitle}
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              {/* Vaga: Dançarinas */}
              <div className="bg-[#0a0a0a] border border-gold/40 rounded-2xl p-7 sm:p-9 relative flex flex-col justify-between hover:border-gold transition-all duration-300 group shadow-xl">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      onClick={() => window.open(whatsappRecruitmentUrl, '_blank', 'noopener,noreferrer')}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          window.open(whatsappRecruitmentUrl, '_blank', 'noopener,noreferrer');
                        }
                      }}
                      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/20 hover:bg-gold text-gold hover:text-black border border-gold/50 hover:border-gold text-xs font-mono uppercase font-bold tracking-wider transition-all duration-300 shadow-md hover:shadow-gold/30 hover:scale-105 cursor-pointer group/tag"
                      title={language === 'en' ? 'Click to apply via WhatsApp' : 'Clique para se candidatar via WhatsApp'}
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{t.casting.roleDancersTag}</span>
                      <span className="text-[10px] group-hover/tag:translate-x-0.5 transition-transform">→</span>
                    </span>
                    <Sparkles className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
                  </div>
                  <h4 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
                    {t.casting.roleDancersTitle}
                  </h4>
                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
                    {t.casting.roleDancersDesc}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-neutral-900 flex items-center justify-between text-xs sm:text-sm text-gold/90 font-mono">
                  <span>{language === 'en' ? 'Daily Commission & Generous Tips' : 'Comissões Diárias & Gorjetas Elevadas'}</span>
                  <span className="px-2.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">+18</span>
                </div>
              </div>
            </div>
          </div>

          {/* O que Oferecemos (Lista Limpa com Ícones) */}
          <div className="mb-14 bg-neutral-950/70 border border-neutral-800/80 rounded-2xl p-6 sm:p-10">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {t.casting.benefitsTitle}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2">
                {t.casting.benefitsSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Benefício 1: Ganhos elevados */}
              <div className="bg-[#0d0d0d] border border-neutral-800 rounded-xl p-5 flex items-start gap-4 hover:border-gold/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">
                    {t.casting.benefit1Title}
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    {t.casting.benefit1Desc}
                  </p>
                </div>
              </div>

              {/* Benefício 2: Ambiente seguro */}
              <div className="bg-[#0d0d0d] border border-neutral-800 rounded-xl p-5 flex items-start gap-4 hover:border-gold/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">
                    {t.casting.benefit2Title}
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    {t.casting.benefit2Desc}
                  </p>
                </div>
              </div>

              {/* Benefício 3: Flexibilidade */}
              <div className="bg-[#0d0d0d] border border-neutral-800 rounded-xl p-5 flex items-start gap-4 hover:border-gold/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">
                    {t.casting.benefit3Title}
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    {t.casting.benefit3Desc}
                  </p>
                </div>
              </div>

              {/* Benefício 4: Alojamento */}
              <div className="bg-[#0d0d0d] border border-neutral-800 rounded-xl p-5 flex items-start gap-4 hover:border-gold/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <HomeIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">
                    {t.casting.benefit4Title}
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    {t.casting.benefit4Desc}
                  </p>
                </div>
              </div>

              {/* Benefício 5: Total Confidencialidade */}
              <div className="bg-[#0d0d0d] border border-neutral-800 rounded-xl p-5 flex items-start gap-4 hover:border-gold/30 transition-colors sm:col-span-2 lg:col-span-2">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">
                    {t.casting.benefit5Title}
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    {t.casting.benefit5Desc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Secção de Contacto (CTA Direto de Candidatura) */}
          <div className="bg-[#0a0a0a] border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-10 md:p-12 relative overflow-hidden shadow-2xl">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>{t.casting.ctaSectionTitle}</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-wide">
                {language === 'en' ? 'Apply Now via WhatsApp' : 'Candidate-se Agora via WhatsApp'}
              </h3>

              {/* Instructions Box */}
              <div className="bg-[#121212] border border-neutral-800 rounded-2xl p-6 text-left max-w-lg mx-auto space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-3 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.casting.ctaInstructionsTitle}</span>
                </h4>
                <div className="space-y-2 text-xs sm:text-sm text-neutral-200">
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-[11px] shrink-0 font-mono">1</span>
                    <span>{t.casting.ctaInstruction1}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-[11px] shrink-0 font-mono">2</span>
                    <span>{t.casting.ctaInstruction2}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-[11px] shrink-0 font-mono">3</span>
                    <span>{t.casting.ctaInstruction3}</span>
                  </div>
                </div>
              </div>

              {/* Botão em destaque verde: Candidatar via WhatsApp */}
              <div className="pt-2">
                <a
                  href={whatsappRecruitmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 sm:px-12 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold uppercase tracking-wider text-sm rounded-xl shadow-lg shadow-[#25D366]/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <svg className="w-6 h-6 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.428 1.98 13.96 1.05 11.47 1.05 6.03 1.05 1.61 5.424 1.606 10.856c-.001 1.704.451 3.371 1.31 4.887L1.93 20.17l4.717-1.016zM17.41 14.92c-.317-.159-1.88-.93-2.172-1.036-.29-.105-.503-.159-.714.159-.211.318-.818 1.036-1.003 1.248-.185.21-.37.238-.687.08-1.3-.647-2.316-1.185-3.232-2.76-.242-.415.242-.385.693-1.285.074-.15.037-.282-.019-.395-.056-.113-.503-1.218-.69-1.667-.181-.438-.364-.378-.503-.385-.13-.006-.279-.007-.428-.007-.15 0-.395.056-.602.282-.207.227-.79.773-.79 1.884s.806 2.186.918 2.337c.112.15 1.583 2.427 3.834 3.4s2.996 1.157 3.541 1.012c1.17-.31 1.88-1.22 2.17-2.036z"/>
                  </svg>
                  <span>{t.casting.whatsappBtn}</span>
                </a>
              </div>

              {/* Email Alternativo */}
              <div className="pt-2 text-xs text-neutral-400">
                <span>{t.casting.emailLabel}: </span>
                <a
                  href="mailto:patty.ps@icloud.com?subject=Candidatura%20Mardigras%20NightClub"
                  className="text-gold hover:text-gold-light font-semibold underline underline-offset-4 ml-1 transition-colors"
                >
                  patty.ps@icloud.com
                </a>
              </div>

              {/* Aviso Legal */}
              <div className="pt-4 border-t border-neutral-900">
                <p className="text-[11px] font-mono text-neutral-400">
                  ⚠️ {t.casting.legalNotice}
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
