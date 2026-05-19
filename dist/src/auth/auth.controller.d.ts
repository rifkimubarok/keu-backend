import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<import("../common/dto/single-response.dto").SingleResponse<{
        access_token: string;
    }>>;
    login(loginDto: LoginDto): Promise<import("../common/dto/single-response.dto").SingleResponse<{
        access_token: string;
    }>>;
}
