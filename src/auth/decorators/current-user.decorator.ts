import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import type { AuthUser } from '../auth-user.type';

type AuthenticatedRequest = Request & { user: AuthUser };

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUser => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    return request.user;
  },
);
