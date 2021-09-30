import { PartialType } from '@nestjs/swagger';
import { CreateCostumerDto } from './create-costumer.dto';

export class UpdateCostumerDto extends PartialType(CreateCostumerDto) {}
