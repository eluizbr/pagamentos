import { Injectable } from '@nestjs/common';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';

@Injectable()
export class MerchantsService {
  create(createMerchantDto: CreateMerchantDto, userId: string) {
    return 'This action adds a new merchant';
  }

  findAll(where: any) {
    return `This action returns all merchants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} merchant`;
  }

  update(where: any, updateMerchantDto: UpdateMerchantDto) {
    const { id, userId } = where;
    return `This action updates a #${id} merchant`;
  }

  remove(where: any) {
    const { id, userId } = where;
    return `This action removes a #${id} merchant`;
  }
}
