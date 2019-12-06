import * as Knex from "knex";
import { MESSAGE, CHAT_ROOM, USER } from '../table';

export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable(MESSAGE, table => {
        table.increments();
        table.string('message_text');
        table.integer('chat_id').unsigned().notNullable();
        table.foreign('chat_id').references(`${CHAT_ROOM}.id`);
        table.integer('from_user_id').unsigned().notNullable();
        table.foreign('from_user_id').references(`${USER}.id`);
        table.integer('to_user_id').unsigned().notNullable();
        table.foreign('to_user_id').references(`${USER}.id`);
        table.timestamps(false, true);
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable(MESSAGE);
}

