/// <reference types="vite/client" />

declare module '*.jpg';
declare module '*.png';
declare module '*.svg';
declare module '*.mp4';

interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  readonly APP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
