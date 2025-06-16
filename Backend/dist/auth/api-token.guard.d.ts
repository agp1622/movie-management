import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class ApiTokenGuard implements CanActivate {
    private readonly API_SECRET;
    canActivate(context: ExecutionContext): boolean;
}
