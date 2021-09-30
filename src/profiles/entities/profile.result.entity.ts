import { DocumentType, UserType } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { CostumerResult } from 'src/costumers/entities/costumer.result.entity';
import { ResultTokenDto } from 'src/tokens/entities/result-token.entity';
import { User } from 'src/users/entities/user.entity';

export class ProfileResult {
  @ApiProperty({ example: 'ddd47061-4599-4a2f-a53f-142e0847ff21' })
  id: string;

  @ApiProperty({ example: 'José Silva' })
  name: string;

  @ApiProperty({ example: 'jose.silva@email.com' })
  email: string;

  @ApiProperty({ example: '11122233344' })
  document: string;

  @ApiProperty({ enum: ['CPF', 'CNPJ'] })
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

  @ApiProperty({ type: User, isArray: true })
  user: string;

  @ApiProperty({ type: ResultTokenDto, isArray: true })
  token: string;

  @ApiProperty({ type: CostumerResult, isArray: true })
  costumers: string;
}
