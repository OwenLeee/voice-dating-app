import * as socketIO from 'socket.io';

interface Client {
    socket: socketIO.Socket;
    userID: number;
}

export class SocketManager {
    clients: Client[] = [];

    findClientWithUserID(userID: number) {
        return this.clients.find(client => client.userID == userID);
    }
}



