import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from '../enums/role.enum';
import { RolesGuard } from '../guards/role.guard';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: [Role, ...Role[]]) => {
  return applyDecorators(SetMetadata(ROLES_KEY, roles), UseGuards(RolesGuard));
};
