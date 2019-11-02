declare namespace NodeJS {
  interface ProcessEnv {
    readonly SECRET_KVDB_BUCKET: string;
    readonly SECRET_KVDB_KEY_PREFIX: string;
    readonly SECRET_KVDB_READKEY: string;
    readonly SECRET_KVDB_WRITEKEY: string;
    readonly SECRET_SLACK_WEBHOOK_URL: string;
    readonly SECRET_USER_UPDATE_MASTER_KEY: string;
    readonly SECRET_SERVICE_UPDATE_KEY: string;
    readonly IS_NOW: string;
  }
}
