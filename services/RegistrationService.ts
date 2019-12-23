import * as Knex from "knex";
// import * as Table from "../table";

// interface UploadInfo {
//     name: string;
//     gender: string;
//     date_of_birth: Date;
//     voice_path: string;
//     icon: string;
//     picture_path: string;
// }

export class RegistrationService {

    constructor(private knex: Knex) { };

    async uploadInfo(user_id: number, files: any, body: any) {
        const trx = await this.knex.transaction();
        try {
            // upload user_id + body + icon
            await this.knex.raw(/*SQL*/ `
        INSERT INTO "user_info" (user_id, name, gender, date_of_birth, icon, description)
        VALUES (?, ?, ?, ?, ?, ?)
        `, [user_id, body.name, body.gender, body.dateOfBirth, files['icon'][0].filename, body.description]);

            // upload files (voiceIntro)
            await this.knex.raw(/*SQL*/ ` 
        INSERT INTO "voice" (user_id, voice_path)
        VALUES (?, ?)
        `, [user_id, files['voiceIntro'][0].filename]);

            // upload files (picture)
            for (let image of files['image']) {
                await this.knex.raw(/*SQL*/ ` 
            INSERT INTO "picture" (user_id, picture_path)
            VALUES (?, ?)
            `, [user_id, image.filename])
            }

            await trx.commit();
        } catch (err) {
            console.log(err);
            await trx.rollback();
            throw err;
        }
        //  to be upload (genderInterest + description)
    }

}

// const knexConfig = require("../knexfile");
// const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

// const registrationService = new RegistrationService(knex);
// (async() => {
//       console.log(await registrationService.uploadInfo(3, {name: "", gender: "", date_of_birth: new Date, voice_path: "", icon: "", picture_path: ""}));
// })()
