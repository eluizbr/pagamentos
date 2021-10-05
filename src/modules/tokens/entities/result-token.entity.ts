import { ApiProperty } from '@nestjs/swagger';

export class ResultTokenDto {
  @ApiProperty({ example: 'e08bddb9-f94b-4415-9996-652e16936342' })
  id: string;

  @ApiProperty({ example: 'developement' })
  type: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  token: string;

  @ApiProperty({ example: 'cktzu9oco0007xaull3fopm2l' })
  client_id: string;

  @ApiProperty({ example: 'true' })
  is_active: boolean;

  @ApiProperty({ example: '2021-09-25T13:38:45.768Z' })
  created_at: string;

  @ApiProperty({ example: '2021-09-25T13:38:45.769Z' })
  updated_at: string;

  @ApiProperty({
    example: '2022-09-26T14:14:36.000Z',
    description: 'Por padrão expira em 1 ano',
  })
  expires_in: string;

  @ApiProperty({ example: '8dca8d14-c2c7-4baf-9de7-a29b2ebd0091' })
  profile: string;
}
