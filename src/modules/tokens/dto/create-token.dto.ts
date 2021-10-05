import { TokenType } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTokenDto {
  @ApiProperty({ example: 'developer' })
  @IsString()
  type: TokenType;
}
