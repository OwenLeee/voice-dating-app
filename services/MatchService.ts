import * as Knex from 'knex';


export class MatchService {
    constructor(private knex: Knex) { }

    async like(from_user_id: number, to_user_id: number) {
        const duplicate = (await this.knex.raw(/* sql */ `
            SELECT count(*) FROM "like" 
            WHERE from_user_id = ${from_user_id} 
            AND to_user_id = ${to_user_id}
        `)).rows[0].count;

        //

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
            return false;
        } else if (parseInt(alreadyLiked) > 0 && parseInt(chatRoomAlreadyExist) === 0 && parseInt(chatRoomAlreadyExist2) === 0) {
            await this.knex.raw(/* sql */ `INSERT INTO "like" (from_user_id, to_user_id) 
                VALUES (?, ?)`, [from_user_id, to_user_id]);
            await this.knex.raw(/* sql */ `INSERT INTO "chat_room" (user_id_1, user_id_2) 
                VALUES (?, ?)`, [from_user_id, to_user_id]);
            return true;
        } else if ((parseInt(chatRoomAlreadyExist) > 0 || parseInt(chatRoomAlreadyExist2) > 0)) { // When to use??
            throw new Error("Chat Room Already Exist");
        }
        return false;
    }

    async drawRandomPeople(user_id: number) {
        const userItself = await this.knex.raw(/*SQL*/ `SELECT gender from "user_info" where user_id = ${user_id}`)
        const userGender = userItself.rows[0].gender;
        // const userLikedPerson = await this.knex.raw(/*SQL*/ `SELECT to_user_id FROM "like" WHERE from_user_id = ${user_id}`); 
        // console.log(userLikedPerson); 
        // console.log(userLikedPerson.rows); 
        // console.log(userLikedPerson.rows[0].to_user_id); 
        const likedPeople = (await this.knex.raw(/* SQL */ ` 
            SELECT to_user_id FROM "like" 
            WHERE from_user_id = ${user_id};
        `))

        const avgScore = await this.knex.raw(/*SQL*/ `
        select to_user_id, avg(score) as average_score
        from "rating" 
        group by to_user_id
        `)

        const people = await this.knex.raw(/* SQL */ `
            
            SELECT  "user_info".user_id, "name", date_of_birth, icon, description, voice_path
            from "user_info" 
            INNER JOIN "voice"
            ON "user_info".user_id = "voice".user_id
            WHERE "user_info".user_id != ${user_id} 
            AND gender != '${userGender}' 
            ORDER BY random()
            Limit 20`);

        // console.log(likedPeople.rows);

        let newLikedPeople = likedPeople.rows.map((e: { to_user_id: number }) => e.to_user_id)

        //    console.log(newLikedPeople);
        let newPeople = people.rows.filter((e: { user_id: number }) => !newLikedPeople.includes(e.user_id))

        // const scoreMap = avgScore.rows.reduce((mapping, cur) => {
        //     mapping[cur.to_user_id] = cur.average_score;
        //     return mapping;
        // }, {});

        for (let i = 0; i < newPeople.length; i++) {
            for (let j = 0; j < avgScore.rows.length; j++) {
                if (newPeople[i].user_id == avgScore.rows[j].to_user_id) {
                    newPeople[i].average_score = avgScore.rows[j].average_score
                }
            }
            // newPeople[i].average_score = scoreMap[newPeople[i].user_id];
            // if (newPeople[i].user_id in scoreMap) {
            //     newPeople[i].average_score = scoreMap[newPeople[i].user_id];
            // } else {
            //     newPeople[i].average_score = -1;
            // }
            if (!newPeople[i].average_score) {
                newPeople[i].average_score = -1;
            }
        }
        return newPeople;
    }
}


// /*  use for testing only */
// const knexConfig = require("../knexfile");
// const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

// (async () => {
//     const matchService = new MatchService(knex);
//     console.log(await matchService.drawRandomPeople(15));
// })()
/*  use for testing only */


