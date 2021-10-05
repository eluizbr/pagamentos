import { PartialType } from '@nestjs/mapped-types';
import { OmitType } from '@nestjs/swagger';
import CreateProfileDto from './create-profile.dto';

export class UpdateProfileDto extends OmitType(PartialType(CreateProfileDto), [
  'document',
  'email',
  'document_type',
  'user_type',
  'userId',
]) {}
