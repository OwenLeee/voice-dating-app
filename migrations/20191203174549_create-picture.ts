import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable('picture', table => {
        table.increments();
        table.string('picture_path');
        table.integer('user_id').unsigned().notNullable;
        table.foreign('user_id').references('user.id');
        table.timestamps(false, true);
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('picture');
}

