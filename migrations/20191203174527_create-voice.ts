import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable('voice', table => {
        table.increments();
        table.string('voice_path');
        table.integer('user_id').unsigned().notNullable;
        table.foreign('user_id').references('user.id');
        table.timestamps(false, true);
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('voice');
}

