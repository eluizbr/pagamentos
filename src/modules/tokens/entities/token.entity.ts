import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

enum TokenEnum {
  developement,
  production,
}
export class Token {
  @ApiProperty({ example: 'developement' })
  @IsString()
  type: TokenEnum;
}
