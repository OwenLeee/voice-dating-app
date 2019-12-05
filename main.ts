import * as express from 'express';
import { Request, Response } from 'express';
// import * as bodyParser from 'body-parser';
import * as expressSession from 'express-session';
import * as path from 'path';
import * as http from 'http';
import * as socketIO from 'socket.io';
import { SocketManager } from './SocketManager';

const app = express();
const server = new http.Server(app);
const io = socketIO(server);

const sessionMiddleware = expressSession({
    secret: 'Tecky Academy teaches typescript',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
});

app.use(sessionMiddleware);

io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res, next);
});
//...
const socketManager = new SocketManager();
io.on('connection', function (socket) {
    socket.request.session.socketId = socket.id;
    socket.request.session.save();
    socket.on("disconnect", () => {
        socket.request.session.socketId = null;
        socket.request.session.save();
    })
    socket.on("socketObject", (data) => {
        socketManager.clients.push({ socket, userID: data });
    })
    socket.on("receiveMessage", (data) => {
        const client = socketManager.findClientWithUserID(data.userID);
        if (client) {
            client.socket.emit("message", data)
        }
    })
});



app.use(express.static(path.join(__dirname, 'private')));

app.get('/', function (req: Request, res: Response) {
    res.end("Hello World");
})

const PORT = 8080;

server.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`);
});