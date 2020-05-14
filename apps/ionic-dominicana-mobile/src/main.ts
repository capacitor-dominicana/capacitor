import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import "hammerjs";

/**
 * Own
 */
// modules
import { AppModule } from "./app/app.module";
import { hmrBootstrap } from "./hmr";
import { environment } from "./environments/environment";

declare let module: any;

if (environment.production) {
    enableProdMode();
}

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

if (environment.hmr) {
    if ((module as any).hot) {
        hmrBootstrap(module, bootstrap);
    } else {
        console.error("HMR is not enabled for webpack-dev-server!");
        console.log("Are you using the --hmr flag for ng serve?");
    }
} else {
    bootstrap().catch(err => console.log(err));
}
