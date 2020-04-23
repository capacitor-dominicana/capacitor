import { enableProdMode } from "@angular/core";

/**
 * Own
 */
// environments
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

export { AppServerModule } from "./app/app.server.module";
export { renderModule, renderModuleFactory } from "@angular/platform-server";
