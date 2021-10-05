import { ProvidersEnum } from '.prisma/client';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export class Pagarme {
  @ApiProperty({ example: 'pagarme' })
  type: string;

  @ApiProperty({ example: 'ak_test_1bce510e13b8ef103b58287b6' })
  apiKey: string;
}
export class Pagseguro {
  @ApiProperty({ example: 'pagseguro' })
  type: string;

  @ApiProperty({ example: '60f547bd73908dd47fbed2677570d743ad7f6ab9' })
  token: string;

  @ApiProperty({ example: 'email@email.com' })
  email: string;
}

@ApiExtraModels(Pagarme, Pagseguro)
export class Provider {
  @ApiProperty({ enum: ProvidersEnum })
  name: ProvidersEnum;
  @ApiProperty({ example: 1 })
  priority?: number;

  @ApiProperty({ example: '152f6a39-d083-460f-aa66-e770a069356b' })
  merchant: string;

  @ApiProperty()
  credentials: Pagarme;
}
