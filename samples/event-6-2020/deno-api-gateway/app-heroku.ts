import { Application, Context } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import * as flags from "https://deno.land/std/flags/mod.ts";

const { args, exit } = Deno;
const DEFAULT_PORT = 8080;
const argPort = flags.parse(args).port;
const serverPort = argPort ? Number(argPort) : DEFAULT_PORT;


// [plus - Second part]
import "https://deno.land/x/dotenv/load.ts";

/**
 * Own
 */
import router from "./src/routes.ts";

if (isNaN(serverPort)) {
    console.log("Port is not number");
    exit(1);
}

const app = new Application();

app.use(oakCors());
app.use(router.allowedMethods());
app.use(router.routes());

app.use(async (ctx) => {
    ctx.response.body = "Hello, Dominican Republic!";
});

app.listen({ port: serverPort });

console.log(`Listening on localhost: ${serverPort}`);
