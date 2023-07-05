import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
 
  constructor() {
    
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
