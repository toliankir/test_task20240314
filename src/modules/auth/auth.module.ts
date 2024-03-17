import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from './jwt.config';
import { UserModule } from '../../modules/user/user.module';
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.registerAsync({ useClass: JwtConfig }),
  ],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
