/**
 * Own
 */
import { IMarsCamera } from "./mars-camera.model.ts";
import { IMarsRover } from "./mars-rover.model.ts";

export interface IMarsRoverInfo {
    id: number|string;
    sol: number;
    camera: IMarsCamera;
    img_src: string;
    earth_date: string;
    rover: IMarsRover;
}
