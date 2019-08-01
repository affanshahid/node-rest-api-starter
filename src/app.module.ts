import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { CatsModule } from './cats/cats.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get<ConnectionOptions>('postgresConfiguration'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      })
    }),
    CatsModule
  ]
})
export class AppModule { }