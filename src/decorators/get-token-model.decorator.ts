import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserType } from '../modules/user/types/user.type';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserType => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
