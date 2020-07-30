import { Router, helpers, RouterContext } from "https://deno.land/x/oak/mod.ts";
import { MarsRoversController } from "./modules/mars/controllers/mars-rovers.controller.ts"

const router = new Router();
const marsController = new MarsRoversController();

router.get("/mars/rovers/curiosity", marsController.getMarsPhotos);

// [2da] Part - With Query Params
// const onContextParamsHandler = (ctx: RouterContext) => {
//     const params = helpers.getQuery(ctx, { mergeParams: true });
//     ctx.params = params;
//     return ctx;
// }

// router.get("/mars/rovers/curiosity", async (ctx) => {
//     await marsController.getRoverByCuriosity(onContextParamsHandler(ctx));
// });

export default router;
