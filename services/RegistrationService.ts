import * as Knex from "knex";
import * as Table from "../table";

interface UploadInfo {
    name: string;
    gender: string;
    date_of_birth: Date;
    voice_path: string;
    icon: string;
    picture_path: string;
}

export class RegistrationService {

    constructor(private knex: Knex) { };

    async uploadInfo (user_id:number, uploadInfo: UploadInfo) {
        console.log(user_id, uploadInfo);
        try {
            //INSERT INTO user_info (user_id, name, gender, date_of_birth, icon) VALUES (5, 'apple', 'female', '1995-10-01', 'apple.jpg');
            await this.knex.raw (/*SQL*/ `INSERT INTO "${Table.USER_INFO}" (user_id, name, gender, date_of_birth, icon) VALUES (?, ?, ?, ?, ?)`, [user_id, uploadInfo.name, uploadInfo.gender, uploadInfo.date_of_birth, uploadInfo.icon]);
            await this.knex.raw (/*SQL*/ `INSERT INTO "${Table.VOICE}" (user_id, voice_path) VALUES (?, ?)`, [user_id, uploadInfo.voice_path]);
            await this.knex.raw (/*SQL*/ `INSERT INTO "${Table.PICTURE}" (user_id, picture_path) VALUES (?, ?)`, [user_id, uploadInfo.picture_path]);
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

}

// const knexConfig = require("../knexfile");
// const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

// const registrationService = new RegistrationService(knex);
// (async() => {
//       console.log(await registrationService.uploadInfo(3, {name: "", gender: "", date_of_birth: new Date, voice_path: "", icon: "", picture_path: ""}));
// })()
