import * as Knex from "knex";
import { USER_PACKAGE, USER, PACKAGE } from '../table';

export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable(USER_PACKAGE, table => {
        table.increments();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references(`${USER}.id`);
        table.integer('package_id').unsigned().notNullable();
        table.foreign('package_id').references(`${PACKAGE}.id`);
        table.timestamps(false, true);
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable(USER_PACKAGE);
}

