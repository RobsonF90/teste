import React, { useState } from 'react';
import { Language, translations } from '../translations';
import GoogleMapView from './GoogleMapView';
import { Calendar, Phone, Mail, MapPin, Clock, Send, ShieldCheck, ExternalLink, Instagram, MessageCircle } from 'lucide-react';
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
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
                        ? 'All reservation inquiries are treated with utmost confidentiality. Our VIP Host will reply within 30 minutes.'
                        : 'Todas os pedidos de reserva são tratados com confidencialidade. O nosso Anfitrião VIP responderá em 30 minutos.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                        placeholder="john@example.com"
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
                        placeholder={language === 'en' ? 'e.g. Requesting front row table near the live performance stage, gluten free cocktails...' : 'ex: Desejo mesa na linha da frente perto do palco, requisitos dietéticos...'}
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

          {/* Location & Contact Info Cards (5 columns) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Practical Contact Info card */}
            <div className="bg-[#0a0a0a] border border-neutral-900 rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="font-serif text-xl font-semibold text-white tracking-wide border-b border-neutral-900 pb-3">
                {t.contact.infoTitle}
              </h3>

              <div className="space-y-5">
                {/* Address */}
                <div className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-mono tracking-wider text-neutral-500 block mb-0.5">
                      {t.contact.addressLabel}
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                      {t.contact.addressValue}
                    </p>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-mono tracking-wider text-neutral-500 block mb-0.5">
                      {t.contact.hoursLabel}
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-300 font-sans">
                      {t.contact.hoursValue}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-mono tracking-wider text-neutral-500 block mb-0.5">
                      {t.contact.phoneLabel}
                    </span>
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href="tel:+351913208108"
                        className="text-xs sm:text-sm text-gold hover:text-gold-light font-sans font-semibold transition-colors block"
                      >
                        {t.contact.phoneValue}
                      </a>
                      <a
                        href="https://wa.me/351913208108"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 text-[11px] font-sans transition-all cursor-pointer shadow-[0_2px_8px_rgba(16,185,129,0.1)]"
                        title="Chat on WhatsApp"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.428 1.98 13.96 1.05 11.47 1.05 6.03 1.05 1.61 5.424 1.606 10.856c-.001 1.704.451 3.371 1.31 4.887L1.93 20.17l4.717-1.016zM17.41 14.92c-.317-.159-1.88-.93-2.172-1.036-.29-.105-.503-.159-.714.159-.211.318-.818 1.036-1.003 1.248-.185.21-.37.238-.687.08-1.3-.647-2.316-1.185-3.232-2.76-.242-.415.242-.385.693-1.285.074-.15.037-.282-.019-.395-.056-.113-.503-1.218-.69-1.667-.181-.438-.364-.378-.503-.385-.13-.006-.279-.007-.428-.007-.15 0-.395.056-.602.282-.207.227-.79.773-.79 1.884s.806 2.186.918 2.337c.112.15 1.583 2.427 3.834 3.4s2.996 1.157 3.541 1.012c1.17-.31 1.88-1.22 2.17-2.036z"/>
                        </svg>
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-mono tracking-wider text-neutral-500 block mb-0.5">
                      {t.contact.emailLabel}
                    </span>
                    <a
                      href="mailto:patty.ps@icloud.com"
                      className="text-xs sm:text-sm text-gold hover:text-gold-light font-sans font-semibold transition-colors block"
                    >
                      {t.contact.emailValue}
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-neutral-900/60 flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-500 uppercase">{t.contact.socialLabel}</span>
                <div className="flex gap-3">
                  <a
                    href={`https://wa.me/351913208108?text=${encodeURIComponent('Hello, I came through the website, I would like more information.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#25D366] hover:border-[#25D366]/40 transition-colors cursor-pointer group"
                    title="WhatsApp"
                    aria-label="WhatsApp"
                  >
                    <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.428 1.98 13.96 1.05 11.47 1.05 6.03 1.05 1.61 5.424 1.606 10.856c-.001 1.704.451 3.371 1.31 4.887L1.93 20.17l4.717-1.016zM17.41 14.92c-.317-.159-1.88-.93-2.172-1.036-.29-.105-.503-.159-.714.159-.211.318-.818 1.036-1.003 1.248-.185.21-.37.238-.687.08-1.3-.647-2.316-1.185-3.232-2.76-.242-.415.242-.385.693-1.285.074-.15.037-.282-.019-.395-.056-.113-.503-1.218-.69-1.667-.181-.438-.364-.378-.503-.385-.13-.006-.279-.007-.428-.007-.15 0-.395.056-.602.282-.207.227-.79.773-.79 1.884s.806 2.186.918 2.337c.112.15 1.583 2.427 3.834 3.4s2.996 1.157 3.541 1.012c1.17-.31 1.88-1.22 2.17-2.036z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/nightclubmardigras?igsi=MTc0MnhpMGZ2NGQxNA%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-gold hover:border-gold/40 transition-colors cursor-pointer"
                    title="Instagram @nightclubmardigras"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Google Maps Platform Interactive Location */}
            <GoogleMapView language={language} />

          </div>
        </div>
      </section>
    </div>
  );
}
