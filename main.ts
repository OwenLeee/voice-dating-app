import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as expressSession from 'express-session';
import * as passport from "passport";
import * as passportLocal from "passport-local";
import { checkPassword } from "./hash";
import { isLoggedIn } from "./guards";
import * as path from 'path';
// import * as socketIO from 'socket.io';

import * as Knex from "Knex";
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

import { UserService } from './services/UserService';
const userService = new UserService(knex);
import { UserRouter } from './routers/UserRouter';
const userRouter = new UserRouter(userService);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const SESS_SECRET: string = "Project2 typescript";

// important !!!
app.use(
    expressSession({
        secret: SESS_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    })
);

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
        console.log(email, password);
        if (user) {
            console.log(`${user.email}`);
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

app.use(isLoggedIn);

app.use(express.static("./private"));
const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`);
});