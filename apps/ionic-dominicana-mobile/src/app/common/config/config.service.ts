import { Injectable } from "@angular/core";

/**
 * Own
 */
// models
import { IConfigService } from "./config.service.model";
import { Tuple } from "@capacitor/shared/helpers";
import { UrlFragment } from "./url";

@Injectable({
    providedIn: "root"
})
export class ConfigService implements IConfigService {

    // base pathnames
    public urlFragments: Tuple<number>[] = [
        {
            value: UrlFragment.LANDING_PAGE_BASE,
            text: "/auth",
        },
        {
            value: UrlFragment.MAIN_BASE,
            text: "/main",
        }
    ];

    constructor() {
        this.init();
    }

    public getUrlFragment(urlFragmentKey: UrlFragment): Tuple<number> {
        return this.urlFragments.filter((val: Tuple<number>, idx: number, arr: Tuple<number>[]) => {
            if (val.value === urlFragmentKey) {
                return val;
            }
        })[0];
    }

    private init(): void {
        // authentication routes
        this.urlFragments.push({ value: UrlFragment.SIGNIN, text: `${ this.urlFragments[0].text }/signin` });
        this.urlFragments.push({ value: UrlFragment.SIGNUP, text: `${ this.urlFragments[0].text }/signup` });
        this.urlFragments.push({ value: UrlFragment.FORGOT_PASSWORD, text: `${ this.urlFragments[0].text }/forgot-password` });

        // main routes
        this.urlFragments.push({ value: UrlFragment.HOME, text: `${ this.urlFragments[1].text }/home` });
    }
}
