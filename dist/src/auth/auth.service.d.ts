import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<import("../common/dto/single-response.dto").SingleResponse<{
        access_token: string;
    }>>;
    login(loginDto: LoginDto): Promise<import("../common/dto/single-response.dto").SingleResponse<{
        access_token: string;
    }>>;
}
