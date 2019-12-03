import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable('match', table => {
        table.increments();
        table.integer('from_user_id').unsigned().notNullable;
        table.foreign('from_user_id').references('user.id');
        table.integer('to_user_id').unsigned().notNullable;
        table.foreign('to_user_id').references('user.id');
        table.timestamps(false, true);
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('match');
}

