import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from '../enums/role.enum';
import { JwtRolesGuard } from '../guards/role.guard';
import { ApiForbiddenResponse } from '@nestjs/swagger';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: [Role, ...Role[]]) => {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(JwtRolesGuard),
    ApiForbiddenResponse({
      example: {
        message: 'Forbidden resource',
        error: 'Forbidden',
        statusCode: 403,
      },
      description:'Only admin can access'
    }),
  );
};
