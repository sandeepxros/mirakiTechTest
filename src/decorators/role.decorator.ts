import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    UseGuards
} from '@nestjs/common';
import { UserType } from 'src/models/user.model';

@Injectable()
export class UserTypesGuard implements CanActivate {
  constructor(private userTypes: UserType[]) {}

  canActivate(context: ExecutionContext): boolean {
    let req = context.switchToHttp().getRequest();

    if (!this.userTypes.includes(req.user?.role)) {
      throw new UnauthorizedException(
        `Not Accessible by ${req.user?.role}`,
      );
    }

    return true;
  }
}

export const Role = (...userTypes: UserType[]) =>
  UseGuards(new UserTypesGuard(userTypes));
