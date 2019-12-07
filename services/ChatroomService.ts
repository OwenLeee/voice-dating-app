import * as Knex from "knex";

export class ChatRoomService {
    constructor(private knex: Knex) { }

    async addMessage(message: string, chat_id: number, from_user_id: number, to_user_id: number) {

        await this.knex.raw(
            /* sql */ `INSERT INTO "message" (message_text, chat_id, from_user_id, to_user_id) 
            VALUES (?, ?, ?, ?)`, [message, chat_id, from_user_id, to_user_id]
        )
    }

    async checkMatched(from_user_id: number, to_user_id: number) {

        const chatRoomExist =
            (await this.knex.raw(
            /* sql */ `SELECT count(*) FROM "chat_room" 
            WHERE user_id_1 = ${from_user_id} AND user_id_2 = ${to_user_id}`
            )).rows[0].count

        const chatRoomExist2 =
            (await this.knex.raw(/* sql */ `SELECT count(*) FROM "chat_room" 
            WHERE user_id_1 = ${to_user_id} AND user_id_2 = ${from_user_id}`
            )).rows[0].count

        // console.log(chatRoomExist, chatRoomExist2);
        if (!chatRoomExist && !chatRoomExist2) {
            return false;
        }
        return true;
    }

    async findChatRoomID(from_user_id: number, to_user_id: number) {
        const findChatID =
            (await this.knex.raw(
            /* sql */ `SELECT id FROM "chat_room" 
            WHERE user_id_1 = ${from_user_id} AND user_id_2 = ${to_user_id}`
            )).rows;

        if (findChatID.length > 0) {
            return findChatID[0].id
        }

        const findChatIDReverse =
            (await this.knex.raw(
            /* sql */ `SELECT id FROM "chat_room" 
            WHERE user_id_1 = ${to_user_id} AND user_id_2 = ${from_user_id}`
            )).rows;

        if (findChatIDReverse.length > 0) {
            return findChatIDReverse[0].id
        }

        return false;
    }
}



// const knexConfig = require("../knexfile");
// export const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);
// (async () => {
//     const chatRoomService = new ChatRoomService(knex);
//     console.log(typeof (await chatRoomService.findChatRoomID(41, 42)));
// })()
