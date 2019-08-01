import { Test } from '@nestjs/testing';
import { Cat } from './cat.entity';
import { CatsController } from './cats.controller';
import { CatsRepository } from './cats.repository';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        {
          provide: CatsService,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          }
        },
        { provide: CatsRepository, useValue: {} }
      ]
    }).compile();

    catsService = module.get<CatsService>(CatsService);
    catsController = module.get<CatsController>(CatsController);
  });

  describe('findAll', () => {
    it('should return an array of cats from catsService', async () => {
      const result: Cat[] = [
        {
          id: 'id1',
          name: 'Cat 1',
          breed: 'Breed 1'
        }
      ];

      jest.spyOn(catsService, 'findAll')
        .mockImplementation(() => Promise.resolve(result));

      expect(await catsController.findAll()).toBe(result);
      expect(catsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a cat from catsService', async () => {
      const id = 'id1';

      const result: Cat = {
        id,
        name: 'Cat 1',
        breed: 'Breed 1'
      };

      jest.spyOn(catsService, 'findById')
        .mockImplementation(() => Promise.resolve(result));

      expect(await catsController.findById(id)).toBe(result);
      expect(catsService.findById).toHaveBeenCalledWith(id);
    });
  });

  describe('create', () => {
    it('should create and return a cat using catsService', async () => {
      const id = 'id1';

      const dto: CreateCatDto = {
        name: 'Cat 1',
        breed: 'Breed 1'
      };

      const result = {
        id,
        ...dto
      };

      jest.spyOn(catsService, 'create')
        .mockImplementation(() => Promise.resolve(result));

      expect(await catsController.create(dto)).toBe(result);
      expect(catsService.create).toHaveBeenCalledWith(dto);
    });
  });
  
  describe('update', () => {
    it('should update and return a cat using catsService', async () => {
      const id = 'id1';

      const dto = {
        name: 'Cat 1',
        breed: 'Breed 1'
      };

      const result = {
        id,
        ...dto
      };

      jest.spyOn(catsService, 'update')
        .mockImplementation(() => Promise.resolve(result));

      expect(await catsController.update(id, dto)).toBe(result);
      expect(catsService.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('delete', () => {
    it('should delete a cat using catsService', async () => {
      const id = 'id1';

      jest.spyOn(catsService, 'delete')
        .mockImplementation(() => Promise.resolve());

      await catsController.delete(id);
      expect(catsService.delete).toHaveBeenCalled();
    });
  });
});
