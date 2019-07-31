import { EntityRepository, Repository } from "typeorm";
import { Cat } from './cat.entity';

@EntityRepository(Cat)
export class CatsRepository extends Repository<Cat> { }
