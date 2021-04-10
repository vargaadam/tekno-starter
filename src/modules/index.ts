import { Application } from 'express';
import { Knex } from 'knex';

export abstract class BaseModule {
  abstract path: string;
  abstract controller: any;
  abstract service: any;
  abstract model: any;
  db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  abstract initializeRoutes(app: Application): void;
}

export abstract class BaseModel<T> {
  abstract tableName: string;
  db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  protected get queryBuilder(): Knex.QueryBuilder<T> {
    return this.db(this.tableName);
  }
}
