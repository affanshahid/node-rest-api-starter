import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCatDto {
  @ApiModelProperty()
  @IsNotEmpty()
  name!: string;

  @ApiModelProperty()
  @IsNotEmpty()
  breed!: string;
}