import { ApiProperty } from '@nestjs/swagger';
import { TokenType } from '@prisma/client';
import { IsString } from 'class-validator';

export class Token {
  @ApiProperty({ example: 'Developer' })
  @IsString()
  type: TokenType;

  @ApiProperty({ example: '8dca8d14-c2c7-4baf-9de7-a29b2ebd0091' })
  @IsString()
  profileId?: string;
}
