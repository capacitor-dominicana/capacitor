import { Controller, Get } from "@nestjs/common";

import { Message } from "@workspace/api-interfaces";

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
