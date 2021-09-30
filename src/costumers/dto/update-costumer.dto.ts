import { OmitType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateCostumerDto } from './create-costumer.dto';

export class UpdateCostumerDto extends OmitType(
  PartialType(CreateCostumerDto),
  ['document', 'name', 'profileId'],
) {}
