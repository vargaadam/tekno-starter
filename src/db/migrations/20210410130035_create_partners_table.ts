import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('partners', (table: Knex.CreateTableBuilder) => {
    table.increments('id');
    table.string('name').notNullable();
    table.integer('mobile').notNullable();
    table.integer('bankAccountNumber').notNullable();
    table.string('comment');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('partners');
}
