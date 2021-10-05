import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { ChargesController } from './charges.controller';
import { ChargesService } from './charges.service';

@Module({
  imports: [CommonModule],
  controllers: [ChargesController],
  providers: [ChargesService],
})
export class ChargesModule {}
