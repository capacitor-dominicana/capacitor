import { Controller, Get } from "@nestjs/common";

/**
 * Own
 */
// models
import { Message } from "@capacitor/api-interfaces";

// services
import { AppService } from "./app.service";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
        // to do
    }

    @Get("hello")
    getData(): Message {
        return this.appService.getData();
    }
}
