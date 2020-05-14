import { Module } from "@nestjs/common";

/**
 * Own
 */
// services
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    // to do
}
