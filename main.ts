import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as expressSession from 'express-session';
import * as passport from "passport";
import * as path from 'path';
import * as http from 'http';
import * as socketIO from 'socket.io';
import * as Knex from "Knex";
import { isLoggedIn } from "./guards";
import { MatchService } from './services/MatchService';
import { MatchRouter } from './routers/MatchRouter';
import { UserService } from './services/UserService';
import { UserRouter } from './routers/UserRouter';
import { RatingService } from './services/RatingService';
import { RatingRouter} from './routers/RatingRouter';
import { RegistrationService } from './services/RegistrationService';
import { RegistrationRouter } from './routers/RegistrationRouter';

const app = express();
const knexConfig = require("./knexfile");
export const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const sessionMiddleware = expressSession({
    secret: 'Tecky Academy teaches typescript',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
});
app.use(sessionMiddleware);


app.use(passport.initialize());
app.use(passport.session());

import './passport';


const server = new http.Server(app);
export const io = socketIO(server);

io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res, next);
});
//...

import './socket';

const userService = new UserService(knex);
const userRouter = new UserRouter(userService);
app.use("/user", userRouter.router());

const registrationService = new RegistrationService(knex);
const registrationRouter = new RegistrationRouter(registrationService);
app.use("/registration", registrationRouter.router());

const matchService = new MatchService(knex);
const matchRouter = new MatchRouter(matchService);
app.use("/match", matchRouter.router());


const ratingService = new RatingService(knex);
const ratingRouter = new RatingRouter (ratingService); 
app.use("/rating", ratingRouter.router());

app.use(express.static(path.join(__dirname, 'public')));
app.use(isLoggedIn, express.static(path.join(__dirname, 'private')));

// (async() => {
//     const result = await ratingService.countRating("3 or 1=1" as any as number);
//     console.log(result);
// })();

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`);
});