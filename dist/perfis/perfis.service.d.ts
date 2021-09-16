import { Perfil } from '.prisma/client';
import { PrismaService } from 'src/utils/prisma.service';
import { CreatePerfiDto } from './dto/create-perfi.dto';
import { UpdatePerfiDto } from './dto/update-perfi.dto';
export declare class PerfisService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreatePerfiDto): Promise<Perfil>;
    findAll(): import(".prisma/client").PrismaPromise<Perfil[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__PerfilClient<Perfil>;
    update(id: number, updatePerfiDto: UpdatePerfiDto): string;
    remove(id: number): string;
}
