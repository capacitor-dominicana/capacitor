import { Module } from "@nestjs/common";
import { AngularUniversalModule } from "@nestjs/ng-universal";
import { join } from "path";

/**
 * Own
 */
import { AppServerModule } from "apps/ionic-dominicana-web/src/app/app.server.module";

@Module({
    imports: [
        AngularUniversalModule.forRoot({
            bootstrap: AppServerModule,
            viewsPath: join(process.cwd(), "dist/ionic-dominicana-web/browser"),
        }),
    ],
})
export class AppModule {
    // to do
}
