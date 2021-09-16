import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import(".prisma/client").User | {
        code: any;
        message: any;
    }>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").User[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User>;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
