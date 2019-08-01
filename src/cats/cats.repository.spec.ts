import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { initializeTestSchema } from '../../tests/scripts';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { CatsRepository } from './cats.repository';

beforeAll(async () => {
  await initializeTestSchema();
});

describe('CatsRepository', () => {
  let catsRepository: CatsRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            ...configService.get<ConnectionOptions>('postgresConfiguration'),
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
          })
        }),
        TypeOrmModule.forFeature([CatsRepository])
      ]
    }).compile();

    catsRepository = module.get<CatsRepository>(CatsRepository);
  });

  it('is defined', () => {
    expect(catsRepository).toBeDefined();
  });

  // Since we have no custom repository methods this is all we need to test
});