import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appPort = process.env?.PORT || 3000

  const config = new DocumentBuilder()
    .setTitle('Store project')
    .addBearerAuth({ type: 'http' })
    .setDescription('Simple store')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(appPort);
}

bootstrap();
