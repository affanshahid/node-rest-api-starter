import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsController } from './cats.controller';
import { CatsRepository } from './cats.repository';
import { CatsService } from './cats.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CatsRepository]),
  ],
  providers: [CatsService],
  controllers: [CatsController],
  exports: [CatsService]
})
export class CatsModule { }
