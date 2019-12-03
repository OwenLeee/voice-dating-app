import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable('user_package', table => {
        table.increments();
        table.integer('user_id').unsigned().notNullable;
        table.foreign('user_id').references('user.id');
        table.integer('package_id').unsigned().notNullable;
        table.foreign('package_id').references('package.id');
        table.timestamps(false, true);
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('user_package');
}

