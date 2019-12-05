import * as Knex from "knex";

interface Message {
    userID: number;
    message: string;
}

export class ChatRoomService {
    constructor(private knex: Knex) { }

    async addMessage(messageObject: Message) {
        await this.knex.raw(/* sql */ `INSERT INTO "message" (message_text, chat_id, from_user_id) VALUES (?, ?, ?)`,
            [messageObject.message, ]
        )
    }


}