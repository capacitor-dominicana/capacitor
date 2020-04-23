import { NgModule, Optional, SkipSelf } from "@angular/core";
import { RouteReuseStrategy } from "@angular/router";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

/**
 * Own
 */
// workspace elements
import { throwIfAlreadyLoaded } from "@workspace/utils";
import { WorkspaceCoreModule } from "@workspace/web";

@NgModule({
    imports: [WorkspaceCoreModule, IonicModule.forRoot()],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ],
})
export class WorkspaceIonicCoreModule {
    constructor(
        @Optional()
        @SkipSelf()
        parentModule: WorkspaceIonicCoreModule
    ) {
        throwIfAlreadyLoaded(parentModule, "WorkspaceIonicCoreModule");
    }
}
