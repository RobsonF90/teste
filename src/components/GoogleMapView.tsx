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

      {/* Transit & Landmarks Guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
        <div className="bg-[#0e0e0e] border border-neutral-900 rounded-xl p-3.5">
          <h4 className="text-[11px] font-mono font-semibold tracking-wide text-white uppercase flex items-center gap-1.5 mb-2.5">
            <MapPin className="w-3.5 h-3.5 text-gold" />
            <span>{language === 'en' ? 'Nearby Distances' : 'Distâncias Principais'}</span>
          </h4>
          <ul className="space-y-1.5">
            {landmarks.map((lm, idx) => (
              <li key={idx} className="flex justify-between items-center text-xs text-neutral-300">
                <span className="truncate pr-2">{lm.name}</span>
                <span className="text-[11px] font-mono text-gold shrink-0">{lm.distance}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#0e0e0e] border border-neutral-900 rounded-xl p-3.5 flex flex-col justify-between">
          <div>
            <h4 className="text-[11px] font-mono font-semibold tracking-wide text-white uppercase flex items-center gap-1.5 mb-2">
              <Clock className="w-3.5 h-3.5 text-gold" />
              <span>{language === 'en' ? 'Arriving at the Venue' : 'Como Chegar'}</span>
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed mb-3">
              {language === 'en'
                ? 'We recommend arriving by taxi or rideshare (Uber/Bolt) directly to R. Fernão de Magalhães. Discreet valet and VIP parking assistance available upon request.'
                : 'Recomendamos chegar de táxi ou TVDE (Uber/Bolt) diretamente à R. Fernão de Magalhães. Assistência de estacionamento VIP e discreto disponível mediante pedido.'}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-neutral-800/60">
            <a
              href="https://wa.me/351913208108?text=Olá,%20gostaria%20de%20solicitar%20informações%20de%20chegada%20ou%20transporte%20para%20o%20Mardigras."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-gold-light transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>{language === 'en' ? 'Request VIP Shuttle/Transfer via WhatsApp' : 'Pedir Transfer/Shuttle VIP por WhatsApp'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
