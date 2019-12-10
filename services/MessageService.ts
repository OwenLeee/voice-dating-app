// import * as Knex from "knex";

// export class MessageService {

//     constructor(private knex: Knex) { }

//     async addMessage(message: string, chat_id: number, from_user_id: number, to_user_id: number) {

//         await this.knex.raw(/* sql */ `
//             INSERT INTO "message" (message_text, chat_id, from_user_id, to_user_id) 
//             VALUES (?, ?, ?, ?)`, [message, chat_id, from_user_id, to_user_id]
//         );
//     }

//     async getMessageByUserID(from_user_id: number, to_user_id: number) {
//         let result =  (await this.knex.raw(/* sql */ `
//             SELECT * FROM "message" 
//             WHERE from_user_id = ${from_user_id} 
//             AND to_user_id = ${to_user_id}
//             ORDER BY created_at ASC
//         `)).rows;
//         console.log(result);
//         return result;
//     }
// }

/////////////////* TESTING BELOW */////////////////

// const knexConfig = require("../knexfile");
// const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

// (async () => {
//     const messageService = new MessageService(knex);
//     await messageService.getMessageByUserID(45, 46);
// })()

// (async () => {
//     const messageService = new MessageService(knex);
//     await messageService.getMessageByUserID(41, 42);
// })()