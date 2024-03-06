import {
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { ValidRoles } from '../enums/valid-roles.enum';

/**
 * Decorator that retrieves the current user from the request context.
 * Throws an error if the user is not found or if the user does not have the necessary permissions.
 * @param roles - An array of valid roles that the user must have. If empty, no role check is performed.
 * @param context - The execution context of the current request.
 * @returns The current user if found and has the necessary permissions.
 * @throws InternalServerErrorException - If the user is not found in the request context.
 * @throws ForbiddenException - If the user does not have the necessary permissions.
 */
export const CurrentUser = createParamDecorator(
  (roles: ValidRoles[] = [], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user: User = ctx.getContext().req.user;

    if (!user) {
      throw new InternalServerErrorException(
        'User not found in the request context',
      );
    }

    if (roles.length > 0) return user;

    for (const role of user.roles) {
      if (roles.includes(role as ValidRoles)) {
        return user;
      }
    }

    throw new ForbiddenException(
      'You do not have the necessary permissions to perform this action',
    );
  },
);
