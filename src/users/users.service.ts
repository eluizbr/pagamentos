import { Prisma } from '.prisma/client';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { argon2id, hash as hashPassword } from 'argon2';
import { PrismaService } from 'src/common/utils/prisma.service';
import { UserProducerService } from './jobs/users.producer.service';

const select = {
  id: true,
  username: true,
  email: true,
  created_at: true,
  updated_at: true,
  profiles: {
    select: { id: true },
  },
  _count: true,
};

@Injectable()
export class UsersService {
  constructor(
    private userProducer: UserProducerService,
    private readonly prisma: PrismaService,
  ) {}

  async encodePassword(data) {
    const password = await hashPassword(data.password, {
      type: argon2id,
      memoryCost: 2 ** 16,
      hashLength: 50,
    });

    return password;
  }

  async create(data: Prisma.UserCreateInput) {
    const password = await this.encodePassword(data);
    const { username, email } = data;

    try {
      const user = await this.prisma.user.create({
        data: { email, username, password },
      });
      delete user.password;
      this.userProducer.sendToQueue('create', user);
      return user;
    } catch (err) {
      throw new BadRequestException({
        status: 404,
        message: `O campo ${err.meta.target}, já esta em uso por outro usuário!`,
      });
    }
  }

  findAll() {
    return this.prisma.user.findMany({ select });
  }

  async findOne(where: Prisma.UserWhereUniqueInput) {
    const user = this.prisma.user.findUnique({
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

    const password = await this.encodePassword(data);

    data.password = password;

    const user = await this.prisma.user.update({
      where,
      data,
      select,
    });

    return user;
  }

  async remove(where: Prisma.UserWhereUniqueInput) {
    await this.findOne(where);

    const user = await this.prisma.user.delete({ where, select });

    return user;
  }
}
