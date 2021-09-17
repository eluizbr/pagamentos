import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { IsUserAlreadyExist } from 'src/utils/IsUserAlreadyExist.service';

export class CreateUserDto {
  @ApiProperty()
  @IsUserAlreadyExist({
    message: 'Usuário $value já existe. Por favor escolha outro nome!',
  })
  @MinLength(4)
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsUserAlreadyExist({
    message: 'Email $value já existe. Por favor escolha outro email!',
  })
  email: string;
}
