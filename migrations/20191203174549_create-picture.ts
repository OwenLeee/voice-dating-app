import * as Knex from "knex";
import { PICTURE, USER } from '../table';

export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable(PICTURE, table => {
        table.increments();
        table.string('picture_path');
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references(`${USER}.id`);
        table.timestamps(false, true);
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable(PICTURE);
}

