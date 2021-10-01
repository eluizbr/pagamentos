import { Prisma } from '.prisma/client';
import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { UserToken } from 'src/auth/jwt.strategy';
import { PrismaService } from 'src/common/utils/prisma.service';
import RabbitmqService from 'src/common/utils/rabbitmq-service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(
    private readonly prisma: PrismaService,
    private httpService: HttpService,
    private readonly rabbitmq: RabbitmqService,
  ) {}

  sendToQueue(routingKey: string, data: any) {
    this.rabbitmq.publishInExchange(
      process.env.RABBTIMQ_CARD_EXCHANGE,
      routingKey,
      data,
    );
  }

  async create(data: Prisma.CardsCreateInput, user: UserToken) {
    const { costumerId } = data;
    try {
      const card = await this.prisma.cards.create({
        data: {
          ...data,
          costumer: {
            connect: { id: data.costumerId },
          },
        },
      });

      this.sendToQueue('cardCreateLogs', {
        type: 'createCard',
        ...card,
      });

      return card;
    } catch (err) {
      console.log(err);
      this.sendToQueue('cardErrorLogs', {
        costumerId,
        error: err.meta,
      });

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
      expirationMonth: '',
      expirationYear: '',
      brand: 'master',
      last4digits: '',
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

  findAll() {
    return `This action returns all cards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} card`;
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
