import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: '#er%ˆdfgtee23' })
  @IsString()
  @MinLength(8)
  password: string;
}
