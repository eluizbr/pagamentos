import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CardsService } from './cards.service';
import { CreateCardTokenDto } from './dto/create-card-token.dto';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
@ApiBearerAuth()
@ApiTags('Cards')
@Controller('cards')
@UseGuards(AuthGuard())
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async create(@Body() createCardDto: CreateCardDto, @Request() req) {
    return this.cardsService.create(createCardDto, req.user);
  }

  @Post('token')
  async cardToken(
    @Body() createCardTokenDto: CreateCardTokenDto,
    @Request() req,
  ) {
    const tokenCard = this.cardsService.token(createCardTokenDto, req.user);
    return tokenCard;
  }

  @Get()
  findAll(@Request() req) {
    return this.cardsService.findAll({ profileId: req.user.profileId });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.cardsService.findOne(id, req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(+id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.cardsService.remove(id, req.user);
  }
}
