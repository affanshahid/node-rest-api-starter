import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

export async function createTestApp() {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      AppModule,
    ],
  }).compile();

  const app = module.createNestApplication();

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector))
  );

  return app;
}

export function toJson<T>(obj: T): { [key in keyof T]: unknown } {
  return JSON.parse(JSON.stringify(obj));
}
