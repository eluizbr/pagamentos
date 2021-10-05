import { Module } from '@nestjs/common';
import { CommonModule } from 'src/modules/common/common.module';
import { MerchantsController } from './merchants.controller';
import { MerchantsService } from './merchants.service';

@Module({
  imports: [CommonModule],
  controllers: [MerchantsController],
  providers: [MerchantsService],
})
export class MerchantsModule {}
