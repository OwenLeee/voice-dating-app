import * as Knex from "knex";
import { hashPassword } from "../hash";

export async function seed(knex: Knex): Promise<any> {
    await knex.raw(/* sql */ `DELETE FROM "picture"`);
    await knex.raw(/* sql */ `DELETE FROM "voice"`);
    await knex.raw(/* sql */ `DELETE FROM "message"`);
    await knex.raw(/* sql */ `DELETE FROM "chat_room"`);
    await knex.raw(/* sql */ `DELETE FROM "like"`);
    await knex.raw(/* sql */ `DELETE FROM "rating"`);
    await knex.raw(/* sql */ `DELETE FROM "user_package"`);
    await knex.raw(/* sql */ `DELETE FROM "user_info"`);
    await knex.raw(/* sql */ `DELETE FROM "package"`);
    await knex.raw(/* sql */ `DELETE FROM "user"`);


    const users: { id: number }[] = (await knex.raw(/* sql */ `
            INSERT INTO "user" (email, password) 
            VALUES(?, ?), (?, ?), (?, ?), (?, ?), (?, ?) RETURNING id`,
        [
            'owen@owen.com', await hashPassword('123456'),
            'sherman@sherman.com', await hashPassword('123456'),
            'peter@peter.com', await hashPassword('123456'),
            'mary@mary.com', await hashPassword('123456'),
            'toxicjason@jason.com', await hashPassword('123456')
        ]
    )).rows;

    const packages = (await knex.raw(/* sql */ `
            INSERT INTO "package" (name) 
            VALUES(?), (?), (?), (?), (?) RETURNING id`,
        [
            'gold',
            'diamond',
            'gold',
            'diamond',
            'gold'
        ]
    )).rows;

    await knex.raw(/* sql */ `
        INSERT INTO "user_info" (name, gender, date_of_birth, icon, description, user_id) 
        VALUES(?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?)`,
        [
            'owen', 'male', '1990-10-01', 'owen.jpg', 'i am handsome', users[0].id,
            'sherman', 'female', '2000-10-01', 'sherman.jpg', 'i am pretty', users[1].id,
            'peter', 'male', '1990-10-01', 'peter.jpg', 'i am peter', users[2].id,
            'mary', 'female', '2000-10-01', 'mary.jpg', 'i am mary', users[3].id,
            'toxicjason', 'male', '1900-10-01', 'jason.jpg', 'i am toxic', users[4].id
        ]
    );

    await knex.raw(/* sql */ `
        INSERT INTO "user_package" (user_id, package_id) 
        VALUES(?, ?), (?, ?), (?, ?), (?, ?), (?, ?)`,
        [
            users[0].id, packages[0].id,
            users[1].id, packages[1].id,
            users[2].id, packages[2].id,
            users[3].id, packages[3].id,
            users[4].id, packages[4].id
        ]
    );

    await knex.raw(/* sql */ `
        INSERT INTO "rating" (score, from_user_id, to_user_id) 
        VALUES(?, ?, ?), (?, ?, ?), (?, ?, ?), (?, ?, ?)`,
        [
            2, users[1].id, users[0].id,
            5, users[0].id, users[1].id,
            1, users[2].id, users[3].id,
            4, users[3].id, users[2].id
        ]
    );

    await knex.raw(/* sql */ `
        INSERT INTO "like" (from_user_id, to_user_id) 
        VALUES(?, ?), (?, ?), (?, ?), (?, ?)`,
        [
            users[0].id, users[1].id,
            users[1].id, users[0].id,
            users[2].id, users[3].id,
            users[3].id, users[2].id
        ]
    );

    const chatRooms = (await knex.raw(/* sql */ `
        INSERT INTO "chat_room" (user_id_1, user_id_2) 
        VALUES(?, ?), (?, ?) RETURNING id`,
        [
            users[0].id, users[1].id,
            users[2].id, users[3].id
        ]
    )).rows;

    await knex.raw(/* sql */ `
        INSERT INTO "message" (message_text, chat_id, from_user_id, to_user_id) 
        VALUES(?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)`,
        [
            'i love you', chatRooms[0].id, users[0].id, users[1].id,
            'i hate you', chatRooms[0].id, users[1].id, users[0].id,
            'i belong to you', chatRooms[1].id, users[2].id, users[3].id,
            'i am not belong to you', chatRooms[1].id, users[3].id, users[2].id
        ]
    );

    await knex.raw(/* sql */ `
        INSERT INTO "voice" (voice_path, user_id) 
        VALUES(?, ?), (?, ?), (?, ?), (?, ?), (?, ?)`,
        [
            'owen.mp3', users[0].id,
            'sherman.mp3', users[1].id,
            'peter.mp3', users[2].id,
            'mary.mp3', users[3].id,
            'toxic.mp3', users[4].id
        ]
    );

    await knex.raw(/* sql */ `
        INSERT INTO "picture" (picture_path, user_id) 
        VALUES(?, ?), (?, ?), (?, ?), (?, ?), (?, ?)`,
        [
            'owen.jpg', users[0].id,
            'sherman.jpg', users[1].id,
            'peter.jpg', users[2].id,
            'mary.jpg', users[3].id,
            'toxic.jpg', users[4].id
        ]
    );
};
