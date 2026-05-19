import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Rifki Mubarok' })
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'rifki@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'secret123', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}
