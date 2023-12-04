import { Controller, Get, Param } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiGateway } from './gateways/api.gateway'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly apiGateway: ApiGateway
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('request-details/:requestId')
  getRequestDetails(@Param('requestId') requestId: string) {
    return this.appService.getRequestDetails(requestId)
  }
}
