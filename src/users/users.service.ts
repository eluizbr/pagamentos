import { Prisma } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { argon2id, hash as hashPassword } from 'argon2';
import { PrismaService } from 'src/utils/prisma.service';
import RabbitmqService from 'src/utils/rabbitmq-service';

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
    private readonly prisma: PrismaService,
    private readonly rabbitmq: RabbitmqService,
  ) {}

  sendToQueue(routingKey: string, data: any) {
    this.rabbitmq.publishInExchange(
      process.env.RABBTIMQ_USERS_EXCHANGE,
      routingKey,
      data,
    );
  }

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

      // Create user log
      this.sendToQueue('userCreateLogs', {
        type: 'createUser',
        ...user,
      });

      return user;
    } catch (err) {
      // Error when try create user
      this.sendToQueue('userErrorLogs', err);

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

    // Update user log
    this.sendToQueue('userUpdateLogs', {
      type: 'changePassword',
      id: user.id,
      update: user.updated_at,
      fields: Object.keys(data),
    });

    return user;
  }

  async remove(where: Prisma.UserWhereUniqueInput) {
    await this.findOne(where);

    const user = await this.prisma.user.delete({ where, select });
    this.sendToQueue('userRemoveLogs', {
      type: 'removeUser',
      id: user.id,
      update: user.updated_at,
    });

    return user;
  }
}
