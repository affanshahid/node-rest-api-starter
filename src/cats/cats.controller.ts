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
  getCats(): Promise<Cat[]> {
    return this.catsService.getCats();
  }

  @Get(':catId')
  @ApiOkResponse({ type: Cat })
  @ApiNotFoundResponse({ description: 'Not found' })
  getCatById(
    @Param('catId', new ParseUUIDPipe({ version: '4' })) catId: string
  ): Promise<Cat> {
    return this.catsService.getCatById(catId);
  }

  @Post()
  @ApiCreatedResponse({ type: Cat })
  createCat(
    @Body() createCatDto: CreateCatDto
  ): Promise<Cat> {
    return this.catsService.createCat(createCatDto);
  }

  @Put(':catId')
  @ApiOkResponse({ type: Cat })
  @ApiNotFoundResponse({ description: 'Not found' })
  updateCat(
    @Body() updateCatDto: UpdateCatDto,
    @Param('catId', new ParseUUIDPipe({ version: '4' })) catId: string,
  ): Promise<Cat> {
    return this.catsService.updateCat(catId, updateCatDto);
  }

  @Delete(':catId')
  @ApiOkResponse({ description: 'Cat successfully deleted' })
  deleteCat(
    @Param('catId', new ParseUUIDPipe({ version: '4' })) catId: string,
  ): Promise<void> {
    return this.catsService.deleteCat(catId);
  }
}
