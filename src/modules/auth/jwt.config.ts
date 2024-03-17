import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtConfig implements JwtOptionsFactory {
  private readonly jwtSecret: string;
  private readonly jwtTtl: number;

  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    const result = {
      global: true,
    };
    return result;
  }
}
