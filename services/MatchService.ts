import * as Knex from 'knex';

export class MatchService {
    constructor(private knex: Knex) { }

    async like(from_user_id: number, to_user_id: number) {
        const duplicate =
            (await this.knex.raw(
            /* sql */ `SELECT count(*) FROM "like" WHERE from_user_id = ${from_user_id} AND to_user_id = ${to_user_id}`
            )).rows[0].count
        // console.log(duplicate);
        if (parseInt(duplicate) > 0 || from_user_id == to_user_id) {
            throw new Error("Duplicate!");
        } else {
            await this.knex.raw(/* sql */ `INSERT INTO "like" (from_user_id, to_user_id) VALUES (?, ?)`, [from_user_id, to_user_id]);
        }
    }
}

// const knexConfig = require("../knexfile");
// const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);
// const matchService = new MatchService(knex);
// matchService.like(25, 27);
