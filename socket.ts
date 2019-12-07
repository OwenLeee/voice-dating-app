import { io } from './main';
import { knex } from './main'
import { ChatroomService } from './services/ChatroomService';
import { MessageService } from './services/MessageService';

const chatroomService = new ChatroomService(knex);
const messageService = new MessageService(knex);

io.on('connection', function (socket) {
    if (!socket.request.session.passport) {
        socket.disconnect();
        return;
    }
    const userID = socket.request.session.passport.user["id"]
    socket.join(userID);
    socket.request.session.socketId = socket.id;
    socket.request.session.save();
    socket.on("disconnect", () => {
        socket.request.session.socketId = null;
        socket.request.session.save();
    });

    socket.on('serverReceive', async function (messageObject) {
        if (chatroomService.checkMatched(messageObject.userID, userID)) {
            io.to('' + messageObject.userID).emit('clientReceive', messageObject.message)
        };
        const chatID = await chatroomService.findChatRoomID(userID, messageObject.userID);
        messageService.addMessage(messageObject.message, chatID, userID, messageObject.userID)
    });
});