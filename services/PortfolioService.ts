import * as Knex from "knex";

export class PortfolioService {
    constructor(private knex: Knex) { }

    async getAllInfoByUserID(user_id: number) {
        await this.knex.raw(/* sql */ `
            SELECT * FROM "user_info" 
            WHERE user_id = ${user_id}
        `);
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
        await this.knex.raw(/* sql */ `
            SELECT picture_path FROM "picture" 
            WHERE user_id = ${user_id} 
        `);
    }
}






// ///////////////* TESTING BELOW */////////////////

// const knexConfig = require("../knexfile");
// const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

// (async () => {
//     const portfolioService = new PortfolioService(knex);
//     console.log(typeof (await portfolioService.getAllInfoByUserID(41)));
// })()