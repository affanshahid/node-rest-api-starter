import config from 'config';
import { ConnectionOptions, createConnection } from 'typeorm';

export async function initializeTestSchema() {
  const connection = await createConnection({
    ...config.get<ConnectionOptions>('postgresConfiguration')
  });

  const q = connection.createQueryRunner();
  await q.dropSchema('__tests__', true);
  await q.createSchema('__tests__', true);
  await connection.close();
}