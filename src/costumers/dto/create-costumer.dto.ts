import { costumerDocumentType, Prisma } from '.prisma/client';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { IsCpfCnpjValid } from 'src/common/utils/IsCpfCnpjValid.service';

enum CostumerDocumentType {
  cpf = 'CPF',
  cnpj = 'CNPJ',
}

export class CreateCostumerDto implements Prisma.CostumersCreateInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsPhoneNumber('BR')
  phoneNumber: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsCpfCnpjValid()
  document: string;

  @IsString()
  document_type: costumerDocumentType;

  @IsString()
  street: string;

  @IsString()
  streetNumber: string;

  @IsString()
  district: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  complement: string;

  @IsString()
  zipCode: string;

  @IsString()
  country: string;

  prodileId: string;
}
