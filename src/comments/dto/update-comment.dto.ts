import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({
    description: 'текст комментария',
    example: 'This is an updated comment text.',
  })
  @IsString()
  @Length(1, 1000)
  text: string;
}
