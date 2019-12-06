import * as Knex from "knex";
import { PACKAGE } from '../table';

export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable(PACKAGE, table => {
        table.increments();
        table.string('name');
        table.timestamps(false, true);
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable(PACKAGE);
}

