import { TokenType } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTokenDto {
  @ApiProperty({ example: 'developer' })
  @IsString()
  type: TokenType;

  @ApiProperty({ example: '8dca8d14-c2c7-4baf-9de7-a29b2ebd0091' })
  @IsString()
  profileId?: string;
}
