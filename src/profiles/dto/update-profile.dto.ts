import { Prisma } from '.prisma/client';
import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto
  extends PartialType(CreateProfileDto)
  implements Prisma.ProfileWhereUniqueInput {}
