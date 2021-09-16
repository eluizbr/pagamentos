import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/utils/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.UserCreateInput): Promise<import(".prisma/client").User | {
        code: any;
        message: any;
    }>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").User[]>;
    findOne(id: string): Prisma.Prisma__UserClient<import(".prisma/client").User>;
    findOneByUsername(username: string): Prisma.Prisma__UserClient<import(".prisma/client").User>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
