import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  create(createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentsRepository.save(createCommentDto);
  }

  findOne(id: string): Promise<Comment | null> {
    return this.commentsRepository.findOneBy({ id });
  }

  findAllToTask(task_id: string): Promise<Comment[]> {
    return this.commentsRepository.find({
      where: { task_id },
      order: { created_at: 'DESC' },
    });
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
    author_id: string,
  ): Promise<UpdateResult> {
    const comment = await this.commentsRepository.findOneBy({ id });
    if (comment && comment.author_id === author_id) {
      return this.commentsRepository.update(id, updateCommentDto);
    }
    throw new Error('Unauthorized');
  }

  async remove(id: string, author_id: string): Promise<DeleteResult> {
    const comment = await this.commentsRepository.findOneBy({ id });
    if (comment && comment.author_id === author_id) {
      return this.commentsRepository.delete(id);
    }
    throw new Error('Unauthorized');
  }
}
