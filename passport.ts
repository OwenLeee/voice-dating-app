import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import { checkPassword } from "./hash";
import { userService } from './main'


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