import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { IsUserAlreadyExist } from 'src/modules/common/utils/IsUserAlreadyExist.service';

export class CreateUserDto {
  @ApiProperty({ example: 'joseSilva' })
  @IsUserAlreadyExist({
    message: 'Usuário $value já existe. Por favor escolha outro nome!',
  })
  @MinLength(4)
  username: string;

  @ApiProperty({ example: '#er%ˆdfgtee23' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'email@email.com' })
  @IsUserAlreadyExist({
    message: 'Email $value já existe. Por favor escolha outro email!',
  })
  email: string;
}
