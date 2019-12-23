import * as Knex from 'knex';
import { RATING } from '../table';

export class RatingService {
    constructor(private knex: Knex) { }

    async rating(from_user_id: number, to_user_id: number, score: number) {

        const alreadyRated: number = (await this.knex.raw(/*SQL*/ `
        SELECT count(*) FROM "rating"
        WHERE from_user_id = ${from_user_id}
        AND to_user_id = ${to_user_id}
        `)).rows[0].count;

        if (alreadyRated > 0) {
            await this.knex.raw(/*SQL*/`
            UPDATE "rating"
            SET score = ${score}
            WHERE from_user_id = ${from_user_id} 
            AND to_user_id = ${to_user_id}
            `)
            return true
        }
        await this.knex.raw(/* SQL */ `INSERT INTO ${RATING} (from_user_id, to_user_id, score) 
        VALUES (?, ?, ?)`, [from_user_id, to_user_id, score]);
        return false;
    }

    async countRating(user_id: number) {
        const result = await this.knex.raw(/* SQL */ `SELECT AVG(${RATING}.score) FROM ${RATING} WHERE to_user_id = ?`, [user_id]);
        return result.rows;
    }

    async personScore(from_user_id: number, to_user_id: number) {
        const result = await this.knex.raw(/* SQL */ `
        SELECT *  
        FROM "rating"
        WHERE from_user_id = ${from_user_id} 
        AND to_user_id = ${to_user_id}
        `)
        return result
    }

}

/*  use for testing only */
// const knexConfig = require("../knexfile");
// const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

// (async () => {const ratingService = new RatingService(knex);
// await ratingService.rating(5, 4, 5)}) ();

// import {knex} from '../main'
// (async () => {
//     const matchService = new MatchService(knex);
//     console.log(await matchService.like(2,1));
// })()
/*  use for testing only */