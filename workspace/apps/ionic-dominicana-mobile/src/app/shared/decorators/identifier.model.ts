import { InjectionToken } from "@angular/core";

export interface Identifier<T> {
    /**
     * An InjectionToken for this decorator, e.g. a name or a path. Used to identify class in
     * `getClassFactory`. If left `undefined`, the `Identifier` will not be registered with
     * `getClassFactory`.
     */
    token: InjectionToken<T>;
}
