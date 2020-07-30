import { Application, Context } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

// [plus - Second part]
// ENVIRONMENT VARIABLES
import "https://deno.land/x/dotenv/load.ts";

/**
 * Own
 */
import router from "./src/routes.ts";

const app = new Application();
const serverPort = 8080;

app.use(oakCors());
app.use(router.allowedMethods());
app.use(router.routes());

app.use(async (ctx) => {
    ctx.response.body = "Hello, Dominican Republic!";
});

app.listen({ port: serverPort });

console.log(`Listening on localhost: ${serverPort}`);
