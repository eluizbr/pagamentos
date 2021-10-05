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
} from 'src/modules/common/decorators/apiDoc';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from './entities/provider.entity';
import { ProviderResult } from './entities/provider.result.entity';
import { ProvidersService } from './providers.service';

@ApiBearerAuth()
@ApiTags('Providers')
@Controller('providers')
@UseGuards(AuthGuard())
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  @ApiDocGenericPost('provider', Provider, Provider)
  create(@Body() createProviderDto: CreateProviderDto, @Request() req) {
    return this.providersService.create(createProviderDto, req.user);
  }

  @Get()
  @ApiDocGenericGetAll('provider', Provider)
  findAll(@Request() req) {
    return this.providersService.findAll(req.user);
  }

  @Get(':id')
  @ApiDocGenericGetOne('provider', Provider)
  findOne(@Param('id') id: string, @Request() req) {
    return this.providersService.findOne(id, req.user);
  }

  @Patch(':id')
  @ApiDocGenericPatch('provider', Provider, ProviderResult)
  update(
    @Param('id') id: string,
    @Body() updateProviderDto: UpdateProviderDto,
    @Request() req,
  ) {
    return this.providersService.update(id, updateProviderDto, req.user);
  }

  @Delete(':id')
  @ApiDocGenericDelete('provider')
  remove(@Param('id') id: string, @Request() req) {
    return this.providersService.remove(id, req.user);
  }
}
