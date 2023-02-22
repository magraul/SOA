import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
  private static readonly ACCESS_SECRET: string = '95EA4B6834B835F2';

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtStrategy.ACCESS_SECRET,
    });
  }
  validate(payload: any) {
    return {
      userId: payload.userId,
    };
  }
}
