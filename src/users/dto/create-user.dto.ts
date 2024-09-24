import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    title: 'email',
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    title: 'password',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
