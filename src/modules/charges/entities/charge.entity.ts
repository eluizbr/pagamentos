import { CardsStatus } from '.prisma/client';

enum PaymentMethodCardEnum {
  credit = 'credit',
  debit = 'debit',
}
enum PaymentMethodBoletoEnum {
  boleto = 'boleto',
}

class PaymentMethodCard {
  paymentType: PaymentMethodCardEnum;
  installments: number;
}

class PaymentMethodBoleto {
  paymentType: PaymentMethodBoletoEnum;
  expiresDate: string;
  instructions: string;
  days: number;
  amount: number;
  percentage: number;
}

type PaymentMethodTypes = PaymentMethodCard | PaymentMethodBoleto;

export class Charges {
  amount: number;
  currency?: string;
  statementDescriptor: string;
  description: string;
  status: CardsStatus;
  paymentMethod: PaymentMethodTypes;
}
