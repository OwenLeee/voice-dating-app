import * as Knex from "knex";

export class SettingService {
    constructor(private knex: Knex) { }

    async updateName(user_id: number, changedName: string) {
        await this.knex.raw(/* sql */ `
        UPDATE user_info
        SET name = ?
        WHERE user_id = ?
        `, [changedName, user_id]
        );
    }

    async updateBirthday(user_id: number, date_of_birth: Date) {
        await this.knex.raw(/* sql */ `
        UPDATE user_info
        SET date_of_birth = ?
        WHERE user_id = ?
        `, [date_of_birth, user_id]
        );
    }

    async updateDescription(user_id: number, description: string) {
        await this.knex.raw(/* sql */ `
        UPDATE user_info
        SET description = ?
        WHERE user_id = ?
        `, [description, user_id]
        );
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
            DELETE FROM picture
<<<<<<< HEAD
            WHERE user_id = ? 
            AND picture_path = ?;`, 
            [user_id, picture_path]
            );
=======
            WHERE user_id = ${user_id} 
            AND picture_path = ${picture_path};
        `);
        await this.knex.raw(/* sql */ `
        DELETE from picture
        WHERE picture_path = ${picture_path}
    `);
>>>>>>> 6c2ea01bf0704b20400795a44fe4d618a0ec0a80
        }


    }

    async changeVoice(user_id: number, voice_path?: string) {
        if (voice_path) {
            await this.knex.raw(/* sql */ `
            UPDATE voice SET voice_path = ?
            WHERE user_id = ?;`, 
            [voice_path, user_id]
            );
        }
    }

    async deleteVoice(user_id: number, voice_path?: string) {
        if (voice_path) {
            await this.knex.raw(/* sql */ `
            UPDATE voice
            SET voice_path = null
            WHERE user_id = ?
            AND voice_path = ?`, 
            [user_id, voice_path]);
        }
    }
}



/////////////////* TESTING BELOW */////////////////

// const knexConfig = require("../knexfile");
// const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

// (async () => {
//     const settingService = new SettingService(knex);
//     await settingService.addPictures(41, 'owenJai222.png');
// })()