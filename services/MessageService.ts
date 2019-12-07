// import * as Knex from "knex";

// export class MessageService {

//     constructor(private knex: Knex) { }

//     async recordMessage(message_text: string, chat_id: number, from_user_id: number, to_user_id: number) {
//         await this.knex.raw(
//             /* sql */ `INSERT INTO message (message_text, chat_id, from_user_id, to_user_id)
//             VALUES (?, ?, ?, ?)`, [message_text, chat_id, from_user_id, to_user_id])
//     }
// }