import { knex, Knex } from 'knex';
import knexConfig from './knexfile';

export default class Connection {
  private static db: Knex;

  static connectToDb(): Knex {
    if (!this.db) {
      this.db = knex(knexConfig);
      console.log('Db initialized!');
    }
    return this.db;
  }
}
