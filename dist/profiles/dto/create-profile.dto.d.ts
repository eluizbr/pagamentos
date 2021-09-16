import { DocumentType, Prisma, UserType } from '@prisma/client';
export declare class CreateProfileDto implements Prisma.ProfileCreateInput {
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
    zipcode: string;
    country?: string;
    user: Prisma.UserCreateNestedOneWithoutProfileInput;
    token?: Prisma.TokenCreateNestedManyWithoutProfileInput;
}
