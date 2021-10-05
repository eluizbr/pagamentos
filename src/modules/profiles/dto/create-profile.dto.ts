import { DocumentType, Prisma, UserType } from '@prisma/client';
import { IsEmail, IsString, Length } from 'class-validator';
import { IsCpfCnpjValid } from 'src/modules/common/utils/IsCpfCnpjValid.service';
import { IsProfileAlreadyExist } from 'src/modules/common/utils/IsProfileAlreadyExist.service';

export default class CreateProfileDto implements Prisma.ProfileCreateInput {
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

  @IsString()
  @Length(11, 20, {
    message: 'O Telefone deve conter no mínimo 11 caracteres',
  })
  phone: string;

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

  userId?: string;

  token?: Prisma.TokenCreateNestedManyWithoutProfileInput;
}
