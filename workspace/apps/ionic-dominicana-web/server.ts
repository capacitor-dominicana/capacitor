import "zone.js/dist/zone-node";

import { APP_BASE_HREF } from "@angular/common";
import { ngExpressEngine } from "@nguniversal/express-engine";
import { join } from "path";
import { existsSync } from "fs";
import * as express from "express";

/**
 * OWn
 */
import { AppServerModule } from "./src/main.server";

// the Express app is exported so that it can be used by serverless Functions.
export function app() {
    const server = express();
    const distFolder = join(process.cwd(), "dist/ionic-dominicana-web/browser");
    const indexHtml = existsSync(join(distFolder, "index.original.html"))
        ? "index.original.html"
        : "index";

    // our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
    server.engine(
        "html",
        ngExpressEngine({
            bootstrap: AppServerModule,
        })
    );

    server.set("view engine", "html");
    server.set("views", distFolder);

    // example Express Rest API endpoints
    // app.get("/api/**", (req, res) => { });
    // serve static files from /browser
    server.get(
        "*.*",
        express.static(distFolder, {
            maxAge: "1y",
        })
    );

    // All regular routes use the Universal engine
    server.get("*", (req, res) => {
        res.render(indexHtml, {
            req,
            providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
        });
    });

    return server;
}

function run() {
    const port = process.env.PORT || 4000;

    // Start up the Node server
    const server = app();
    server.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
}

// webpack will replace "require" with "__webpack_require__"
// "__non_webpack_require__" is a proxy to Node "require"
// the below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || "";
if (moduleFilename === __filename || moduleFilename.includes("iisnode")) {
    run();
}

export * from "./src/main.server";
