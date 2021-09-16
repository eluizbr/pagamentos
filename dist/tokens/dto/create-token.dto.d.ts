import { Prisma, TokenType } from '.prisma/client';
export declare class CreateTokenDto implements Prisma.TokenCreateInput {
    type: TokenType;
    profileId?: string;
}
