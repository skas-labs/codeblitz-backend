import { CanActivate, ExecutionContext, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../database/users/users.service';

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject() private readonly users!: UsersService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp()?.getRequest()
    const authHeader: string =request?.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException();
    }
    const [ , token ] = authHeader.split('Bearer ');

    Logger.debug(token, 'AUTH_TOKEN');

    const user = await this.users.findByAuthToken(token)
    if (!user) throw new UnauthorizedException();

    request.user = user

    return true;
  }
}
