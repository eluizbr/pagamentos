import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { PrismaService } from 'src/utils/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any): Promise<CreateUserDto> {
    const { sub } = payload;
    const user: CreateUserDto = await this.prisma.user.findUnique({
      where: { id: sub },
    });

    if (!user) {
      throw new UnauthorizedException('Não autorizado');
    }

    return user;
  }
}
