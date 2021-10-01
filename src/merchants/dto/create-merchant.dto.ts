import { IsString } from 'class-validator';

export class CreateMerchantDto {
  @IsString({ message: 'MCC não enviado ou não válido' })
  mcc: string;
}
