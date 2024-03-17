import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';
import { UserEntity } from '../modules/user/user.entity';

@Injectable()
export class DatabaseConfig implements SequelizeOptionsFactory {
  private readonly connectionUrl: URL;

  constructor(private readonly configService: ConfigService) {
    const connectionString = this.configService.get<string>(
      'MYSQL_CONNECTION_STRING',
    );

    if (!connectionString) {
      throw new Error('Miscofiguration MYSQL_CONNECTION_STRING must be set');
    }

    this.connectionUrl = new URL(connectionString);
  }

  // eslint-disable-next-line prettier/prettier
  public createSequelizeOptions(): SequelizeModuleOptions | Promise<SequelizeModuleOptions> {
    if (this.connectionUrl.protocol !== 'mysql:') {
      throw new Error(
        `Unexpected DB protocol in connection string ${this.connectionUrl.protocol}`,
      );
    }

    return {
      dialect: 'mysql',
      host: this.connectionUrl.hostname,
      port: parseInt(this.connectionUrl.port) || 3306,
      username: this.connectionUrl.username,
      password: this.connectionUrl.password,
      database: this.connectionUrl.pathname.split('/')[1],
      autoLoadModels: true,
      synchronize: true,
    };
  }
}
