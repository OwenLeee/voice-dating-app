import * as Knex from 'knex';

export class MatchService {
    constructor(private knex: Knex) { }

    async like(from_user_id: number, to_user_id: number) {
        const duplicate = (await this.knex.raw(/* sql */ `
            SELECT count(*) FROM "like" 
            WHERE from_user_id = ${from_user_id} 
            AND to_user_id = ${to_user_id}
        `)).rows[0].count

        const alreadyLiked = (await this.knex.raw(/* sql */ `
            SELECT count(*) FROM "like" 
            WHERE from_user_id = ${to_user_id} 
            AND to_user_id = ${from_user_id}
        `)).rows[0].count

        const chatRoomAlreadyExist = (await this.knex.raw(/* sql */ `
            SELECT count(*) FROM "chat_room" 
            WHERE user_id_1 = ${from_user_id} 
            AND user_id_2 = ${to_user_id}
        `)).rows[0].count

        const chatRoomAlreadyExist2 = (await this.knex.raw(/* sql */ `
            SELECT count(*) FROM "chat_room" 
            WHERE user_id_1 = ${to_user_id} 
            AND user_id_2 = ${from_user_id}
        `)).rows[0].count



        if (parseInt(duplicate) > 0 || from_user_id == to_user_id) {
            throw new Error("Duplicate!");  // Need to return respond to MatchRouter?? 
        } else if (parseInt(alreadyLiked) === 0 && parseInt(chatRoomAlreadyExist) === 0 && parseInt(chatRoomAlreadyExist2) === 0) {
            await this.knex.raw(/* sql */ `INSERT INTO "like" (from_user_id, to_user_id) 
                VALUES (?, ?)`, [from_user_id, to_user_id]);
        } else if (parseInt(alreadyLiked) > 0 && parseInt(chatRoomAlreadyExist) === 0 && parseInt(chatRoomAlreadyExist2) === 0) {
            await this.knex.raw(/* sql */ `INSERT INTO "like" (from_user_id, to_user_id) 
                VALUES (?, ?)`, [from_user_id, to_user_id]);
            await this.knex.raw(/* sql */ `INSERT INTO "chat_room" (user_id_1, user_id_2) 
                VALUES (?, ?)`, [from_user_id, to_user_id]); 
        } else if ((parseInt(chatRoomAlreadyExist) > 0 || parseInt(chatRoomAlreadyExist2) > 0)) { // When to use??
            throw new Error("Chat Room Already Exist");
        }

        // if (parseInt(duplicate) > 0 || from_user_id == to_user_id) {
        //     throw new Error("Duplicate!");
        // } else {
        // if (parseInt(alreadyLiked) > 0) {
        //     await this.knex.raw(
        //         /* sql */ `INSERT INTO "chat_room" (user_id_1, user_id_2) 
        //         VALUES (?, ?)`, [from_user_id, to_user_id]);

        // } else if ((parseInt(chatRoomAlreadyExist) > 0 || parseInt(chatRoomAlreadyExist2) > 0)) {
        //     throw new Error("Chat Room Already Exist");
        // }
        // await this.knex.raw(/* sql */ `INSERT INTO "like" (from_user_id, to_user_id) 
        // VALUES (?, ?)`, [from_user_id, to_user_id]);

    }

    async extract(user_id: number) {
        const userItself = await this.knex.raw(/*SQL*/ `SELECT gender from "user_info" where id = ${user_id}`)
        const userGender = userItself.rows[0].gender;
        const people = await this.knex.raw(/* SQL */ `
            WITH "rating_average" AS (
                select to_user_id, 
                       avg("rating".score) as average_score
                from "rating"
                group by to_user_id
            )
            SELECT "user_info".id, "name", date_of_birth, icon, description, voice_path, "rating_average".average_score
            from "user_info" 
            INNER JOIN "voice"
            ON "user_info".id = "voice".user_id
            INNER JOIN "rating_average"
            ON "user_info".id = "rating_average".to_user_id
            WHERE "user_info".id != ${user_id} AND gender != '${userGender}'
            ORDER BY random()
            Limit 15`);

        console.log(people.rows);
        return people.rows;
    }
}

/*  use for testing only */
// const knexConfig = require("../knexfile");
// const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

// (async () => {
//     const matchService = new MatchService(knex);
//     console.log(await matchService.like(48, 45));
// })()
/*  use for testing only */