import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { ProfilesService } from 'src/profiles/profiles.service';
import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';

@Module({
  imports: [CommonModule],
  controllers: [TokensController],
  providers: [TokensService, ProfilesService],
})
export class TokensModule {}
