import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  created_at?: string;

  @ApiProperty()
  updated_at?: string;
}
