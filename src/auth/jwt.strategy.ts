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
    const user: any = await this.prisma.user.findUnique({
      where: { id: sub },
    });

    const profile = await this.prisma.profile.findFirst({
      where: { userId: user.id },
    });

    if (!user || !profile) {
      throw new UnauthorizedException('Não autorizado');
    }

    delete user.password;
    user.profileId = profile.id;
    return user;
  }
}
