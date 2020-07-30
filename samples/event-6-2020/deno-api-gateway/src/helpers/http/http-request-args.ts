import { Response } from "https://deno.land/x/oak/mod.ts";

export interface IHttpRequestArgs<T> {
    params: T|any;
    response: Response;
}
