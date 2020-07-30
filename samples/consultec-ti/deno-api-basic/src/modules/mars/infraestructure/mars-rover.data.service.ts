import { existsSync } from "https://deno.land/std@0.62.0/fs/exists.ts";
import { readJsonSync } from "https://deno.land/std@0.62.0/fs/read_json.ts";

/**
 * Own
 */
// models
import { IMarsRoverInfo } from "../models/mars.model.ts";

// providers
import { IApiResponse } from "../../../models/api-response.model.ts";

export class MarsDataService {

    constructor() {
        // [2da Part] Deno Environment
        // this.baseUrl = `${Deno.env.get("COMMON_BASE_SERVER_PATH")}`;
        // this.apiPathContext = `${Deno.env.get("COMMON_API_TARGET")}`;
        // this.apiUrlWithVersion = `${Deno.env.get("COMMON_API_URL_VERSION")}`;
        // this.apiKey = Deno.env.get("COMMON_API_KEY") ?? "";
        // this.apiFullUrl = `${this.baseUrl}/${this.apiPathContext}/${this.apiUrlWithVersion}`;
    }

    public async getRoverPhotos(): Promise<IApiResponse<IMarsRoverInfo>> {
        const dataSourceURI = "src/data/mars-photos.json";
        let result: IMarsRoverInfo[] = [];

        if (existsSync(dataSourceURI)) {
            result = readJsonSync(dataSourceURI) as IMarsRoverInfo[];
        }

        if (!result || !result.length) {
            return {
                success: false,
                errorCode: 1001,
                errorMessage: "Hubo un problema conectando con el origen de datos. Intente nuevamente.",
                data: []
            } as IApiResponse<any>;
        }

        return {
            success: true,
            data: (result)
        } as IApiResponse<any>;
    }
}
