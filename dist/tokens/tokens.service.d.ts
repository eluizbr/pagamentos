import { PrismaService } from 'src/utils/prisma.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
export declare class TokensService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createTokenDto: CreateTokenDto): Promise<import(".prisma/client").Token | {
        code: any;
        message: any;
    }>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Token[]>;
    findOne(id: string): Promise<import(".prisma/client").Token>;
    update(id: string, updateTokenDto: UpdateTokenDto): Promise<import(".prisma/client").Token>;
    remove(id: string): Promise<import(".prisma/client").Token>;
}
