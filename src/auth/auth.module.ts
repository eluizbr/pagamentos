import { Module } from '@nestjs/common';
import { CommonModule } from 'src/modules/common/common.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [CommonModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
