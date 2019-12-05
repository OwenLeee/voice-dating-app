import * as Knex from "knex";

export class ChatRoomService {
    constructor(private knex: Knex) { }

    async addMessage() {
        await this.knex.raw(/* sql */ `INSERT INTO "message" (message_text, chat_id, from_user_id) VALUES (?, ?, ?)`,
            [""]
        )
    }


}