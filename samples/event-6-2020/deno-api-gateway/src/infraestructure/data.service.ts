/**
 * Own
 */
import { HttpMethods } from "../helpers/http/http-methods.enum.ts";
import { ITuple } from "../models/tuple.model.ts";

export class DataService {

    /**
     * Props
     */
    public baseUrl: string;
    public apiUrlWithVersion: string;
    public apiPathContext: string;
    public apiFullUrl: string;
    public apiKey: string;

    constructor() {
        // [2da Part] Deno Environment
        // this.baseUrl = `${Deno.env.get("COMMON_BASE_SERVER_PATH")}`;
        // this.apiPathContext = `${Deno.env.get("COMMON_API_TARGET")}`;
        // this.apiUrlWithVersion = `${Deno.env.get("COMMON_API_URL_VERSION")}`;
        // this.apiKey = Deno.env.get("COMMON_API_KEY") ?? "";
        // this.apiFullUrl = `${this.baseUrl}/${this.apiPathContext}/${this.apiUrlWithVersion}`;

        this.baseUrl = ``;
        this.apiPathContext = ``;
        this.apiUrlWithVersion = ``;
        this.apiKey = "";
        this.apiFullUrl = `${this.baseUrl}/${this.apiPathContext}/${this.apiUrlWithVersion}`;
    }

    public async getAll(controller: string, params?: ITuple<string>[]): Promise<Response> {
        const fullApiController = this.prepareUrlFragment(controller, params);
        const data: Response | undefined = await fetch(fullApiController);
        return data || [];
    }

    public async dispatcherWrapper(controller: string, method: HttpMethods = HttpMethods.GET, params?: ITuple<string>[]): Promise<Response> {
        let result: Response = null as any;

        switch (method) {
            case HttpMethods.GET_ALL:
                result = await this.getAll(controller, params);
                break;
        }

        return result;
    }

    private prepareUrlFragment(currentController: string, params?: ITuple<string>[]): string {
        let newUrl = new URL(`${this.apiFullUrl}/${currentController}`);

        // [2da Part] With params -- comment this instruction
        if (params && params.length) {
            params.forEach(element => {
                newUrl = this.prepareUrlWithParams(newUrl, element.key, element.value);
            });
        }

        return this.prepareUrlWithParams(newUrl, "api_key", this.apiKey).href;
    }

    private prepareUrlWithParams(currentURL: URL, key: string, value: string): URL {
        let params = new URLSearchParams(currentURL.search.slice(1));

        if (params.has(key)) {
            currentURL.searchParams.set(key, value);
        } else {
            currentURL.searchParams.append(key, value);
        }

        return currentURL;
    }
}
