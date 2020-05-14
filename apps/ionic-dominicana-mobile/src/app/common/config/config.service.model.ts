/**
 * Own
 */
import { UrlFragment } from "./url";
import { Tuple } from "@capacitor/shared/helpers";

export interface IConfigService {
    urlFragments: Tuple<number>[];
    getUrlFragment(urlFragmentKey: UrlFragment): Tuple<number>;
}
