import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupInput } from './dtos/inputs/signup.input';
import { AuthResponse } from './dtos/outputs/auth-response.output';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'signin' })
  async signin(
    @Args('signupInput') signupInput: SignupInput,
  ): Promise<AuthResponse> {
    return this.authService.signin(signupInput);
  }

  // @Mutation(null, { name: 'login' })
  // async login(/** */) {
  //   return this.authService.login(/** */);
  // }

  // @Query(null, { name: 'revalidate' })
  // async revalidate(/** */) {
  //   return this.authService.revalidate(/** */);
  // }
}
