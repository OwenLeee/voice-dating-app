import { io } from './main';
import { knex } from './main'
import { SocketManager } from './SocketManager';
import { ChatRoomService } from './services/ChatroomService';


const socketManager = new SocketManager();
const chatroomService = new ChatRoomService(knex);
io.on('connection', function (socket) {
    socket.request.session.socketId = socket.id;
    socket.request.session.save();
    socket.on("disconnect", () => {
        socket.request.session.socketId = null;
        socket.request.session.save();
    })
    socket.on("socketObject", (data) => {
        socketManager.addClient({ socket, userID: data });
    })
    socket.on("receiveMessage", (data) => {
        const client = socketManager.findClientWithUserID(data.userID);
        if (client) {
            client.socket.emit("message", data)
            chatroomService.addMessage(data);
        } else {
            console.log('i am here!!!!!!')
        }
    })
});