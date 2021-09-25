import { Controller, Post, Request } from '@nestjs/common';
import {
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';

class AuthUser {
  @ApiProperty({ example: 'email@email.com' })
  email: string;

  @ApiProperty({ example: 'superSenha' })
  password: string;
}
class AuthToken {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  token: string;
}

@Controller()
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('auth/login')
  @ApiOkResponse({
    description: 'Autenticar usuário',
    type: AuthToken,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBody({ type: AuthUser })
  @ApiOperation({ summary: 'Autenticar usuário' })
  async login(@Request() req) {
    return this.authservice.login(req.body);
  }
}
