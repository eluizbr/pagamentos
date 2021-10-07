import { paymentMethodType, Prisma } from '.prisma/client';
import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateChargeDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsString()
  paymentMethod: paymentMethodType;

  @IsNotEmpty({ message: 'ID do merchant é obrigatório' })
  @IsString({ message: 'ID do merchant deve ser do tipo string' })
  merchantId: string;

  @IsNotEmpty({ message: 'ID do costumer é obrigatório' })
  @IsString({ message: 'ID do costumer deve ser do tipo string' })
  costumerId: string;

  @IsNotEmpty({ message: 'ID do profile é obrigatório' })
  @IsString({ message: 'ID do profile deve ser do tipo string' })
  profileId: string;

  @IsNotEmpty({ message: 'ID do cartão é obrigatório' })
  @IsString({ message: 'ID do cartão deve ser do tipo string' })
  @ValidateIf((o) => o.paymentMethod === 'credit')
  cardId: string;

  @IsNotEmpty({ message: 'Installment é obrigatório' })
  @IsNumber({ allowNaN: false })
  @ValidateIf((o) => o.paymentMethod === 'credit')
  installments?: number;

  @IsNotEmpty({ message: 'ExpiresDate é obrigatório' })
  @ValidateIf((o) => o.paymentMethod === 'boleto')
  expiresDate?: string;

  @IsNotEmpty({ message: 'Instructions é obrigatório' })
  @ValidateIf((o) => o.paymentMethod === 'boleto')
  instructions?: string;

  @IsNotEmpty({ message: 'InterestDays é obrigatório' })
  @ValidateIf((o) => o.paymentMethod === 'boleto')
  interestDays?: number;

  @IsNotEmpty({ message: 'InterestAmount é obrigatório' })
  @ValidateIf((o) => o.paymentMethod === 'boleto')
  interestAmount?: Prisma.Decimal;

  @IsNotEmpty({ message: 'InterestPercentage é obrigatório' })
  @ValidateIf((o) => o.paymentMethod === 'boleto')
  interestPercentage?: number;

  @IsNotEmpty({ message: 'FineDays é obrigatório' })
  @ValidateIf((o) => o.paymentMethod === 'boleto')
  fineDays?: number;

  @IsNotEmpty({ message: 'FineAmount é obrigatório' })
  @ValidateIf((o) => o.paymentMethod === 'boleto')
  fineAmount?: Prisma.Decimal;

  @IsNotEmpty({ message: 'FinePercentage é obrigatório' })
  @ValidateIf((o) => o.paymentMethod === 'boleto')
  finePercentage?: number;
}
