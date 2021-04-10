import 'dotenv/config';
import { cleanEnv, str, num, CleanedEnvAccessors } from 'envalid';

export interface IConfig extends CleanedEnvAccessors {
  APP_PORT: number;
  APP_DOMAIN: string;
  NODE_ENV: string;
  PG_CONNECTION_STRING: string;
}

export default class Config {
  private static config: IConfig;

  static getConfig(): IConfig {
    if (!this.config) {
      this.config = cleanEnv(process.env, {
        APP_PORT: num({ default: 3000 }),
        APP_DOMAIN: str({ default: 'localhost' }),
        NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'], default: 'development' }),
        PG_CONNECTION_STRING: str({ default: 'postgresql://dev:dev@db:5432/dev' })
      });
    }
    return this.config;
  }
}
