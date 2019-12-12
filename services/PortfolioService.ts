import * as Knex from "knex";

export class PortfolioService {
    constructor(private knex: Knex) { }

    async getInfoByUserID(user_id: number) {
        const results = (await this.knex.raw(/* sql */ `
            SELECT * FROM "user_info" 
            WHERE user_id = ${user_id}
        `)).rows;
        return results;
    }

    ///* getAllInfoByUserID includes..........
    async getNameByUserID(user_id: number) {
        await this.knex.raw(/* sql */ `
            SELECT name FROM "user_info" 
            WHERE user_id = ${user_id} 
        `);
    }

    async getBirthdayByUserID(user_id: number) {
        await this.knex.raw(/* sql */ `
            SELECT date_of_birth FROM "user_info" 
            WHERE user_id = ${user_id} 
        `);
    }

    async getDescriptionByUserID(user_id: number) {
        await this.knex.raw(/* sql */ `
            SELECT description FROM "user_info" 
            WHERE user_id = ${user_id} 
        `);
    }

    async getIconByUserID(user_id: number) {
        await this.knex.raw(/* sql */ `
            SELECT icon FROM "user_info" 
            WHERE user_id = ${user_id} 
        `);
    }
    // ......................................*/

    ////////// get rating in RatingService //////////



    async getPicturesByUserID(user_id: number) {
        const results = (await this.knex.raw(/* sql */ `
            SELECT id, picture_path, user_id FROM "picture" 
            WHERE user_id = ${user_id} 
        `)).rows;
        return results;
    }

    async getVoiceByUserID(user_id: number) {
        const results = (await this.knex.raw(/* sql */ `
            SELECT voice_path FROM voice
            WHERE user_id = ${user_id}
        `)).rows
        return results;
    }
}






// ///////////////* TESTING BELOW */////////////////

// const knexConfig = require("../knexfile");
// const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

// (async () => {
//     const portfolioService = new PortfolioService(knex);
//     await portfolioService.getPicturesByUserID(45);
// })()