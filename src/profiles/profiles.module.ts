import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';

@Module({
  imports: [CommonModule],
  controllers: [ProfilesController],
  providers: [ProfilesService],
  exports: [],
})
export class ProfilesModule {}
