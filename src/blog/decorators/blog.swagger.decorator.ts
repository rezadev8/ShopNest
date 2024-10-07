import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { postExample, userExample } from 'src/common/data/api.swagger';
import {
  InternalServerErrorSwagger,
  NotFoundErrorSwagger,
  PaginationQuerySwagger,
} from 'src/common/decorators/global.swagger.decorator';

const NotFoundPostSwagger = () => NotFoundErrorSwagger('Post not found!');

const PostIdParamSwagger = () =>
  ApiParam({
    name: 'id',
    required: true,
    description: 'Post ID',
  });

export const GetPostsSwagger = () => {
  return applyDecorators(
    ApiResponse({
      status: 200,
      example: {
        posts: [{ ...postExample, author: { name: 'Reza' } }],
        total: 5,
      },
    }),
    PaginationQuerySwagger({
      skipDesc: 'How many posts are skipped?',
      takeDesc: 'How many posts are taken?',
    }),
    InternalServerErrorSwagger({
      message: 'Unfortunately, there was an issue on getting posts!',
      description: 'Server error in receiving posts',
    }),
  );
};

export const CreatePostSwagger = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiResponse({
      status: 201,
      example: { ...postExample, author: userExample },
    }),
    InternalServerErrorSwagger({
      message: 'Unfortunately, there was an issue on creating your post!',
      description: 'Server error in creating post',
    }),
  );
};

export const DeletePostSwagger = () => {
  return applyDecorators(
    ApiBearerAuth(),
    NotFoundPostSwagger(),
    PostIdParamSwagger(),
    ApiResponse({
      status: 200,
      example: {
        message: 'Post deleted successfuly!',
        post: {
          id: '18',
        },
      },
      description: 'The post has been deleted successfully',
    }),
    InternalServerErrorSwagger({
      message: 'Uh-oh! We hit a snag on deleting post!',
      description: 'Server error while deleting post',
    }),
  );
};

export const EditPostSwagger = () => {
  return applyDecorators(
    ApiBearerAuth(),
    PostIdParamSwagger(),
    NotFoundPostSwagger(),
    ApiResponse({
      status: 200,
      example: {
        message: 'Post edited successfuly',
        post: {
          id: 1,
        },
      },
    }),
    InternalServerErrorSwagger({
      message: 'Uh-oh! We hit a snag on editing post!',
      description: 'Server error while editing post',
    }),
  );
};

export const SearchInBlogSwagger = () => {
  return applyDecorators(
    ApiResponse({status:200 , example:[postExample]}),
    InternalServerErrorSwagger({
      message: 'Uh-oh! We hit a snag on searching post!',
      description: 'Server error when searching the blog',
    }),
  );
};
