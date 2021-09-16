import { DocumentType, Prisma, UserType } from '.prisma/client';
export declare class CreatePerfiDto implements Prisma.PerfilCreateInput {
    name: string;
    email: string;
    document: string;
    document_type: DocumentType;
    user_type: UserType;
    phone: number;
    street: string;
    street_number: string;
    complementary: string;
    neighborhood: string;
    city: string;
    state: string;
    zipcode: number;
    country?: string;
    created_at?: string | Date;
    updated_at?: string | Date;
    user: Prisma.UserCreateNestedOneWithoutPerfilInput;
    token?: Prisma.TokenCreateNestedManyWithoutPerfilInput;
}
