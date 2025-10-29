import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<any>();
    
    try {
      // Verify JWT token using Fastify JWT
      const decoded = await request.jwtVerify();
      
      
      // Attach user to request
      request.user = decoded;
      
        return true;
    } catch (error) {
      console.log('JWT verification failed:', error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
} 