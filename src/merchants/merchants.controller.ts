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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ApiDocGenericDelete,
  ApiDocGenericGetAll,
  ApiDocGenericPatch,
  ApiDocGenericPost,
} from 'src/common/decorators/apiDoc';
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
  @ApiDocGenericPost('merchant', Merchant, MerchantResult)
  create(@Body() createMerchantDto: CreateMerchantDto, @Request() req) {
    return this.merchantsService.create(createMerchantDto, req.user);
  }

  @Get()
  @ApiDocGenericGetAll('merchant', MerchantResult)
  findAll(@Request() req) {
    const { id, profile } = req.user;
    return this.merchantsService.findAll({ userId: id, profileId: profile });
  }

  @Patch(':id')
  @ApiDocGenericPatch('merchant', UpdateMerchantDto, MerchantResult)
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
  @ApiDocGenericDelete('merchant')
  remove(@Request() req, @Param('id') id: string) {
    return this.merchantsService.remove({ id, userId: req.user.id });
  }
}
