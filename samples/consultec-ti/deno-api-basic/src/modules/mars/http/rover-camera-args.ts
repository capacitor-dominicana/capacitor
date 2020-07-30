import { IBaseRoverArgs } from "../../../models/base-rover-args.ts";

export class RoverCameraArgs extends IBaseRoverArgs {
    constructor(public camera?: string, public earth_date?: Date, public sol?: number) {
        super();
    }
}
