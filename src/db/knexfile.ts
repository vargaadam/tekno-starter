import { Knex } from 'knex';

import Config from '../config';

const config = Config.getConfig();

const database: Knex.Config = {
  client: 'pg',
  connection: config.PG_CONNECTION_STRING
};

export = database;
