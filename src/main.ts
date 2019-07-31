import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector))
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  const host = configService.get<string>('host');

  const options = new DocumentBuilder()
    .setTitle(configService.get<string>('swagger.title'))
    .setDescription(configService.get<string>('swagger.description'))
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(
    configService.get<string>('swagger.endpoint'),
    app,
    document
  );

  await app.listen(
    port,
    host,
    () => logger.log(`Swagger UI available at: http://${host}:${port}/api`)
  );
}
bootstrap();