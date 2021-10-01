import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { PrismaService } from 'src/common/utils/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(
    private readonly prisma: PrismaService,
    private httpService: HttpService,
  ) {}

  create(createCardDto: CreateCardDto) {
    return 'This action adds a new card';
  }

  token(body: any): Observable<any> {
    const data = { data: body };

    const url = `cartoes/data/${body.costumerId}`;
    return this.httpService.post(url, data).pipe(
      map((res) => {
        return { card_id: res.data.request_id };
      }),
    );
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
