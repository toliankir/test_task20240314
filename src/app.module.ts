import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseConfig } from './database/database.config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { InfoModule } from './modules/info/info.module';

@Module({
  imports: [
    SequelizeModule.forRootAsync({ useClass: DatabaseConfig }),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    InfoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
