import { ApiProperty } from '@nestjs/swagger';
import { DocumentType, UserType } from '@prisma/client';

export class UpdateProfileDto {
  name?: string;
  email?: string;
  document?: string;

  @ApiProperty({ enum: ['CPF', 'CNPG'] })
  document_type?: DocumentType;

  @ApiProperty({ enum: ['PF', 'PJ'] })
  user_type?: UserType;
  phone?: number;
  street?: string;
  street_number?: string;
  complementary?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  country?: string;
}
