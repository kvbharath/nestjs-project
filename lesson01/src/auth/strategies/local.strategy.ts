import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authservice: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }
  validate(email: string, password: string) {
    console.log('Inside LocalStrategy');
    const response = this.authservice.validateUser({ email, password });
    if (!response) throw new UnauthorizedException('Invalid credentials');
    return response;
  }
}
