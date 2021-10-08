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
import { ApiBearerAuth, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import {
  ApiDocGenericDelete,
  ApiDocGenericGetAll,
  ApiDocGenericGetOne,
  ApiDocGenericPost,
} from 'src/modules/common/decorators/apiDoc';
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
  @ApiDocGenericPost('token', Token, ResultTokenDto)
  create(@Body() createTokenDto: CreateTokenDto, @Request() req) {
    return this.tokensService.create(createTokenDto, req.user);
  }

  @Get()
  @ApiDocGenericGetAll('token', ResultTokenDto)
  findAll(@Request() req) {
    return this.tokensService.findAll(req.user);
  }

  @Get(':id')
  @ApiDocGenericGetOne('token', ResultTokenDto)
  findOne(@Param('id') id: string, @Request() req) {
    return this.tokensService.findOne(id, req.user);
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
  @ApiDocGenericDelete('token')
  remove(@Param('id') id: string, @Request() req) {
    return this.tokensService.remove(id, req.user);
  }
}
