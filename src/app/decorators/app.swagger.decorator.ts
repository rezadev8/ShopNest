import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { InternalServerErrorSwagger } from 'src/common/decorators/global.swagger.decorator';

export const AppInfoSwagger = () => {
  return applyDecorators(
    ApiResponse({
      example: {
        id: 1,
        name: 'App name',
        keyword: 'your app keywords',
        url: 'App url',
        email: 'App email',
        logo: 'App logo',
        description: 'App description',
        themeColor: 'App themeColor',
        createdAt: '2024-10-05T14:30:42.000Z',
        updatedAt: '2024-10-05T14:30:45.000Z',
      },
      description:
        'Your application information',
      status: 200,
    }),
    InternalServerErrorSwagger({
      description: 'Server error in receiving app information',
      message: 'Unfortunately, there was an issue getting App info',
    }),
  );
};
