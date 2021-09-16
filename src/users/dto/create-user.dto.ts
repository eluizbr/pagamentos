import { IsString } from 'class-validator';
import { IsUserAlreadyExist } from 'src/utils/IsUserAlreadyExist.service';

export class CreateUserDto {
  @IsUserAlreadyExist({
    message: 'Usuário $value já existe. Por favor escolha outro nome!',
  })
  username;

  @IsString()
  password;

  @IsUserAlreadyExist({
    message: 'Email $value já existe. Por favor escolha outro email!',
  })
  email;
}
