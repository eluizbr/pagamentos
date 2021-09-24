import { DocumentType, Prisma, UserType } from '@prisma/client';
import { IsEmail, IsNumber, IsString, Length } from 'class-validator';
import { IsCpfCnpjValid } from 'src/utils/IsCpfCnpjValid.service';
import { IsProfileAlreadyExist } from 'src/utils/IsProfileAlreadyExist.service';

export class CreateProfileDto {
  @IsString()
  name: string;

  @IsEmail()
  @IsProfileAlreadyExist({
    message: 'Email $value já existe. Por favor escolha outro email!',
  })
  email: string;

  @IsProfileAlreadyExist()
  @IsCpfCnpjValid()
  document: string;

  @IsString()
  document_type: DocumentType;

  @IsString()
  user_type: UserType;

  @IsNumber()
  phone: number;

  @IsString()
  street: string;

  @IsString()
  street_number: string;

  @IsString()
  complementary: string;

  @IsString()
  neighborhood: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  @Length(8, 8, {
    message: 'O CEP deve conter no mínimo e no máximo de 8 caracteres',
  })
  zipcode: string;

  @IsString()
  @Length(2, 2, {
    message: 'O País deve conter no mínimo e no máximo de 2 caracteres',
  })
  country?: string;

  @IsString()
  user: string;

  token?: Prisma.TokenCreateNestedManyWithoutProfileInput;
}
