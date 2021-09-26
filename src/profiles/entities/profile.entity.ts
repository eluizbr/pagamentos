import { DocumentType, UserType } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Profile {
  @ApiProperty({ example: 'José Silva' })
  name: string;

  @ApiProperty({ example: 'jose.silva@email.com' })
  email: string;

  @ApiProperty({ example: '11122233344' })
  document: string;

  @ApiProperty({ enum: ['CPF', 'CNPG'] })
  document_type: DocumentType;

  @ApiProperty({ enum: ['PF', 'PJ'] })
  user_type: UserType;

  @ApiProperty({ example: '31999999999' })
  phone: string;

  @ApiProperty({ example: 'Rua X' })
  street: string;

  @ApiProperty({ example: '10' })
  street_number: string;

  @ApiProperty({ example: 'APTO 100' })
  complementary: string;

  @ApiProperty({ example: 'Centro' })
  neighborhood: string;

  @ApiProperty({ example: 'Belo Horizonte' })
  city: string;

  @ApiProperty({ example: 'MG' })
  state: string;

  @ApiProperty({ example: '30320320' })
  zipcode: string;

  @ApiProperty({ example: 'BR' })
  country?: string;
}
