import { Prisma, ProvidersEnum } from '@prisma/client';
import { IsNumber, IsObject, IsString } from 'class-validator';

export class CreateProviderDto {
  @IsString()
  name: ProvidersEnum;

  @IsObject()
  credentials: Prisma.InputJsonValue;

  @IsNumber()
  priority?: number;

  @IsString()
  merchantId: string;
}
