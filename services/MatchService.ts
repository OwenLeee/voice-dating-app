import * as Knex from 'knex';

export class MatchService {
    constructor(private knex: Knex) { }

    async like(from_user_id: number, to_user_id: number) {
        await this.knex.raw(/* sql */ `INSERT INTO "match" (from_user_id, to_user_id) VALUES (?, ?)`, [from_user_id, to_user_id]);
    }
}