import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';
export declare class ProfilesController {
    private readonly profilesService;
    constructor(profilesService: ProfilesService);
    create(createProfileDto: CreateProfileDto): Promise<import(".prisma/client").Profile | {
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
