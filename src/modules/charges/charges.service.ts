import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { UserToken } from 'src/auth/jwt.strategy';
import { PrismaService } from '../common/utils/prisma.service';
import { UpdateChargeDto } from './dto/update-charge.dto';

@Injectable()
export class ChargesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ChargesCreateInput, user: UserToken) {
    const charge = await this.prisma.charges.create({
      data: data,
    });

    return charge;
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
