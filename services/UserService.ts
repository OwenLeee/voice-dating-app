import * as Knex from "knex";
import * as Table from "../table";

interface User {
    id: number;
    email: string;
    password: string;
}

export class UserService  {

    constructor (private knex: Knex) {}; 

    async getUsers(email: string): Promise<User> {
        try {
            const users = await this.knex.raw(/*SQL*/ `SELECT * from "${Table.USER}" where email = ?`, [email]);
            return users.rows[0];       
        }
        catch (err) {
            throw err;
        }
    }

    async createNewUser(email: string, hashedPassword: string) {
        try {
            // console.log(email, hashedPassword, Table.USER);
            await this.knex.raw(/*SQL*/ `INSERT INTO "${Table.USER}" (email, password) VALUES (?, ?)`, [email, hashedPassword]);
            return true;
        }
        catch (err) {
            return false;
        }
    }
}







