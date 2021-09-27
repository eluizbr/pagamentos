import { MecrchantStatus, Prisma } from '.prisma/client';

export class CreateMerchantDto {
  mcc: string;
  status?: MecrchantStatus;
  userId: string;
  profile: Prisma.ProfileCreateNestedOneWithoutMerchantInput;
  provider?: Prisma.ProvidersCreateNestedManyWithoutMerchantInput;
}
