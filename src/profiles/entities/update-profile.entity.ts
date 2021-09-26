import { ApiProperty } from '@nestjs/swagger';

export class ProfileUpdate {
  @ApiProperty({ example: 'José Silva' })
  name: string;

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
