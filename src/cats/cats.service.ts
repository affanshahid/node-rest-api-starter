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

  getCats(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  async getCatById(id: string): Promise<Cat> {
    const cat = await this.catsRepository.findOne(id);

    if (cat == null) {
      throw new NotFoundException(`No Cat found with id "${id}"`);
    }

    return cat;
  }

  async createCat(createCatData: CreateCatDto): Promise<Cat> {
    const cat = this.catsRepository.create(createCatData);
    return this.catsRepository.save(cat);
  }

  async updateCat(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
    const cat = await this.getCatById(id);
    this.catsRepository.merge(cat, updateCatDto);
    return this.catsRepository.save(cat);
  }

  async deleteCat(id: string): Promise<void> {
    await this.catsRepository.delete({ id });
  }
}
