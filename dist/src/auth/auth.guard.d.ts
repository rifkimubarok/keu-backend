import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private reflector;
    private configService;
    constructor(jwtService: JwtService, reflector: Reflector, configService: ConfigService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
