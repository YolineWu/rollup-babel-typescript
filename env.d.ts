declare global {
  namespace NodeJS {
    interface ProcessEnv {
      STR_ENV_VAR: string;
      BOOL_ENV_VAR: string;
      NUMBER_ENV_VAR: string;
    }
  }
}

export {};
