import { IsString, IsUUID, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'id Задачи',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  task_id: string;

  @ApiProperty({
    description: 'id Автора комментария',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  author_id: string;

  @ApiProperty({
    description: 'Текст комментария',
    example: 'This is a sample comment text.',
  })
  @IsString()
  @Length(1, 1000)
  text: string;
}
