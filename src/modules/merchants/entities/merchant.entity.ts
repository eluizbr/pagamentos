import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class Merchant {
  @ApiProperty({
    description: 'codigo mcc do cadatro do lojista no adquirente',
    example: '4040',
  })
  @IsString()
  mcc: string;

  @ApiProperty({
    description: 'Id do profile',
    example: '9b1ee4d9-dde0-4474-91ff-828e15c04e66',
  })
  @IsString()
  profileId: string;
}
