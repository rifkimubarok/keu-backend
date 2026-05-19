import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '../../generated/prisma';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<User | null>;
    create(data: Prisma.UserCreateInput): Promise<User>;
    generateTelegramLinkToken(userId: string): Promise<string>;
    getTelegramStatus(userId: string): Promise<{
        linked: boolean;
    }>;
    unlinkTelegram(userId: string): Promise<void>;
}
