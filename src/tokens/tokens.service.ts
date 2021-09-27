import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/common/utils/prisma.service';
import RabbitmqService from 'src/common/utils/rabbitmq-service';
import { ProfilesService } from 'src/profiles/profiles.service';
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

  async create(createTokenDto: CreateTokenDto, user: any) {
    const { id, profileId } = user;
    const { type } = createTokenDto;
    const { token, decode }: any = await this.generateToken(id, type);

    try {
      const newToken = await this.prisma.token.create({
        data: {
          ...createTokenDto,
          profileId,
          token,
          expires_in: new Date(decode.exp * 1000),
          profile: {
            connect: { id: profileId },
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

      throw new BadRequestException({
        status: 400,
        message: err.message,
      });
    }
  }

  async findAll(user: any) {
    const { id, profileId } = user;
    return this.prisma.token.findMany({ where: { profileId } });
  }

  async findOne(id: string, user: any) {
    const { profileId } = user;

    if (!profileId) {
      throw new NotFoundException(`Profile não enviado!`);
    }

    const token = await this.prisma.token.findUnique({ where: { id } });
    if (!token)
      throw new NotFoundException(`Token com o id ${id}, não existe!`);

    return token;
  }

  async update(id: string, userId: string, updateTokenDto: UpdateTokenDto) {
    await this.findOne(id, userId);
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

  async remove(id: string, user: any) {
    await this.findOne(id, user);
    const token = await this.prisma.token.delete({ where: { id } });

    this.sendToQueue('tokenRemoveLogs', {
      type: 'removeToken',
      id: token.id,
      update: token.updated_at,
    });

    return;
  }
}
