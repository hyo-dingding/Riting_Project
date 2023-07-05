// @UseGuards(AuthGuard('Auth'))  이것이 실행될 것
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  // 검사부분 -> 실패시 user.resolver.ts -> @UseGuards(AuthGuard('Auth')) 에러 / 성공시 validate 넘어감
  constructor() {
    //  super ? 부모 constructor 에 전달하고 싶을때 사용
    super({
      jwtFromRequest: (req) => {
        console.log(req);
        const cookie = req.headers.cookie;
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: 'myRefreshKey',
    });
  }
  // 인가성공부분
  // validate ?   부모의 함수를덮어쓰기 ->오버라이딩
  validate(payload) {
    console.log(payload); // {email: a@a.com, sub: jflsflsd-120fjlesf}
    return {
      // req.user ={값이 이안에 들어감} 리턴된 값 넣어주기

      email: payload.email,
      id: payload.sub,
    };
  }
}
