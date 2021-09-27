import { ApiProperty } from '@nestjs/swagger';

export class MerchantResult {
  @ApiProperty({ example: '152f6a39-d083-460f-aa66-e770a069356b' })
  id: string;

  @ApiProperty({ example: '4040' })
  mcc: string;

  @ApiProperty({ example: 'pending' })
  status: string;

  @ApiProperty({ example: '2021-09-27T22:46:15.932Z' })
  created_at: Date;

  @ApiProperty({ example: '2021-09-27T22:46:15.932Z' })
  updated_at: Date;

  @ApiProperty({ example: 'ddd47061-4599-4a2f-a53f-142e0847ff21' })
  profileId: string;

  @ApiProperty({ example: '4618e0d3-6d67-4e5c-8652-3da33df7d455' })
  userId: string;
}
