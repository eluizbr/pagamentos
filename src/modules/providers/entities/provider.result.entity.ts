import { ProvidersEnum } from '.prisma/client';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

class Pagarme {
  @ApiProperty({ example: 'pagarme' })
  type: string;

  @ApiProperty({ example: 'XPTO_KEY' })
  apiKey: string;
}

@ApiExtraModels(Pagarme)
export class ProviderResult {
  @ApiProperty({ example: '187699f9-792c-4804-86af-cc7afc30213d' })
  id: string;

  @ApiProperty({ enum: ProvidersEnum })
  name: ProvidersEnum;

  @ApiProperty()
  credentials: Pagarme;

  @ApiProperty({ example: 1 })
  priority?: number;

  @ApiProperty({ example: '2021-09-28T19:24:37.673Z' })
  created_at: string;

  @ApiProperty({ example: '2021-09-28T19:24:37.673Z' })
  updated_at: string;

  @ApiProperty({ example: 'ddd47061-4599-4a2f-a53f-142e0847ff21' })
  profileId: string;

  @ApiProperty({ example: '4618e0d3-6d67-4e5c-8652-3da33df7d455' })
  userId: string;

  @ApiProperty({ example: '152f6a39-d083-460f-aa66-e770a069356b' })
  merchantId: string;
}
