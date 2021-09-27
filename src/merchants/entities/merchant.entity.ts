import { MecrchantStatus } from '.prisma/client';
import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

class Providers {
  @ApiProperty({ example: 'pagseguro' })
  @IsString()
  name: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  priority: number;
}

class Pagarme extends Providers {
  @ApiProperty({ example: 'pagarme' })
  @IsString()
  type: String;

  @ApiProperty({ example: '5757vvmsd#223' })
  @IsString()
  apykey: String;
}

class Pagseguro extends Providers {
  @ApiProperty({ example: 'pagseguro' })
  @IsString()
  type: String;

  @ApiProperty({ example: '5757vvmsd#223' })
  @IsString()
  token: String;

  @ApiProperty({ example: 'email@email.com' })
  @IsString()
  email: String;
}

type CredentialsType = Pagarme | Pagseguro;

@ApiExtraModels(Pagarme, Pagseguro)
export class Merchant {
  @ApiProperty({
    description: 'codigo mcc do cadatro do lojista no adquirente',
    example: '4040',
  })
  @IsString()
  mcc: string;

  @ApiProperty({ example: 'pending', enum: MecrchantStatus })
  @IsString()
  status?: MecrchantStatus;

  @ApiProperty({
    description: 'Provedores parceiros para sua conta',
    type: 'array',
    items: {
      oneOf: [
        { $ref: getSchemaPath(Pagarme) },
        { $ref: getSchemaPath(Pagseguro) },
      ],
    },
  })
  providers?: CredentialsType[];
}
