import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(
  OmitType(CreateProfileDto, [
    'email',
    'document',
    'document_type',
    'user_type',
    'token',
    'user',
  ] as const),
) {}
