import { CardsBrand, CardsStatus, Prisma } from '.prisma/client';

export class CreateCardDto implements Prisma.CardsCreateInput {
  cardId?: string;
  expirationMonth: string;
  expirationYear: string;
  brand: CardsBrand;
  last4digits: string;
  status: string;
  cvvChecked?: CardsStatus;
  costumerId: string;
}
