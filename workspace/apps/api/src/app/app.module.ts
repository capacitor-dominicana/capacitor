import { Module } from "@nestjs/common";
import { AngularUniversalModule } from "@nestjs/ng-universal";
import { join } from "path";

/**
 * Own
 */
import { AppServerModule } from "apps/ionic-dominicana-web/src/app/app.server.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    AngularUniversalModule.forRoot({
        viewsPath: join(process.cwd(), "dist/{APP_NAME}/browser"),
        bootstrap: AppServerModule
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // to do
}
