/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * NASA API key used for the APOD endpoint.
   * Get a free personal key at https://api.nasa.gov (falls back to DEMO_KEY).
   */
  readonly VITE_NASA_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
