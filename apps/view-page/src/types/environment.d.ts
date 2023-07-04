declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NX_BASE_URL: string;
      NX_DATA_FLOW_BASE_URL: string;
      NX_CONNECTOR_BASE_URL: string;
      NX_KEYCLOCK_AUTH_SERVER_URL: string;
      NX_KEYCLOCK_DATABASE: string;
      NX_KEYCLOCK_CLIENT_ID: string;
      NX_KEYCLOCK_SECRET_KEY: string;
    }
  }
}

export {};
