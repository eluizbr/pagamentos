import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardTokenDto } from './dto/create-card-token.dto';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @Post('token')
  async cardToken(
    @Body() createCardTokenDto: CreateCardTokenDto,
    @Body() createCardDto: CreateCardDto,
    @Request() req,
  ) {
    const card = await this.create(createCardDto);
    const tokenCard = this.cardsService.token(createCardTokenDto);
    return card;
  }

  @Get()
  findAll() {
    return this.cardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(+id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardsService.remove(+id);
  }
}
