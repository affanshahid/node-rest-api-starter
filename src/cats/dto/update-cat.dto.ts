import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCatDto {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  name!: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  breed!: string;
}