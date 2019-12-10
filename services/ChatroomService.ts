import * as Knex from "knex";

export class ChatroomService {
    constructor(private knex: Knex) { }

    async checkMatched(from_user_id: number, to_user_id: number) {

        const chatRoomExist = (await this.knex.raw(/* sql */ `
            SELECT count(*) FROM "chat_room" 
            WHERE user_id_1 = ${from_user_id} 
            AND user_id_2 = ${to_user_id}
        `)).rows[0].count;

        const chatRoomExist2 = (await this.knex.raw(/* sql */ `
            SELECT count(*) FROM "chat_room" 
            WHERE user_id_1 = ${to_user_id} 
            AND user_id_2 = ${from_user_id}
        `)).rows[0].count;

        // console.log(chatRoomExist, chatRoomExist2);
        if (chatRoomExist == 0 && chatRoomExist2 == 0) {
            return false;
        } else {
            return true;
        }
    }

    async findChatRoomID(from_user_id: number, to_user_id: number) {
        const findChatID = (await this.knex.raw(/* sql */ `
            SELECT id FROM "chat_room" 
            WHERE (user_id_1 = ${from_user_id} AND user_id_2 = ${to_user_id})
            OR (user_id_1 = ${to_user_id} AND user_id_2 = ${from_user_id})`
        )).rows;

        // const findChatIDReverse = (await this.knex.raw(/* sql */ `
        //     SELECT id FROM "chat_room" 
        //     WHERE user_id_1 = ${to_user_id} 
        //     AND user_id_2 = ${from_user_id}`
        // )).rows;

        // console.log('1', findChatID.length, typeof (findChatID.length));
        // console.log('2', findChatID[0].id);

        if (findChatID.length > 0) {
            return findChatID[0].id
        } else {
            return false;
        }
    }

    async getUserInfoForContactList(userId: number) {
        let userInfo: Object[] = [];


        let userInfo1 = (await this.knex.raw(/* sql */ `
                                SELECT icon, name, user_id FROM chat_room 
                                JOIN user_info 
                                ON user_info.user_id = user_id_2 
                                WHERE user_id_1 = ${userId}`)).rows
        userInfo = userInfo.concat(userInfo1);

        let userInfo2 = (await this.knex.raw(/* sql */ `
                                SELECT icon, name, user_id FROM chat_room 
                                JOIN user_info 
                                ON user_info.user_id = user_id_1 
                                WHERE user_id_2 = ${userId}`)).rows
        userInfo = userInfo.concat(userInfo2);


        return userInfo;
    }

    async addMessage(message: string, chat_id: number, from_user_id: number, to_user_id: number) {


        await this.knex.raw(/* sql */ `
            INSERT INTO message (message_text, chat_id, from_user_id, to_user_id) 
            VALUES (?, ?, ?, ?)`, [message, chat_id, from_user_id, to_user_id]
        );
    }


    async getMessageByUserID(from_user_id: number, to_user_id: number) {
        // let senderMessages = (await this.knex.raw(/* sql */ `
        //     SELECT * FROM "message" 
        //     WHERE from_user_id = ${from_user_id} 
        //     AND to_user_id = ${to_user_id}
        //     ORDER BY created_at ASC
        // `)).rows;


        // let receiverMessages = (await this.knex.raw(/* sql */ `
        // SELECT * FROM "message" 
        // WHERE from_user_id = ${to_user_id} 
        // AND to_user_id = ${from_user_id}
        // ORDER BY created_at ASC
        // `)).rows;
        // console.log('2', receiverMessages);

        // let results = senderMessages.concat(receiverMessages)

        let results = (await this.knex.raw(/* sql */ `
            SELECT * FROM message 
            WHERE(from_user_id = ${from_user_id} OR from_user_id = ${to_user_id}) 
            AND(to_user_id = ${to_user_id} OR to_user_id = ${from_user_id}) 
            ORDER BY created_at ASC
        `)).rows

        // console.log(results);
        return results;
    }


    async getSelfInfo(userId: number) {
        let results = (await this.knex.raw(/* sql */ `
            SELECT * FROM user_info 
            WHERE user_id = ${userId};
        `)).rows        
        return results;
    }

}



//////////// TESTING BELOW ////////////
// const knexConfig = require("../knexfile");
// const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);
// (async () => {
//     const chatRoomService = new ChatroomService(knex);
//     await chatRoomService.getUserInfoForContactList(48);
// })()


// const knexConfig = require("../knexfile");
// const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);
// (async () => {
//     const chatRoomService = new ChatroomService(knex);
//     await chatRoomService.getMessageByUserID(45, 46);
// })()

// const knexConfig = require("../knexfile");
// const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);
// (async () => {
//     const chatRoomService = new ChatroomService(knex);
//     await chatRoomService.findChatRoomID(45, 46);
// })()

// const knexConfig = require("../knexfile");
// const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);
// (async () => {
//     const chatRoomService = new ChatroomService(knex);
//     await chatRoomService.getMessageByUserID(45, 46);
// })()
