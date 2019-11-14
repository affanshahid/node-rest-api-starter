import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import uuid from 'uuid';
import { Cat } from '../src/cats/cat.entity';
import { CatsRepository } from '../src/cats/cats.repository';
import { CreateCatDto } from '../src/cats/dto/create-cat.dto';
import { UpdateCatDto } from '../src/cats/dto/update-cat.dto';
import { createTestApp } from './utils';

describe('CatsModule (e2e)', () => {
  let app: INestApplication;
  let catsRepository: CatsRepository;

  beforeAll(async () => {
    app = await createTestApp();
    catsRepository = app.get(CatsRepository);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    await catsRepository.delete({});
  });

  describe('GET /cats', () => {
    it('should return all existing cats', async () => {
      const cat: Cat = {
        id: uuid(),
        name: 'cat 1',
        breed: 'breed 1'
      };

      await catsRepository.save(cat);

      return request(app.getHttpServer())
        .get('/cats')
        .expect(200)
        .expect([cat]);
    });
  });

  describe('GET /cats/:catId', () => {
    it('should return a cat by Id', async () => {
      const id = uuid();

      const cat: Cat = {
        id,
        name: 'cat 1',
        breed: 'breed 1'
      };

      await catsRepository.save(cat);

      return request(app.getHttpServer())
        .get(`/cats/${id}`)
        .expect(200)
        .expect(cat);
    });

    it('should return 404 if cat does not exist', () => {
      return request(app.getHttpServer())
        .get(`/cats/${uuid()}`)
        .expect(404);
    });

    it('should return 400 if id parameter is not a uuid', () => {
      return request(app.getHttpServer())
        .get(`/cats/notauuid`)
        .expect(400);
    });
  });

  describe('POST /cats', () => {
    it('should add and returns a cat', async () => {
      const catData: CreateCatDto = {
        name: 'Cat 1',
        breed: 'breed 1'
      };

      const { body: catResponse } = await request(app.getHttpServer())
        .post('/cats')
        .send(catData)
        .expect(201)
        .expect(res => expect(res.body)
          .toEqual(expect.objectContaining(catData))
        );

      const cat = await catsRepository.findOne(catResponse.id);
      await expect(cat)
        .toEqual(expect.objectContaining(catData));
    });

    it('should return 400 if the body is not valid', () => {
      const catData = {
        name: 'Cat 1',
      };

      return request(app.getHttpServer())
        .post('/cats')
        .send(catData)
        .expect(400);
    });
  });

  describe('PUT /cats/:catId', () => {
    it('should update a cat by its Id', async () => {
      const id = uuid();

      const cat: Cat = {
        id,
        name: 'cat 1',
        breed: 'breed 1'
      };

      await catsRepository.save(cat);

      const updateData: UpdateCatDto = {
        name: 'cat 2'
      };

      const result = {
        id,
        ...cat,
        ...updateData
      };

      await request(app.getHttpServer())
        .put(`/cats/${id}`)
        .send(updateData)
        .expect(200)
        .expect(result);

      const updatedCat = await catsRepository.findOne(id);

      expect(updatedCat).toEqual(result);
    });
  });

  describe('DELETE /cats/:catId', () => {
    it('should delete a cat given its Id', async () => {
      const id = uuid();

      const cat: Cat = {
        id,
        name: 'cat 1',
        breed: 'breed 1'
      };

      await catsRepository.save(cat);

      await request(app.getHttpServer())
        .delete(`/cats/${id}`)
        .expect(200);

      const updatedCat = await catsRepository.findOne(id);

      expect(updatedCat).toBeUndefined();
    });

    it('should return 400 if id parameter is not a uuid', () => {
      return request(app.getHttpServer())
        .delete(`/cats/notauuid`)
        .expect(400);
    });
  });
});
