import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LoginInput } from './dtos/inputs/login.input';
import { SignupInput } from './dtos/inputs/signup.input';
import { AuthResponse } from './dtos/outputs/auth-response.output';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signin(signupInput: SignupInput): Promise<AuthResponse> {
    // TODO: Crear usuario
    const user = await this.usersService.create(signupInput);
    // TODO: Generar token
    const token = 'token';
    return {
      token,
      user,
    };
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    // TODO: Buscar usuario
    const user = await this.usersService.findOneByEmail(loginInput.email);

    if (!bcrypt.compareSync(loginInput.password, user.password))
      throw new BadRequestException('email or password incorrect');

    // TODO: Generar token
    const token = 'token';

    return {
      token,
      user,
    };
  }
}
