import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsUppercase,
} from 'class-validator';
import { IsCpfCnpjValid } from 'src/modules/common/utils/IsCpfCnpjValid.service';

enum CostumerDocumentType {
  CPF = 'CPF',
  CNPJ = 'CNPJ',
}

export class CreateCostumerDto {
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
  @IsNotEmpty()
  @IsCpfCnpjValid()
  document: string;

  @IsString()
  @IsUppercase()
  @IsEnum(CostumerDocumentType, { message: 'DocumentType de ser CPF ou CNPJ' })
  document_type: CostumerDocumentType;

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

  profileId: string;
}
