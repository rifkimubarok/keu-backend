import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponseDto {
  @ApiProperty({ example: 'uuid-string' })
  id: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;
}

export class RegisterDataDto {
  @ApiProperty({ type: RegisterResponseDto })
  data: RegisterResponseDto;
}

export class LoginResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken: string;
}

export class LoginDataDto {
  @ApiProperty({ type: LoginResponseDto })
  data: LoginResponseDto;
}
