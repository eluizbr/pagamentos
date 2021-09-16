import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { argon2id, hash as hashPassword } from 'argon2';
import { PrismaService } from 'src/utils/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    const password = await hashPassword(data.password, {
      type: argon2id,
      memoryCost: 2 ** 16,
      hashLength: 50,
    });
    const { username, email } = data;

    try {
      return await this.prisma.user.create({
        data: { email, username, password },
      });
    } catch (err) {
      return {
        code: err.code,
        message: err.meta.cause,
      };
    }
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findOneByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
