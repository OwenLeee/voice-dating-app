import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable('chat_room', table => {
        table.increments();
        table.integer('user_id_1').unsigned().notNullable();
        table.foreign('user_id_1').references('user.id');
        table.integer('user_id_2').unsigned().notNullable();
        table.foreign('user_id_2').references('user.id');
        table.timestamps(false, true);
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('chat_room');
}

