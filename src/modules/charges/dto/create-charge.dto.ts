import { paymentMethodType, Prisma } from '.prisma/client';
import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateChargeDto implements Prisma.ChargesCreateInput {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsString()
  paymentMethod: paymentMethodType;

  @IsNotEmpty()
  @IsString()
  mechantId: string;

  @IsNotEmpty()
  @IsNumber()
  @ValidateIf((o) => o.paymentMethod === 'credit')
  installments?: number;

  @IsNotEmpty()
  @ValidateIf((o) => o.paymentMethod === 'boleto')
  expiresDate?: string;

  @IsNotEmpty()
  @ValidateIf((o) => o.paymentMethod === 'boleto')
  instructions?: string;

  @IsNotEmpty()
  @ValidateIf((o) => o.paymentMethod === 'boleto')
  interestDays?: number;

  @IsNotEmpty()
  @ValidateIf((o) => o.paymentMethod === 'boleto')
  interestAmount?: Prisma.Decimal;

  @IsNotEmpty()
  @ValidateIf((o) => o.paymentMethod === 'boleto')
  interestPercentage?: number;

  @IsNotEmpty()
  @ValidateIf((o) => o.paymentMethod === 'boleto')
  fineDays?: number;

  @IsNotEmpty()
  @ValidateIf((o) => o.paymentMethod === 'boleto')
  fineAmount?: Prisma.Decimal;

  @IsNotEmpty()
  @ValidateIf((o) => o.paymentMethod === 'boleto')
  finePercentage?: number;
}
