import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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
import { MerchantsService } from './merchants.service';

@ApiBearerAuth()
@ApiTags('Merchants')
@Controller('merchants')
export class MerchantsController {
  constructor(private readonly merchantsService: MerchantsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Cria uma novo merchant',
    type: Merchant,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBody({ type: Merchant })
  @ApiOperation({ summary: 'Cria uma novo merchant' })
  create(@Body() createMerchantDto: CreateMerchantDto) {
    return this.merchantsService.create(createMerchantDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Retorna o merchant do usuário',
    type: Merchant,
    isArray: true,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiOperation({ summary: 'Retorna o merchant do usuário' })
  findAll() {
    return this.merchantsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna o merchant do usuário pelo ID' })
  @ApiOkResponse({
    description: 'Retorna o merchant do usuário',
    type: Merchant,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  findOne(@Param('id') id: string) {
    return this.merchantsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza merchant do usuário pelo ID' })
  @ApiOkResponse({
    description: 'Retorna o merchant do usuário',
    type: UpdateMerchantDto,
  })
  @ApiBody({ type: UpdateMerchantDto })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  update(
    @Param('id') id: string,
    @Body() updateMerchantDto: UpdateMerchantDto,
  ) {
    return this.merchantsService.update(+id, updateMerchantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove merchant do usuário pelo ID' })
  @ApiOkResponse({ description: 'O merchant foi removido com sucesso' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiNotFoundResponse({ description: 'Profile Not found' })
  remove(@Param('id') id: string) {
    return this.merchantsService.remove(+id);
  }
}
