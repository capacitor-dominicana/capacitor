import { HTTP_INTERCEPTORS } from "@angular/common/http";

/**
 * Own
 */
import { NoopInterceptor } from "./noop-interceptor";

/** http interceptor providers in outside-in order */
export const HTTP_INTERCEPTORS_PROVIDERS = [
  { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true }
];

