import * as Knex from "Knex";
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

    constructor(private Knex: Knex) { };

    public async findLoginUser(email: string) {
        try {
            // SELECT email from "user" where email = 'sherman@sherman.com'
            const users = await this.Knex.raw(/*SQL*/ `SELECT email from "${Table.USER}" where email = ?`, [email]);
            return users.user_id;
        }
        catch (err) {
            throw err;
        }

    }

    async uploadInfo (uploadInfo: UploadInfo) {
        try {
            //INSERT INTO user_info (user_id, name, gender, date_of_birth, icon) VALUES (5, 'apple', 'female', '1995-10-01', 'apple.jpg');
            await this.Knex.raw (/*SQL*/ `INSERT INTO "${Table.USER_INFO}" (name, gender, date_of_birth, icon) VALUES (?, ?, ?, ?, ?)`, [uploadInfo.name, uploadInfo.gender, uploadInfo.date_of_birth, uploadInfo.icon]);
            await this.Knex.raw (/*SQL*/ `INSERT INTO "${Table.VOICE}" (voice_path) VALUES (?)`, [uploadInfo.voice_path]);
            await this.Knex.raw (/*SQL*/ `INSERT INTO "${Table.PICTURE}" (picture_path) VALUES (?)`, [uploadInfo.picture_path]);
            return true;
        }
        catch (err) {
            return false;
            ;
        }
    }

}


// (async() => {
//       const userService = new UserService(path.join(__dirname, "../json"));
//     console.log(await userService.findLoginUser("admin", "admin"));
// })()