import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { PrismaService } from 'src/utils/prisma.service';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(payload: Auth): Promise<{ token: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (user && (await verify(user.password, payload.password))) {
      const result = { sub: user.id };
      return {
        token: this.jwtService.sign(result),
      };
    }
    throw new UnauthorizedException(`Não autorizado!`);
  }
}
