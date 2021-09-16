import { Prisma } from '.prisma/client';
import { UpdatePerfiDto } from './dto/update-perfi.dto';
import { PerfisService } from './perfis.service';
export declare class PerfisController {
    private readonly perfisService;
    constructor(perfisService: PerfisService);
    create(createPerfiDto: Prisma.PerfilCreateInput): Promise<import(".prisma/client").Perfil>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Perfil[]>;
    findOne(id: string): Prisma.Prisma__PerfilClient<import(".prisma/client").Perfil>;
    update(id: string, updatePerfiDto: UpdatePerfiDto): string;
    remove(id: string): string;
}
