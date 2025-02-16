import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { AppInfoSwagger } from './decorators/app.swagger.decorator';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Throttle(5,30)
  @AppInfoSwagger()
  @Get('/')
  getAppInfo() {
    return "Hello world"
  }
}
