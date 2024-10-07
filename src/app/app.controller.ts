import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { AppInfoSwagger } from './decorators/app.swagger.decorator';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @AppInfoSwagger()
  @Get('/')
  getAppInfo() {
    return this.appService.getAppInfo();
  }
}
