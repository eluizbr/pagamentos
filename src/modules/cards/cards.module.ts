import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CommonModule } from 'src/modules/common/common.module';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

@Module({
  imports: [
    CommonModule,
    HttpModule.register({
      baseURL: process.env.VAULT_URL,
      headers: {
        'X-Vault-Token': process.env.VAULT_TOKEN,
      },
    }),
  ],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
