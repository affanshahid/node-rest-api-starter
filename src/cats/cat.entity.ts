import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cat {
  @ApiModelProperty()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiModelProperty()
  @Column()
  name!: string;

  @ApiModelProperty()
  @Column()
  breed!: string;
}
