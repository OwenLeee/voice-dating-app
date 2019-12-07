import * as Knex from "knex";

export class MessageService {

    constructor(private knex: Knex) { }

    async addMessage(message: string, chat_id: number, from_user_id: number, to_user_id: number) {

        await this.knex.raw(
            /* sql */ `INSERT INTO "message" (message_text, chat_id, from_user_id, to_user_id) 
            VALUES (?, ?, ?, ?)`, [message, chat_id, from_user_id, to_user_id]
        )
    }
}


// const knexConfig = require("../knexfile");
// export const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);
// (async () => {
//     const messageService = new MessageService(knex);
//     console.log(typeof (await messageService.addMessage('ngo diu nei ar', 41, 41, 42)));
// })()