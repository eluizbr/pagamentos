import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProfilesService } from 'src/profiles/profiles.service';
import { PrismaService } from 'src/utils/prisma.service';
import RabbitmqService from 'src/utils/rabbitmq-service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';

@Injectable()
export class TokensService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rabbitmq: RabbitmqService,
    private readonly profileService: ProfilesService,
    private readonly jwtService: JwtService,
  ) {}

  sendToQueue(routingKey: string, data: any) {
    this.rabbitmq.publishInExchange(
      process.env.RABBTIMQ_TOKEN_EXCHANGE,
      routingKey,
      data,
    );
  }

  async generateToken(userId: any, type: string) {
    const result = { sub: userId, type };
    const token = await this.jwtService.signAsync(result, {
      expiresIn: '365d',
    });
    const decode = this.jwtService.decode(token);

    return {
      token,
      decode,
    };
  }

  async create(createTokenDto: CreateTokenDto, userId: string) {
    const profile = await this.profileService.findOne({ userId });
    const { type } = createTokenDto;
    const { token, decode }: any = await this.generateToken(userId, type);

    try {
      const newToken = await this.prisma.token.create({
        data: {
          ...createTokenDto,
          profileId: profile.id,
          token,
          expires_in: new Date(decode.exp * 1000),
          profile: {
            connect: { id: profile.id },
          },
        },
      });

      this.sendToQueue('tokenCreateLogs', {
        type: 'createToken',
        ...newToken,
      });

      return newToken;
    } catch (err) {
      this.sendToQueue('tokenErrorLogs', err);
      console.log(err);
      return {
        ...err,
      };
    }
  }

  findAll() {
    return this.prisma.token.findMany();
  }

  async findOne(id: string) {
    const token = await this.prisma.token.findUnique({ where: { id } });
    if (!token)
      throw new NotFoundException(`Token com o id ${id}, não existe!`);

    return token;
  }

  async update(id: string, updateTokenDto: UpdateTokenDto) {
    await this.findOne(id);
    const token = await this.prisma.token.update({
      where: { id },
      data: UpdateTokenDto,
    });

    this.sendToQueue('tokenUpdateLogs', {
      type: 'tokenUpdate',
      id: token.id,
      update: token.updated_at,
      fields: Object.keys(updateTokenDto),
    });

    return token;
  }

  async remove(id: string) {
    await this.findOne(id);
    const token = await this.prisma.token.delete({ where: { id } });

    this.sendToQueue('tokenRemoveLogs', {
      type: 'removeToken',
      id: token.id,
      update: token.updated_at,
    });

    return token;
  }
}
