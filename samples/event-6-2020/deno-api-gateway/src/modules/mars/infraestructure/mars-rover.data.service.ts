/**
 * Own
 */
// models
import { IMarsRoverInfo } from "../models/mars.model.ts";
import { RoverCameraArgs } from "../http/rover-camera-args.ts";
import { ITuple } from "../../../models/tuple.model.ts";

// providers
import { DataService } from "../../../infraestructure/data.service.ts";
import { IApiResponse } from "../../../models/api-response.model.ts";
import { HttpMethods } from "../../../helpers/http/http-methods.enum.ts";

export class MarsDataService extends DataService {

    constructor() {
        super();
    }

    public async getRoverPhotos(roverClass: string, params?: RoverCameraArgs): Promise<IApiResponse<IMarsRoverInfo>> {
        let roverCameraArgs = new RoverCameraArgs();


        // 2da part [With params]
        let currentParams: ITuple<any>[] = [{
            key: "page",
            value: params?.page ?? roverCameraArgs.page
        }];

        // 2da part [With params]
        if (params) {
            currentParams.push();
            if (params.camera) {
                currentParams.push({
                    key: "camera",
                    value: params.camera
                });
            }

            if (params.earth_date || params.sol) {
                currentParams.push({
                    key: (params.earth_date) ? "earth_date" : "sol",
                    value: params.earth_date ?? params.sol
                });
            }
        }

        // 2da part [With params]
        const result = await this.dispatcherWrapper(`rovers/${roverClass}/photos?sol=1000`, HttpMethods.GET_ALL, currentParams);

        // USING THIS 1er Part
        // const result = await this.dispatcherWrapper(`rovers/${roverClass}/photos`, HttpMethods.GET_ALL);

        if (result.status < 200 || result.status > 204) {
            return {
                success: false,
                errorCode: 1001,
                errorMessage: result.statusText,
                data: []
            } as IApiResponse<any>;
        }

        // [2da part] - With Offset Params
        // let newData = await result?.json();
        // if (newData.photos && params?.offset) {
        //     newData.photos = (newData.photos as Array<any>).slice(0, params.offset);
        // }

        return {
            success: true,
            data: (await result?.json())
        } as IApiResponse<any>;
    }
}
