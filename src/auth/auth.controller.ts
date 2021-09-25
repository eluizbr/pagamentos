import { Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('auth/login')
  async login(@Request() req) {
    return this.authservice.login(req.body);
  }
}
