import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { TokensService } from './tokens.service';
export declare class TokensController {
    private readonly tokensService;
    constructor(tokensService: TokensService);
    create(createTokenDto: CreateTokenDto): Promise<import(".prisma/client").Token | {
        code: any;
        message: any;
    }>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Token[]>;
    findOne(id: string): Promise<import(".prisma/client").Token>;
    update(id: string, updateTokenDto: UpdateTokenDto): Promise<import(".prisma/client").Token>;
    remove(id: string): Promise<import(".prisma/client").Token>;
}
