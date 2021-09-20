import { Prisma } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { argon2id, hash as hashPassword } from 'argon2';
import { PrismaService } from 'src/utils/prisma.service';

const select = {
  id: true,
  username: true,
  email: true,
  created_at: true,
  updated_at: true,
};

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
    return this.prisma.user.findMany({ select });
  }

  async findOne(where: Prisma.UserWhereUniqueInput) {
    const user = await this.prisma.user.findUnique({
      where,
      select,
    });

    if (!user) throw new NotFoundException(`User with id ${where}, not found!`);
    return user;
  }

  async findOneByUsername(where: Prisma.UserWhereUniqueInput) {
    const user = await this.prisma.user.findUnique({ where, select });

    if (!user)
      throw new NotFoundException(`User with username ${where}, not found!`);

    return user;
  }

  async update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ) {
    await this.findOne(where);

    return this.prisma.user.update({
      where,
      data,
      select,
    });
  }

  async remove(where: Prisma.UserWhereUniqueInput) {
    await this.findOne(where);

    return this.prisma.user.delete({ where, select });
  }
}
