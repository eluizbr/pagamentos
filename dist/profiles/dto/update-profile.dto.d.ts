import { Prisma } from '.prisma/client';
import { CreateProfileDto } from './create-profile.dto';
declare const UpdateProfileDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateProfileDto>>;
export declare class UpdateProfileDto extends UpdateProfileDto_base implements Prisma.ProfileWhereUniqueInput {
}
export {};
