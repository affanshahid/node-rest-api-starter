import { Injectable, NotFoundException } from '@nestjs/common';
import { CatsRepository } from './cats.repository';
import { Cat } from './cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    private readonly catsRepository: CatsRepository
  ) { }

  findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  async findById(id: string): Promise<Cat> {
    const cat = await this.catsRepository.findOne(id);

    if (cat == null) {
      throw new NotFoundException(`No Cat found with id "${id}"`);
    }

    return cat;
  }

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const cat = this.catsRepository.create(createCatDto);
    return this.catsRepository.save(cat);
  }

  async update(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
    const cat = await this.findById(id);
    this.catsRepository.merge(cat, updateCatDto);
    return this.catsRepository.save(cat);
  }

  async delete(id: string): Promise<void> {
    await this.catsRepository.delete({ id });
  }
}
