// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import "zone.js/dist/long-stack-trace-zone";

/**
 * Own
 */
import { FirebaseConfig } from "firebase.model";
import { Environment } from "./environment.model";

// development-mode
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
