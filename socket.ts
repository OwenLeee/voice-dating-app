import { io } from './main';
import { knex } from './main'
import { ChatRoomService } from './services/ChatroomService';


const chatroomService = new ChatRoomService(knex);


io.on('connection', function (socket) {
    // console.log(socket.id);
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
    })

    socket.on('serverReceive', function (messageObject) {
        if (chatroomService.checkMatched(messageObject.userID, userID)) {
            io.to('' + messageObject.userID).emit('clientReceive', messageObject.message)
        };
        // chatroomService.addMessage(userID, messageObject.message)
    });



    // socket.on("receiveMessage", (data) => {
    //     if (client) {
    //         client.socket.emit("message", data)
    //         chatroomService.addMessage(data);
    //     } else {
    //         console.log('i am here!!!!!!')
    //     }
    // })
});