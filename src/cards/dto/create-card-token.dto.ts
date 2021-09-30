import { IsCreditCard, IsNotEmpty, IsString } from 'class-validator';

export class CreateCardTokenDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome impresso no cartão é obrigatório' })
  cardHolderName: string;

  @IsString()
  @IsNotEmpty({ message: 'Número de cartão válido é obrigatório' })
  @IsCreditCard({ message: `Número de cartão é inválido` })
  cardNumber: string;

  @IsString()
  @IsNotEmpty({ message: 'Número CVV válido é obrigatório' })
  cardCvv: string;

  @IsString()
  @IsNotEmpty({ message: 'Data de expiração do cartão é obrigatório' })
  cardExpirationDate: string;

  @IsString()
  @IsNotEmpty({ message: 'Usuário para o cartão é obrigatório' })
  costumerId: string;

  @IsString()
  @IsNotEmpty({ message: 'Profile para o cartão é obrigatório' })
  profileId: string;
}
