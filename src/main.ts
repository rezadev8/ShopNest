import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appPort = process.env?.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('Nest store')
    .addBearerAuth({ type: 'http' })
    .setDescription(
      `
    This API is designed for developers who are learning NestJS or need a robust backend for their frontend projects. For more details, check the project repository.`,
    )
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(appPort, '0.0.0.0');
}

bootstrap();
