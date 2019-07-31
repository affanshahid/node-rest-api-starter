import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import { Cat } from './cat.entity';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
@ApiUseTags('Cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService
  ) { }

  @Get()
  @ApiOkResponse({ type: Cat, isArray: true })
  findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':catId')
  @ApiOkResponse({ type: Cat })
  @ApiNotFoundResponse({ description: 'Not found' })
  findById(
    @Param('catId', new ParseUUIDPipe({ version: '4' })) catId: string
  ): Promise<Cat> {
    return this.catsService.findById(catId);
  }

  @Post()
  @ApiCreatedResponse({ type: Cat })
  create(
    @Body() createCatDto: CreateCatDto
  ): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @Put(':catId')
  @ApiOkResponse({ type: Cat })
  @ApiNotFoundResponse({ description: 'Not found' })
  update(
    @Body() updateCatDto: UpdateCatDto,
    @Param('catId', new ParseUUIDPipe({ version: '4' })) catId: string,
  ): Promise<Cat> {
    return this.catsService.update(catId, updateCatDto);
  }

  @Delete(':catId')
  @ApiOkResponse({ description: 'Cat successfully deleted' })
  delete(
    @Param('catId', new ParseUUIDPipe({ version: '4' })) catId: string,
  ): Promise<void> {
    return this.catsService.delete(catId);
  }
}
