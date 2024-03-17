import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as Strategy from 'passport-json';
import { UserType } from '../../../modules/user/types/user.type';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  public async validate(username: string, password: string): Promise<UserType> {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new ForbiddenException();
    }

    return user;
  }
}
