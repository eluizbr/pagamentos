import { Prisma } from '.prisma/client';
import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { UserToken } from 'src/auth/jwt.strategy';
import { GetCreditCardService } from 'src/modules/common/utils/getCreditCardBrand.service';
import { PrismaService } from 'src/modules/common/utils/prisma.service';
import { ElasticQueryService } from '../common/services/elastic.query.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(
    private readonly elasticService: ElasticQueryService,
    private readonly prisma: PrismaService,
    private httpService: HttpService,
    private readonly crediteCardService: GetCreditCardService,
  ) {}

  async create(data: Prisma.CardsCreateInput, user: UserToken) {
    const { costumerId } = data;

    try {
      const card = await this.prisma.cards.create({
        data: {
          ...data,
          costumer: {
            connect: { id: data.costumerId },
          },
          profile: {
            connect: { id: user.profileId },
          },
        },
      });

      return card;
    } catch (err) {
      throw new BadRequestException({
        status: 400,
        message: `O card ${err.meta.target}, já esta em uso por outro usuário!`,
      });
    }
  }

  async token(body: any, user: UserToken): Promise<any> {
    body.profileId = user.profileId;
    const data = { data: body };

    const newCard: CreateCardDto = {
      expirationMonth: body.cardExpirationDate.substring(0, 2),
      expirationYear: body.cardExpirationDate.substring(3, 8),
      brand: this.crediteCardService.brand(body.cardNumber),
      last4digits: body.cardNumber.substring(12, 16),
      status: '',
      cvvChecked: 'pending',
      costumerId: body.costumerId,
    };

    try {
      const newCardResult: any = await this.create(newCard, user);

      const url = `cartoes/data/${newCardResult.id}`;
      return this.httpService.post(url, data).pipe(map((res) => newCardResult));
    } catch (err) {
      throw new BadRequestException({
        status: 400,
        message: `O card ${err.meta.target}, já esta em uso por outro usuário!`,
      });
    }
  }

  findAll(where: Prisma.CardsWhereInput) {
    return this.elasticService.findAll('cards', where);
  }

  findOne(id: string, user: UserToken) {
    const { profileId } = user;
    return this.elasticService.findOne('cards', { id, profileId });
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  async remove(id: string, user: UserToken) {
    await this.findOne(id, user);
    const { profileId } = user;

    try {
      await this.prisma.cards.delete({ where: { id } });
      return;
    } catch (err) {
      throw new BadRequestException({
        status: 404,
        message: `Erro ao tentar remover o card ${id}`,
      });
    }
  }
}
