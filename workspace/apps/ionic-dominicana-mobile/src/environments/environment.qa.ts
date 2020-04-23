// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import "zone.js/dist/long-stack-trace-zone";

/**
 * Own
 */
import { FirebaseConfig } from "firebase.model";
import { Environment } from "./environment.model";

// hot-module-replacement-mode
export const environment: Environment = {
    production: false,
    showDevModule: true,
    hmr: false,
    ENV_PROVIDERS: [],
    COMMON_API_URL: "",
    firebase: FirebaseConfig,
    authPortalUrl: "",
    sessionExpirationMinutes: 300,
    sessionName: ""
};
