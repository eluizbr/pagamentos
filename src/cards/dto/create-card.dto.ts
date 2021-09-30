import { CardsBrand, CardsStatus, Prisma } from '.prisma/client';

export class CreateCardDto implements Prisma.CardsCreateInput {
  id?: string;
  cardId: string;
  expirationMonth: string;
  expirationYear: string;
  brand: CardsBrand;
  lsa4digits: string;
  status: string;
  cvvChecked?: CardsStatus;
  created_at?: string | Date;
  costumerId: string;
  costumer?: Prisma.CostumersCreateNestedManyWithoutCardsInput;
}
