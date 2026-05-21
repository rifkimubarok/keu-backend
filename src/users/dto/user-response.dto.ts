import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'uuid-string' })
  id: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: '123456789', nullable: true })
  telegramId: string | null;

  @ApiProperty({ example: false })
  nlModeEnabled: boolean;

  @ApiProperty({ example: '2026-05-21T12:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-05-21T12:00:00.000Z' })
  updatedAt: Date;
}

export class UserResponseDto {
  @ApiProperty({ type: UserDto })
  data: UserDto;
}

export class TelegramLinkDto {
  @ApiProperty({ example: 'abc123xyz' })
  token: string;

  @ApiProperty({ example: 900 })
  expiresIn: number;
}

export class TelegramStatusDto {
  @ApiProperty({ example: true })
  linked: boolean;

  @ApiProperty({ example: '123456789', nullable: true })
  telegramId: string | null;
}

export class TelegramStatusResponseDto {
  @ApiProperty({ type: TelegramStatusDto })
  data: TelegramStatusDto;
}
