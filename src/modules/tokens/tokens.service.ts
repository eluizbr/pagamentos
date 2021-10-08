import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from 'src/auth/jwt.strategy';
import { PrismaService } from 'src/modules/common/utils/prisma.service';
import { ProfilesService } from 'src/modules/profiles/profiles.service';
import { ElasticQueryService } from '../common/services/elastic.query.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';

@Injectable()
export class TokensService {
  constructor(
    private readonly elasticService: ElasticQueryService,
    private readonly prisma: PrismaService,
    private readonly profileService: ProfilesService,
    private readonly jwtService: JwtService,
  ) {}

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

      return newToken;
    } catch (err) {
      throw new BadRequestException({
        status: 400,
        message: err.message,
      });
    }
  }

  async findAll(where: UserToken) {
    const { id, profileId } = where;
    return await this.elasticService.findAll('token', { profileId });
  }

  async findOne(id: string, user: UserToken) {
    const { profileId } = user;

    if (!profileId) {
      throw new NotFoundException(`Profile não enviado!`);
    }

    const token = await this.elasticService.findOne('token', { id, profileId });
    if (!token)
      throw new NotFoundException(`Token com o id ${id}, não existe!`);

    return token;
  }

  async update(id: string, userId: UserToken, updateTokenDto: UpdateTokenDto) {
    await this.findOne(id, userId);
    const token = await this.prisma.token.update({
      where: { id },
      data: UpdateTokenDto,
    });

    return token;
  }

  async remove(id: string, user: UserToken) {
    await this.findOne(id, user);
    const token = await this.prisma.token.delete({ where: { id } });

    return;
  }
}
