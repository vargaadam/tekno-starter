import { Server } from 'node:http';
import express, { Application } from 'express';

import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';

import Connection from './db/connection';
import Config, { IConfig } from './config';
import { errorMiddleware } from './middlewares';
import { BaseModule } from './modules';
import { Knex } from 'knex';

class App<T extends BaseModule> {
  app: Application;
  config: IConfig;
  db: Knex;

  constructor(Modules: (new (db: Knex) => T)[]) {
    this.app = express();
    this.config = Config.getConfig();
    this.db = Connection.connectToDb();

    this.initializeMiddlewares();
    this.initializeModules(Modules);
    this.initializeErrorHandling();
  }

  listen(port?: number): Server {
    return this.app.listen(port || this.config.APP_PORT, () => {
      console.log(`server started at http://localhost:${this.config.APP_PORT}`);
    });
  }

  getServer(): Application {
    return this.app;
  }

  private initializeMiddlewares(): void {
    if (this.config.isProd) {
      this.app.use(cors({ origin: this.config.APP_DOMAIN, credentials: true }));
    } else {
      this.app.use(cors({ origin: true, credentials: true }));
    }

    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeModules(Modules: (new (db: Knex) => T)[]) {
    Modules.forEach((Module) => {
      const module = new Module(this.db);
      module.initializeRoutes(this.app);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
