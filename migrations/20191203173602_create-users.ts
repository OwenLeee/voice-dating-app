import * as Knex from "knex";
import { USER } from '../table';

export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable(USER, table => {
        table.increments();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.timestamps(false, true);
    })
}

export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable(USER);
}

