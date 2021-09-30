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
import {
  ApiDocGenericDelete,
  ApiDocGenericGetAll,
  ApiDocGenericGetOne,
  ApiDocGenericPatch,
  ApiDocGenericPost,
} from 'src/common/decorators/apiDoc';
import { CostumersService } from './costumers.service';
import { CreateCostumerDto } from './dto/create-costumer.dto';
import { UpdateCostumerDto } from './dto/update-costumer.dto';
import { Costumer } from './entities/costumer.entity';
import { CostumerResult } from './entities/costumer.result.entity';
import { CostumerUpdate } from './entities/costumer.update.entity';

@ApiTags('Costumers')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('costumers')
export class CostumersController {
  constructor(private readonly costumersService: CostumersService) {}

  @Post()
  @ApiDocGenericPost('usuário', CostumerResult, Costumer)
  create(@Body() createCostumerDto: CreateCostumerDto, @Request() req) {
    return this.costumersService.create(createCostumerDto, req.user);
  }

  @Get()
  @ApiDocGenericGetAll('costumers', Costumer)
  findAll(@Request() req) {
    return this.costumersService.findAll(req.user);
  }

  @Get(':id')
  @ApiDocGenericGetOne('costumers', Costumer)
  findOne(@Param('id') id: string, @Request() req) {
    return this.costumersService.findOne(id, req.user);
  }

  @Patch(':id')
  @ApiDocGenericPatch('costumers', CostumerUpdate, Costumer)
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateCostumerDto: UpdateCostumerDto,
  ) {
    return this.costumersService.update(id, updateCostumerDto, req.user);
  }

  @Delete(':id')
  @ApiDocGenericDelete('costumers')
  remove(@Param('id') id: string, @Request() req) {
    return this.costumersService.remove(id, req.user);
  }
}
