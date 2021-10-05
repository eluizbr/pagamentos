import { ApiProperty } from '@nestjs/swagger';

enum CostumerDocumentType {
  cpf = 'CPF',
  cnpj = 'CNPJ',
}

export class CostumerResult {
  @ApiProperty({ example: '3b089dd3-6038-416f-b607-e20fbadd9f1e' })
  id: string;

  @ApiProperty({ example: 'José Silva' })
  name: string;

  @ApiProperty({ example: '31991234567' })
  phoneNumber: string;

  @ApiProperty({ example: 'email@email.com' })
  email: string;

  @ApiProperty({ example: '28679869074' })
  document: string;

  @ApiProperty({ example: 'CPF' })
  document_type: CostumerDocumentType;

  @ApiProperty({ example: 'Rua 1' })
  street: string;

  @ApiProperty({ example: '25' })
  streetNumber: string;

  @ApiProperty({ example: 'APTO 10' })
  complement: string;

  @ApiProperty({ example: 'Centro' })
  district: string;

  @ApiProperty({ example: 'Belo Horizonte' })
  city: string;

  @ApiProperty({ example: 'MG' })
  state: string;

  @ApiProperty({ example: '30210210' })
  zipCode: string;

  @ApiProperty({ example: 'BR' })
  country: string;

  @ApiProperty({ example: '2021-09-30T13:00:11.607Z' })
  created_at: string;

  @ApiProperty({ example: '2021-09-30T13:00:11.607Z' })
  updated_at: string;

  @ApiProperty({ example: 'ddd47061-4599-4a2f-a53f-142e0847ff21' })
  prodileId: string;
}
