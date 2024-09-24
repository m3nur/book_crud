import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    title: 'title',
    type: String,
    minLength: 1,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  title: string;

  @ApiProperty({
    title: 'title',
    type: String,
    minLength: 1,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  author: string;

  @ApiProperty({
    title: 'Published Date',
    type: Date,
  })
  @IsNotEmpty()
  @IsDateString()
  publishedAt: Date;
}
