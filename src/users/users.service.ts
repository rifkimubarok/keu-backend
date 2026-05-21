import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '../../generated/prisma';
import { randomBytes } from 'crypto';
import { single } from '../common/dto/single-response.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        telegramId: true,
        nlModeEnabled: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return single(user);
  }

  async generateTelegramLinkToken(userId: string): Promise<string> {
    const token = randomBytes(24).toString('hex');
    const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    await this.prisma.user.update({
      where: { id: userId },
      data: { telegramLinkToken: token, telegramLinkExpiry: expiry },
    });

    return token;
  }

  async getTelegramStatus(userId: string) {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: userId } });
    return { linked: !!user.telegramId };
  }

  async unlinkTelegram(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { telegramId: null, telegramLinkToken: null, telegramLinkExpiry: null },
    });
  }
}
