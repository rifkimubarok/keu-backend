import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'rifki@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'secret123' })
  @IsNotEmpty()
  password!: string;
}
