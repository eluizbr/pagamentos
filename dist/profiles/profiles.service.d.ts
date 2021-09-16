import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/utils/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class ProfilesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.ProfileCreateInput): Promise<import(".prisma/client").Profile | {
        code: any;
        message: any;
    }>;
    findAll(): import(".prisma/client").PrismaPromise<(import(".prisma/client").Profile & {
        token: import(".prisma/client").Token[];
    })[]>;
    findOne(id: string): Promise<import(".prisma/client").Profile & {
        token: import(".prisma/client").Token[];
    }>;
    update(id: string, updateProfileDto: UpdateProfileDto): Promise<import(".prisma/client").Profile>;
    remove(id: string): Promise<import(".prisma/client").Profile>;
}
