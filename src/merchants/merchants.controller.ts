import { Prisma } from '.prisma/client';
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
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { Merchant } from './entities/merchant.entity';
import { MerchantResult } from './entities/merchant.result.entity';
import { MerchantsService } from './merchants.service';

@ApiBearerAuth()
@ApiTags('Merchants')
@Controller('merchants')
@UseGuards(AuthGuard())
export class MerchantsController {
  constructor(private readonly merchantsService: MerchantsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Cria uma novo merchant',
    type: MerchantResult,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBody({ type: Merchant })
  @ApiOperation({ summary: 'Cria uma novo merchant' })
  create(@Body() createMerchantDto: CreateMerchantDto, @Request() req) {
    return this.merchantsService.create(createMerchantDto, req.user);
  }

  @Get()
  @ApiOkResponse({
    description: 'Retorna o merchant do usuário',
    type: MerchantResult,
    isArray: true,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiOperation({ summary: 'Retorna o merchant do usuário' })
  findAll(@Request() req) {
    const { id, profile } = req.user;
    return this.merchantsService.findAll({ userId: id, profileId: profile });
  }

  // @Get(':id')
  // @ApiOperation({ summary: 'Retorna o merchant do usuário pelo ID' })
  // @ApiOkResponse({
  //   description: 'Retorna o merchant do usuário',
  //   type: Merchant,
  // })
  // @ApiForbiddenResponse({ description: 'Forbidden.' })
  // findOne(@Param('id') id: string) {
  //   return this.merchantsService.findOne(+id);
  // }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza merchant do usuário pelo ID' })
  @ApiOkResponse({
    description: 'Retorna o merchant do usuário',
    type: MerchantResult,
  })
  @ApiBody({ type: UpdateMerchantDto })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateMerchantDto: Prisma.MerchantsUpdateInput,
  ) {
    return this.merchantsService.update(
      { id, userId: req.user.id },
      updateMerchantDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove merchant do usuário pelo ID' })
  @ApiOkResponse({ description: 'O merchant foi removido com sucesso' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiNotFoundResponse({ description: 'Profile Not found' })
  remove(@Request() req, @Param('id') id: string) {
    return this.merchantsService.remove({ id, userId: req.user.id });
  }
}
