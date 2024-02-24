import { Injectable } from '@nestjs/common';
import { SignupInput } from './dtos/inputs/signup.input';
import { AuthResponse } from './dtos/outputs/auth-response.output';

@Injectable()
export class AuthService {
  constructor() {}

  async signin(signupInput: SignupInput): Promise<AuthResponse> {
    console.log(signupInput);
    throw new Error('Not implemented');
  }
}
