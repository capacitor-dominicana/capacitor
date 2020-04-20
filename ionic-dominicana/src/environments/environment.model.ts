/**
 * Own
 */
export interface Environment {
    production: boolean;
    ENV_PROVIDERS: any;
    COMMON_API_URL: string;
    hmr?: boolean;
    showDevModule: boolean;
    firebase?: any;
    authPortalUrl: string,
    sessionExpirationMinutes: number,
    sessionName: string
}
