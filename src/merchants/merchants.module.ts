import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { MerchantsController } from './merchants.controller';
import { MerchantsService } from './merchants.service';

@Module({
  imports: [AuthModule],
  controllers: [MerchantsController],
  providers: [MerchantsService],
})
export class MerchantsModule {}
