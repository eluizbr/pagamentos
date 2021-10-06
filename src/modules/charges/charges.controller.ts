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
import { ChargesService } from './charges.service';
import { CreateChargeDto } from './dto/create-charge.dto';
import { UpdateChargeDto } from './dto/update-charge.dto';

@ApiBearerAuth()
@ApiTags('Charges')
@Controller('charges')
@UseGuards(AuthGuard())
export class ChargesController {
  constructor(private readonly chargesService: ChargesService) {}

  @Post()
  create(@Body() createChargeDto: CreateChargeDto, @Request() req) {
    return this.chargesService.create(createChargeDto, req.user);
  }

  @Get()
  findAll() {
    return this.chargesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chargesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChargeDto: UpdateChargeDto) {
    return this.chargesService.update(+id, updateChargeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chargesService.remove(+id);
  }
}
