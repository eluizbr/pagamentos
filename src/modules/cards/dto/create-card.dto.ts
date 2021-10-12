import { CardsStatus } from '.prisma/client';

export class CreateCardDto {
  cardId?: string;
  profileId?: string;
  expirationMonth: string;
  expirationYear: string;
  brand: string;
  last4digits: string;
  status: string;
  cvvChecked?: CardsStatus;
  costumerId: string;
}
