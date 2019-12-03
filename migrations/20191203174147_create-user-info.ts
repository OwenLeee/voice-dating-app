import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable('user_info', table => {
        table.increments();
        table.string('name');
        table.string('gender');
        table.date('date_of_birth');
        table.string('icon');
        table.string('description');
        table.integer('user_id').unsigned().notNullable;
        table.foreign('user_id').references('user.id');
        table.timestamps(false, true);
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('user_info');
}

