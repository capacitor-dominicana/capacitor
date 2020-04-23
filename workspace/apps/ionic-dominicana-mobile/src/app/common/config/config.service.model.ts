/**
 * Own
 */
import { UrlFragment } from "./url";
import { Tuple } from "@app/shared";

export interface IConfigService {
    urlFragments: Tuple<number>[];
    getUrlFragment(urlFragmentKey: UrlFragment): Tuple<number>;
}
