/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_RAPID_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}