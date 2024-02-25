import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from '@nestjs/config';
import { User } from "src/users/entities/user.entity";

export class JwtStrategy extends PassportStrategy(Strategy) {
  
  
    constructor(
       private readonly configService: ConfigService,
        private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }



  async validate(payload: any) :Promise<User>{
    return { id: payload.sub, email: payload.email };
  }
}