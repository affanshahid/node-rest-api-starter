import config from 'config';
import { createConnection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export async function initializeTestSchema() {
  const dbConfig = config.get<PostgresConnectionOptions>('postgresConfiguration');
  const connection = await createConnection({
    ...dbConfig
  });

  const q = connection.createQueryRunner();
  await q.dropSchema(dbConfig.schema!, true, true);
  await q.createSchema(dbConfig.schema!, true);
  await connection.close();
}

export async function createTestAppAndModule() {
  const module: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = module.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector))
  );

  return [app, module] as const;
}
