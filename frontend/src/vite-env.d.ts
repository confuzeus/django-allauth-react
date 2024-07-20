/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly GOOGLE_LOGIN_PROVIDER_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
