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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from './entities/provider.entity';
import { ProvidersService } from './providers.service';

@ApiBearerAuth()
@ApiTags('Providers')
@Controller('providers')
@UseGuards(AuthGuard())
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Provider criado com sucesso',
    type: Provider,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiOperation({ summary: 'Cria um novo provider' })
  @ApiBody({ type: Provider })
  create(@Body() createProviderDto: CreateProviderDto, @Request() req) {
    return this.providersService.create(createProviderDto, req.user);
  }

  @Get()
  @ApiOkResponse({
    description: 'Dados de todos os providers do perfil',
    type: Provider,
    isArray: true,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiOperation({ summary: 'Retorna todos os providers' })
  findAll(@Request() req) {
    return this.providersService.findAll(req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna o provider pelo ID' })
  @ApiOkResponse({
    description: 'Dados do provider',
    type: Provider,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  findOne(@Param('id') id: string) {
    return this.providersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza o provider pelo ID' })
  @ApiOkResponse({
    description: 'Dados do provider',
    type: Provider,
  })
  @ApiBody({ type: Provider })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  update(
    @Param('id') id: string,
    @Body() updateProviderDto: UpdateProviderDto,
  ) {
    return this.providersService.update(+id, updateProviderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um provider pelo ID' })
  @ApiOkResponse({ description: 'Provider removido com sucesso' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiNotFoundResponse({ description: 'Provider not found' })
  remove(@Param('id') id: string) {
    return this.providersService.remove(+id);
  }
}
