import * as Knex from 'knex';
import { RATING } from '../table';

export class RatingService {
    constructor(private knex: Knex) { }

    async rating(from_user_id: number, to_user_id: number, score: number) {
        await this.knex.raw(/* SQL */ `INSERT INTO '${RATING}' (from_user_id, to_user_id, score) 
        VALUES (?, ?, ?)`, [from_user_id, to_user_id, score]);
    }

    async countRating (user_id: number) {
        const result = await this.knex.raw(/* SQL */ `SELECT AVG(${RATING}.score) FROM "${RATING}" WHERE to_user_id = ?`, [user_id]); 
        return result.rows;
    }
}

