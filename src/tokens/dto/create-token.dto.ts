import { Prisma, TokenType } from '.prisma/client';
import { IsString } from 'class-validator';

export class CreateTokenDto implements Prisma.TokenCreateInput {
  @IsString()
  type: TokenType;

  @IsString()
  profileId?: string;
}
