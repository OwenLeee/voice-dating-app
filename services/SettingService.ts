import * as Knex from "knex";

export class SettingService {
    constructor(private knex: Knex) { }

    async updateName(user_id: number, changedName: string) {
        await this.knex.raw(/* sql */ `
        UPDATE user_info
        SET name = ${changedName}
        WHERE user_id = ${user_id}
        `);
    }

    async updateBirthday(user_id: number, date_of_birth: Date) {
        await this.knex.raw(/* sql */ `
        UPDATE user_info
        SET date_of_birth = ${date_of_birth}
        WHERE user_id = ${user_id}
        `);
    }

    async updateDescription(user_id: number, description: string) {
        await this.knex.raw(/* sql */ `
        UPDATE user_info
        SET description = ${description}
        WHERE user_id = ${user_id}
        `);
    }

    ////////// get rating in RatingService //////////


    async addPictures(user_id: number, picture_path?: string) {
        if (picture_path) {
            await this.knex.raw(/* sql */ `
            INSERT INTO picture (picture_path, user_id) 
            VALUES (?, ?)`, [picture_path, user_id]
            );
        }
    }

    async deletePictures(user_id: number, picture_path?: string) {
        if (picture_path) {
            await this.knex.raw(/* sql */ `
            UPDATE picture
            SET picture_path = null
            WHERE user_id = ${user_id}
            AND picture_path = ${picture_path}
        `);
        }
    }
}



/////////////////* TESTING BELOW */////////////////

// const knexConfig = require("../knexfile");
// const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

// (async () => {
//     const settingService = new SettingService(knex);
//     console.log(typeof (await settingService.updateName(41, 'owenJai')));
// })()