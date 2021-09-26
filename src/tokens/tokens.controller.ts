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
  ApiExcludeEndpoint,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { ResultTokenDto } from './entities/result-token.entity';
import { Token } from './entities/token.entity';
import { TokensService } from './tokens.service';

@ApiBearerAuth()
@ApiTags('Tokens')
@Controller('tokens')
@UseGuards(AuthGuard())
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'O token foi criado com sucesso',
    type: ResultTokenDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBody({ type: Token })
  @ApiOperation({ summary: 'Cria um novo token pata o perfil' })
  create(@Body() createTokenDto: CreateTokenDto, @Request() req) {
    return this.tokensService.create(createTokenDto, req.user.id);
  }

  @Get()
  @ApiOkResponse({
    description: 'Retorna todos os tokens do perfil',
    type: [ResultTokenDto],
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiOperation({ summary: 'Retorna todos os tokens do perfil' })
  findAll(@Request() req) {
    return this.tokensService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna o token pelo ID' })
  @ApiOkResponse({
    description: 'Retorna o token pelo ID',
    type: ResultTokenDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.tokensService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @ApiExcludeEndpoint()
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateTokenDto: UpdateTokenDto,
  ) {
    return this.tokensService.update(id, req.user.id, updateTokenDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove token pelo id' })
  @ApiOkResponse({ description: 'O token foi removido com sucesso' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiNotFoundResponse({ description: 'Token não encontrado' })
  remove(@Param('id') id: string, @Request() req) {
    return this.tokensService.remove(id, req.user.id);
  }
}
