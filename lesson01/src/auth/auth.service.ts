import { Injectable } from '@nestjs/common';
import { AuthPayLoadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}
  async validateUser({ email, password }: AuthPayLoadDto) {
    const findUser = await this.userService.findByEmail(email);
    if (!findUser) return null;

    if (password === findUser.password) {
      const { password, ...user } = findUser;
      const token = this.jwtService.sign(user);
      return { user, token };
    }

    return null; // Return null if password does not match
  }
}
