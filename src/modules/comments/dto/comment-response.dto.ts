import { ApiProperty } from '@nestjs/swagger';

export class CommentResponseDto {
  @ApiProperty({
    description: 'ID комментария',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'ID задачи',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  task_id: string;

  @ApiProperty({
    description: 'ID автора комментария',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  author_id: string;

  @ApiProperty({
    description: 'Текст комментария',
    example: 'This is a sample comment text.',
  })
  text: string;

  @ApiProperty({
    description: 'Дата и время создания комментария',
    example: '2024-01-01T12:00:00Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Дата и время последнего обновления комментария',
    example: '2024-01-02T12:00:00Z',
  })
  updated_at: Date;
}
