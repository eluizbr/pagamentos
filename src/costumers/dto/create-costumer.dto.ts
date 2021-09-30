import { Prisma } from '.prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

enum CostumerDocumentType {
  cpf = 'CPF',
  cnpj = 'CNPJ',
}
export type CostumerDocument = {
  number: string;
  type: CostumerDocumentType;
  country: string;
};

export type CostumerAdderss = {
  country: string;
  state: string;
  city: string;
  district: string;
  zipCode: string;
  street: string;
  streetNumber: string;
  complement: string;
};
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

  @IsObject()
  @IsNotEmptyObject()
  document: CostumerDocument;

  @IsObject()
  @IsNotEmptyObject()
  address: CostumerAdderss;
  prodileId: string;
}
