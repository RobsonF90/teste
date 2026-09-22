import React, { useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import {
  MapPin,
  Navigation,
  ExternalLink,
  Clock,
  Phone,
  Sparkles,
  Compass,
} from 'lucide-react';
import { Language } from '../translations';

// Mardigras NightClub Coordinates: Albufeira, Algarve, Portugal
const MARDIGRAS_COORDS = { lat: 37.0887, lng: -8.2498 };

interface GoogleMapViewProps {
  language: Language;
}

export default function GoogleMapView({ language }: GoogleMapViewProps) {
  const [showInfoWindow, setShowInfoWindow] = useState(true);
  const [selectedTransit, setSelectedTransit] = useState<'taxi' | 'walk' | 'car'>('taxi');

  // Check for API key from environment variable
  const apiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || '';

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=R.+Fern%C3%A3o+de+Magalh%C3%A3es,+8200-129+Albufeira,+Portugal&destination_place_id=ChIJ0R8X3E5fGQ0R3k-4X0_Ue9c`;

  const landmarks = [
    {
      name: language === 'en' ? 'Albufeira Old Town Square' : 'Praça do Centro Histórico',
      distance: '800 m (3 min drive / 10 min walk)',
    },
    {
      name: language === 'en' ? 'The Strip (Avenida Sá Carneiro)' : 'The Strip (Av. Sá Carneiro)',
      distance: '2.8 km (7 min taxi)',
    },
    {
      name: language === 'en' ? 'Albufeira Marina' : 'Marina de Albufeira',
      distance: '1.9 km (5 min taxi)',
    },
    {
      name: language === 'en' ? 'Faro Airport (FAO)' : 'Aeroporto de Faro (FAO)',
      distance: '38 km (35 min taxi / VIP transfer)',
    },
  ];

  return (
    <div className="bg-[#0a0a0a] border border-neutral-900 rounded-2xl p-4 sm:p-6 space-y-5">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold tracking-wider text-gold uppercase">
              {language === 'en' ? 'GOOGLE MAPS PLATFORM • LOCATION' : 'GOOGLE MAPS PLATFORM • LOCALIZAÇÃO'}
            </h3>
            <p className="text-[11px] text-neutral-400">
              R. Fernão de Magalhães, 8200-129 Albufeira, Portugal
            </p>
          </div>
        </div>

        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold/10 hover:bg-gold/20 border border-gold/40 text-gold text-xs font-medium transition-colors self-start sm:self-auto"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'Get Directions' : 'Obter Direções'}</span>
          <ExternalLink className="w-3 h-3 ml-0.5" />
        </a>
      </div>

      {/* Map Container */}
      <div className="relative h-80 sm:h-96 w-full bg-[#080808] border border-neutral-800 rounded-xl overflow-hidden shadow-inner">
        {apiKey ? (
          <APIProvider apiKey={apiKey} language={language}>
            <Map
              defaultCenter={MARDIGRAS_COORDS}
              defaultZoom={16}
              mapId="DEMO_MAP_ID"
              internalUsageAttributionIds={["gmp_git_agentskills_v1", "gmp_mcp_codeassist_v1_aistudio"]}
              gestureHandling="greedy"
              disableDefaultUI={false}
              className="w-full h-full"
            >
              <AdvancedMarker
                position={MARDIGRAS_COORDS}
                onClick={() => setShowInfoWindow(true)}
                title="Mardigras NightClub"
              >
                <Pin
                  background="#D4AF37"
                  borderColor="#8C6D1F"
                  glyphColor="#000000"
                  scale={1.2}
                />
              </AdvancedMarker>

              {showInfoWindow && (
                <InfoWindow
                  position={MARDIGRAS_COORDS}
                  onCloseClick={() => setShowInfoWindow(false)}
                >
                  <div className="p-1 max-w-xs text-neutral-900">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wide mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Mardigras NightClub</span>
                    </div>
                    <p className="text-[11px] text-neutral-600 mb-2">
                      R. Fernão de Magalhães, 8200-129 Albufeira
                    </p>
                    <div className="text-[11px] font-medium text-neutral-700 bg-amber-50 p-1.5 rounded border border-amber-200 mb-2.5">
                      🌙 {language === 'en' ? 'Open Every Day: 23:00 – 05:00' : 'Aberto Todos os Dias: 23:00 – 05:00'}
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-amber-600 text-white text-[11px] font-semibold py-1 px-2 rounded text-center hover:bg-amber-700 transition-colors"
                      >
                        {language === 'en' ? 'Directions' : 'Como Chegar'}
                      </a>
                      <a
                        href="https://wa.me/351913208108"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 text-white text-[11px] font-semibold py-1 px-2 rounded text-center hover:bg-emerald-700 transition-colors"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </Map>
          </APIProvider>
        ) : (
          /* Interactive Google Maps Embed with fallback */
          <div className="relative w-full h-full">
            <iframe
              title="Mardigras NightClub Location"
              src="https://maps.google.com/maps?q=R.%20Fern%C3%A3o%20de%20Magalh%C3%A3es,%208200-129%20Albufeira,%20Portugal&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Overlay badge with location tag */}
            <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-sm border border-gold/40 rounded-lg px-3 py-1.5 shadow-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-mono text-gold font-medium">
                Mardigras NightClub • Albufeira
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Transit & Landmarks Guide - Expanded Cards with Complete Untruncated Texts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
        {/* Card 1: Nearby Distances */}
        <div className="bg-[#0e0e0e] border border-neutral-800/90 rounded-xl p-5 flex flex-col justify-between hover:border-gold/30 transition-colors">
          <div>
            <div className="flex items-center gap-2 mb-3.5 pb-2.5 border-b border-neutral-800/80">
              <div className="w-7 h-7 rounded bg-gold/10 flex items-center justify-center text-gold shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                {language === 'en' ? 'Nearby Distances' : 'Distâncias Principais'}
              </h4>
            </div>
            <ul className="space-y-3">
              {landmarks.map((lm, idx) => (
                <li key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-neutral-300 pb-2 border-b border-neutral-900/60 last:border-0 last:pb-0">
                  <span className="font-medium text-neutral-200">{lm.name}</span>
                  <span className="text-[11px] font-mono text-gold shrink-0 font-semibold sm:text-right">{lm.distance}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Card 2: Arrival Guidance */}
        <div className="bg-[#0e0e0e] border border-neutral-800/90 rounded-xl p-5 flex flex-col justify-between hover:border-gold/30 transition-colors">
          <div>
            <div className="flex items-center gap-2 mb-3.5 pb-2.5 border-b border-neutral-800/80">
              <div className="w-7 h-7 rounded bg-gold/10 flex items-center justify-center text-gold shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                {language === 'en' ? 'Arriving at the Venue' : 'Indicações de Chegada'}
              </h4>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed mb-4">
              {language === 'en'
                ? 'We recommend arriving by taxi or rideshare (Uber/Bolt) directly to R. Fernão de Magalhães. Discreet valet and VIP parking assistance available upon request.'
                : 'Recomendamos chegar de táxi ou TVDE (Uber/Bolt) diretamente à R. Fernão de Magalhães, no coração de Albufeira. Assistência de estacionamento discreto e receção VIP disponíveis mediante pedido.'}
            </p>
          </div>

          <div className="pt-3 border-t border-neutral-800/70">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium text-gold hover:text-gold-light transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Open GPS in Google Maps' : 'Abrir GPS no Google Maps'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Card 3: VIP Transfer & Shuttle */}
        <div className="bg-[#0e0e0e] border border-neutral-800/90 rounded-xl p-5 flex flex-col justify-between hover:border-gold/30 transition-colors md:col-span-2 lg:col-span-1">
          <div>
            <div className="flex items-center gap-2 mb-3.5 pb-2.5 border-b border-neutral-800/80">
              <div className="w-7 h-7 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                {language === 'en' ? 'VIP Transfer & Support' : 'Transfer & Apoio VIP'}
              </h4>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed mb-4">
              {language === 'en'
                ? 'Need private transportation or personalized directions for your group? Contact our VIP team directly via WhatsApp for swift assistance.'
                : 'Necessita de transporte privado, transfer VIP ou apoio de rota para o seu grupo? Contacte diretamente a nossa equipa via WhatsApp.'}
            </p>
          </div>

          <div className="pt-3 border-t border-neutral-800/70">
            <a
              href="https://wa.me/351913208108?text=Olá,%20gostaria%20de%20solicitar%20informações%20de%20chegada%20ou%20transporte%20para%20o%20Mardigras."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 text-xs font-semibold transition-all cursor-pointer shadow-sm"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.428 1.98 13.96 1.05 11.47 1.05 6.03 1.05 1.61 5.424 1.606 10.856c-.001 1.704.451 3.371 1.31 4.887L1.93 20.17l4.717-1.016zM17.41 14.92c-.317-.159-1.88-.93-2.172-1.036-.29-.105-.503-.159-.714.159-.211.318-.818 1.036-1.003 1.248-.185.21-.37.238-.687.08-1.3-.647-2.316-1.185-3.232-2.76-.242-.415.242-.385.693-1.285.074-.15.037-.282-.019-.395-.056-.113-.503-1.218-.69-1.667-.181-.438-.364-.378-.503-.385-.13-.006-.279-.007-.428-.007-.15 0-.395.056-.602.282-.207.227-.79.773-.79 1.884s.806 2.186.918 2.337c.112.15 1.583 2.427 3.834 3.4s2.996 1.157 3.541 1.012c1.17-.31 1.88-1.22 2.17-2.036z"/>
              </svg>
              <span>{language === 'en' ? 'Request VIP Transfer' : 'Pedir Transfer VIP via WhatsApp'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
