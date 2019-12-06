import * as Knex from "knex";
import { LIKE, USER } from '../table';

export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable(LIKE, table => {
        table.increments();
        table.integer('from_user_id').unsigned().notNullable();
        table.foreign('from_user_id').references(`${USER}.id`);
        table.integer('to_user_id').unsigned().notNullable();
        table.foreign('to_user_id').references(`${USER}.id`);
        table.timestamps(false, true);
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable(LIKE);
}

