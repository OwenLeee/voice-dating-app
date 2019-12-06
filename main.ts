import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as expressSession from 'express-session';
import * as passport from "passport";
import * as passportLocal from "passport-local";
import { checkPassword } from "./hash";
import { isLoggedIn } from "./guards";
import * as path from 'path';
import * as http from 'http';
import * as socketIO from 'socket.io';
import { SocketManager } from './SocketManager';
import { MatchService } from './services/MatchService';
import { MatchRouter } from './routers/MatchRouter';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

import * as Knex from "Knex";
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

import { UserService } from './services/UserService';
const userService = new UserService(knex);
import { UserRouter } from './routers/UserRouter';
import { ChatRoomService } from './services/ChatroomService';
const userRouter = new UserRouter(userService);
const matchService = new MatchService(knex);
const matchRouter = new MatchRouter(matchService);

const server = new http.Server(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, 'public')));

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
        }
    })
});

app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function (user: { id: number }, done) {
    console.log('serializeUser');
    done(null, user);
});

passport.deserializeUser(function (user: { id: number }, done) {
    console.log('deserializeUser');
    done(null, user);
});


// Add Local Strategy
const LocalStrategy = passportLocal.Strategy;
passport.use(
    new LocalStrategy(async function (email: string, password: string, done) {
        const user = await userService.getUsers(email);
        // console.log(email, password);
        if (user) {
            // console.log(`${user.email}`);
        } else {
            console.log('noooo');
        }
        if (!user) {
            return done(null, false, { message: "Incorrect email/password!" });
        }
        const match = await checkPassword(password, user.password);
        if (match) {
            return done(null, { id: user.id });
        } else {
            return done(null, false, { message: "Incorrect email/password!" });
        }
    })
);

app.use("/user", userRouter.router());
app.use("/match", matchRouter.router());


app.use(isLoggedIn);

app.use(express.static(path.join(__dirname, 'private')));

const PORT = 8080;

server.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`);
});