import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Headers,
  HttpException,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
import { ApiResponse } from '@nestjs/swagger';
import { CommentResponseDto } from './dto/comment-response.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Комментарий успешно создан.',
    type: CommentResponseDto,
  })
  create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentsService.create(createCommentDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Комментарий найден.',
    type: CommentResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Комментарий не найден.',
  })
  async findOne(@Param('id') id: string): Promise<Comment | null> {
    const res = await this.commentsService.findOne(id);
    if (!res) {
      throw new HttpException('Comment not found', 404);
    }
    return res;
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Комментарии к задаче получены.',
    type: [CommentResponseDto],
  })
  findAllToTask(@Query('task_id') task_id: string): Promise<Comment[]> {
    return this.commentsService.findAllToTask(task_id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Комментарий успешно обновлен.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Headers('x-author-id') author_id: string,
  ): Promise<UpdateResult> {
    try {
      return await this.commentsService.update(id, updateCommentDto, author_id);
    } catch (error) {
      if (error instanceof Error && error.message === 'Unauthorized') {
        throw new HttpException('Unauthorized', 401);
      }
      throw error;
    }
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Комментарий успешно удален.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async remove(
    @Param('id') id: string,
    @Headers('x-author-id') author_id: string,
  ): Promise<DeleteResult> {
    try {
      return await this.commentsService.remove(id, author_id);
    } catch (error) {
      if (error instanceof Error && error.message === 'Unauthorized') {
        throw new HttpException('Unauthorized', 401);
      }
      throw error;
    }
  }
}
