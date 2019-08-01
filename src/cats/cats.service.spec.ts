import { Test } from '@nestjs/testing';
import { Cat } from './cat.entity';
import { CatsRepository } from './cats.repository';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

describe('CatsService', () => {
  let catsService: CatsService;
  let catsRepository: CatsRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: CatsRepository,
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            merge: jest.fn(),
            delete: jest.fn(),
          }
        }
      ]
    }).compile();

    catsService = module.get<CatsService>(CatsService);
    catsRepository = module.get<CatsRepository>(CatsRepository);
  });

  describe('findAll', () => {
    it('should return an array of cats from catsRepository', async () => {
      const result: Cat[] = [
        {
          id: 'id1',
          name: 'Cat 1',
          breed: 'Breed 1'
        }
      ];

      jest.spyOn(catsRepository, 'find')
        .mockImplementation(() => Promise.resolve(result));

      expect(await catsService.findAll()).toBe(result);
      expect(catsRepository.find).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a cat from catsRepository', async () => {
      const id = 'id1';

      const result: Cat = {
        id,
        name: 'Cat 1',
        breed: 'Breed 1'
      };

      jest.spyOn(catsRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(result));

      expect(await catsService.findById(id)).toBe(result);
      expect(catsRepository.findOne).toHaveBeenCalledWith(id);
    });

    it('should throw an error if cat is not found', async () => {
      jest.spyOn(catsRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(undefined));

      await expect(catsService.findById('id1')).rejects.toThrow();
    });
  });

  describe('create', () => {
    it('should create and return a cat using catsRepository', async () => {
      const id = 'id1';

      const dto: CreateCatDto = {
        name: 'Cat 1',
        breed: 'Breed 1'
      };

      const result = {
        id,
        ...dto
      };

      jest.spyOn(catsRepository, 'create')
        .mockImplementation(() => result);

      jest.spyOn(catsRepository, 'save')
        .mockImplementation(() => Promise.resolve(result));

      expect(await catsService.create(dto)).toBe(result);
      expect(catsRepository.create).toHaveBeenCalledWith(dto);
      expect(catsRepository.save).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a cat using the catsRepository', async () => {
      const id = 'id1';
      const dto: UpdateCatDto = {
        name: 'Cat 1',
        breed: 'Breed 1'
      };

      const result = {
        id,
        ...dto
      };

      jest.spyOn(catsRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(result));

      jest.spyOn(catsRepository, 'save')
        .mockImplementation(() => Promise.resolve(result));

      expect(await catsService.update(id, dto)).toBe(result);
      expect(catsRepository.findOne).toHaveBeenCalledWith(id);
      expect(catsRepository.save).toHaveBeenCalled();
    });

    it('should throw an error if cat does not exist', async () => {
      const dto: UpdateCatDto = {
        name: 'Cat 1',
        breed: 'Breed 1'
      };

      jest.spyOn(catsRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(undefined));

      await expect(catsService.update('id1', dto)).rejects.toThrow();
    });
  });

  describe('delete', () => {
    it('should delete a cat using catsRepository', async () => {
      const id = 'id1';

      jest.spyOn(catsRepository, 'delete')
        .mockImplementation(() => Promise.resolve({ raw: {} }));

      await catsService.delete(id);
      expect(catsRepository.delete).toHaveBeenCalledWith({ id });
    });
  });
});