import { ApiPropertyOptional } from '@nestjs/swagger';

enum CostumerDocumentType {
  cpf = 'CPF',
  cnpj = 'CNPJ',
}

export class CostumerUpdate {
  @ApiPropertyOptional({ example: '31991234567' })
  phoneNumber: string;

  @ApiPropertyOptional({ example: 'email@email.com' })
  email: string;

  @ApiPropertyOptional({ example: '12345678900' })
  number: string;

  @ApiPropertyOptional({ example: 'cpf' })
  type: CostumerDocumentType;

  @ApiPropertyOptional({ example: 'Rua 1' })
  street: string;

  @ApiPropertyOptional({ example: '25' })
  streetNumber: string;

  @ApiPropertyOptional({ example: 'APTO 10' })
  complement: string;

  @ApiPropertyOptional({ example: 'Centro' })
  district: string;

  @ApiPropertyOptional({ example: 'MG' })
  state: string;

  @ApiPropertyOptional({ example: 'Belo Horizonte' })
  city: string;

  @ApiPropertyOptional({ example: '30210210' })
  zipCode: string;

  @ApiPropertyOptional({ example: 'BR' })
  country: string;
}
