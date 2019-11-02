declare namespace NodeJS {
  interface ProcessEnv {
    readonly SECRET_KVDB_BUCKET: string;
    readonly SECRET_KVDB_KEY_PREFIX: string;
    readonly SECRET_KVDB_READKEY: string;
    readonly SECRET_KVDB_WRITEKEY: string;
    readonly SECRET_SLACK_WEBHOOK_URL: string;
    readonly SECRET_UPDATE_KEY: string;
    readonly SECRET_PUSH_KEY: string;
    readonly IS_NOW: string;
  }
}
