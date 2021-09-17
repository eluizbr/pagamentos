import { DocumentType, UserType } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Profile {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  document: string;

  @ApiProperty({ enum: ['CPF', 'CNPG'] })
  document_type: DocumentType;

  @ApiProperty({ enum: ['PF', 'PJ'] })
  user_type: UserType;

  @ApiProperty()
  phone: number;

  @ApiProperty()
  street: string;

  @ApiProperty()
  street_number: string;

  @ApiProperty()
  complementary: string;

  @ApiProperty()
  neighborhood: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  zipcode: string;

  @ApiProperty()
  country?: string;

  @ApiProperty({
    description: 'User ID',
  })
  user: string;
}
