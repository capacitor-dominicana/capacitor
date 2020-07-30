// [2do part - Request] - On Finish Handler Request
import { Response, Request } from "https://deno.land/x/oak/mod.ts";

// [2do Part - After GET] Show snippet from PowerPoint to v4
import { v4 } from "https://deno.land/std/uuid/mod.ts";

// [Plus] 2do Part (import packages from Pika Dev)
// @deno-types="https://unpkg.com/moment@2.27.0/moment.d.ts"
// import moment from "https://cdn.skypack.dev/moment";

/**
 * Own
 */
import { IHttpRequestArgs } from "../../../helpers/http/http-request-args.ts";

// models
import { RoverCameraArgs } from "../http/rover-camera-args.ts";
import { IMarsRoverInfo } from "../models/mars.model.ts";

// services
import { MarsDataService } from "../infraestructure/mars-rover.data.service.ts"
import { IApiResponse } from "../../../models/api-response.model.ts";

export class MarsRoversController  {

    public async getMarsPhotos({ params, response }: IHttpRequestArgs<RoverCameraArgs>): Promise<void> {
        const marsDataService = new MarsDataService();
        const result: IApiResponse<IMarsRoverInfo | undefined> = await marsDataService.getRoverPhotos();

        if (result && result.success) {
            response.status = 200;
        }
        else {
            response.status = 404;
        }

        response.body = result.data;

        // [2da] Plus - Handler Refactoring response status and body
        // this.onFinishHandlerRequest(response, result);
    }

    public async addMarsPhoto({ request, response }: { request: Request; response: Response }): Promise<void> {
        if (!request.hasBody) {
            response.status = 400;
        } else {
            const payload = request.body();
            const newRoverPhoto: IMarsRoverInfo = await payload.value;

            newRoverPhoto.id = v4.generate();
            response.status = 201;
            response.body = newRoverPhoto;

            // explanation
            // 200 OK : El Request ha sucedido. La información devuelta con la respuesta depende del método utilizado en las solicitudes
            // 201 OK : La solicitud se ha cumplido y además, se ha creado un nuevo recurso en el servidor.
            //          Debería retornar una entidad de tipo: Content-Type header field. Si la información ha sido recibida, más no creada...
            // 202 OK : La solicitud ha sido aceptada para su procesamiento, pero el procesamiento no se ha completado.
            //          La respuesta 202 es intencionalmente no comprometida.
            //          La entidad devuelta con esta respuesta DEBE incluir una indicación del estado actual de la solicitud y un estado o alguna estimación de cuándo el usuario puede esperar que se complete la solicitud.
            //
            // 203 OK : La información recibida no es la garantizada total del servidor de origen (gateway): Pero recibes algo local o de terceros. Si obtuvo 200, pero solo recibe metainformación.
            // 204 OK : El servidor ha cumplido la solicitud pero no necesita devolver un cuerpo de entidad, y puede querer devolver metainformación actualizada.  Ejemplo: HTTP Options
            //          304: No modificado. 404: No encontrado. 504: Servidor sin información, timeout.
        }
    }

    private onFinishHandlerRequest(currentResponse: Response, result: IApiResponse<any>): void {
        if (result && result.success) {
            currentResponse.status = 200;
        }
        else {
            currentResponse.status = 404;
        }

        currentResponse.body = result.data;
    }
}
