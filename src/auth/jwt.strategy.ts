import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/common/utils/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class UserToken {
  id: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
  profileId: string;
  password: string | null;
}

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

    if (!user) {
      throw new UnauthorizedException('Não autorizado');
    }

    delete user.password;
    user.profileId = profile?.id;

    const userToken: UserToken = {
      ...user,
      profileId: profile?.id,
      password: null,
    };

    return userToken;
  }
}
