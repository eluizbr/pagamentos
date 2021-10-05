import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/utils/prisma.service';
import { UpdateChargeDto } from './dto/update-charge.dto';

@Injectable()
export class ChargesService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.ChargesCreateInput) {
    return this.prisma.charges.create({
      data,
    });
  }

  findAll() {
    return `This action returns all charges`;
  }

  findOne(id: number) {
    return `This action returns a #${id} charge`;
  }

  update(id: number, updateChargeDto: UpdateChargeDto) {
    return `This action updates a #${id} charge`;
  }

  remove(id: number) {
    return `This action removes a #${id} charge`;
  }
}
