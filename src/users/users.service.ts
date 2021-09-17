import { Prisma } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException(`User with id ${id}, not found!`);
    return user;
  }

  async findOneByUsername(username: string) {
    const user = await this.prisma.user.findUnique({ where: { username } });

    if (!user)
      throw new NotFoundException(`User with username ${username}, not found!`);

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.user.delete({ where: { id } });
  }
}
