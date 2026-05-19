import type { AuthUser } from '../auth/auth-user.type';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    generateTelegramLink(user: AuthUser): Promise<{
        token: string;
        expiresIn: number;
    }>;
    getTelegramStatus(user: AuthUser): Promise<{
        linked: boolean;
    }>;
    unlinkTelegram(user: AuthUser): Promise<void>;
}
