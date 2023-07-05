import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthAccessGuard
  extends AuthGuard('jwt-access')
  implements IAuthGuard
{
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers['authorization'];

    if (accessToken) {
      return true;
    } else {
      throw new UnauthorizedException('Access token not found');
    }
  }
}
