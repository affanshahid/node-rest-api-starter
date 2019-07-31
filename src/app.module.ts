import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get<TypeOrmModuleOptions>('postgresConfiguration'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      })
    }),
    CatsModule
  ]
})
export class AppModule { }