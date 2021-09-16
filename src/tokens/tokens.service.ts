import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';

@Injectable()
export class TokensService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTokenDto: CreateTokenDto) {
    const profile: any = createTokenDto.profileId;
    try {
      return await this.prisma.token.create({
        data: {
          ...createTokenDto,
          profile: {
            connect: { id: profile },
          },
        },
      });
    } catch (err) {
      return {
        code: err.code,
        message: err.meta.cause,
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
    const token = await this.findOne(id);
    return this.prisma.token.update({
      where: { id },
      data: UpdateTokenDto,
    });
  }

  async remove(id: string) {
    const token = await this.findOne(id);
    return await this.prisma.token.delete({ where: { id } });
  }
}
