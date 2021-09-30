import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { CostumersController } from './costumers.controller';
import { CostumersService } from './costumers.service';

@Module({
  imports: [CommonModule],
  controllers: [CostumersController],
  providers: [CostumersService],
})
export class CostumersModule {}
