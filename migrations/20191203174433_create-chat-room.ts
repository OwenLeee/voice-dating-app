import * as Knex from "knex";
import { CHAT_ROOM, USER } from '../table';

export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable(CHAT_ROOM, table => {
        table.increments();
        table.integer('user_id_1').unsigned().notNullable();
        table.foreign('user_id_1').references(`${USER}.id`);
        table.integer('user_id_2').unsigned().notNullable();
        table.foreign('user_id_2').references(`${USER}.id`);
        table.timestamps(false, true);
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable(CHAT_ROOM);
}

