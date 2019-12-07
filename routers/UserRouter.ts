import * as express from "express";
import { Request, Response } from "express";
import * as passport from "passport";
import { loginFlow } from "../guards";
import { UserService } from "../services/UserService";
import { hashPassword } from "../hash";


export class UserRouter {

    constructor(private userService: UserService) { }

    router() {
        const router = express.Router();

        // ============================================================
        // Step 4
        // ============================================================

        router.post("/login", (...rest) =>
            passport.authenticate("local", loginFlow(...rest))(...rest)
        );

        // router.post("/login", async(req, res) => {
        // console.log('test login');
        // console.log(req.session);
        // await passport.authenticate("local", { successRedirect: '/index.html',
        //                                  failureRedirect: '/login',
        //                                  failureFlash: true })
        // res.json({result:true})
        // });

        router.post("/signup", async (req, res) => {
            // Try-catch 
            const hashedPassword = await hashPassword(req.body.password)
            res.json({ result: await this.userService.createNewUser(req.body.email, hashedPassword) });
        });


        // // ============================================================
        // // Google: Step 3
        // // ============================================================
        // router.get(
        //   "/auth/google/",
        //   passport.authenticate("google", {
        //     scope: ["email", "profile"]
        //   })
        // );

        // // ============================================================
        // // Google: Step 4
        // // ============================================================
        // router.get("/auth/google/callback", (...rest) =>
        //   passport.authenticate("google", loginFlow(...rest))(...rest)
        // );

        router.post("/logout", this.logout);

        // router.post("/socketID", this.socketID);

        return router;
    }

    private logout = (req: Request, res: Response) => {
        req.logOut();
        res.redirect("/");
    };

    // socketID = (req: Request, res: Response) => {
    //     if (req.user) {
    //         this.socketManager.addClient({ socketID: req.body.socketID, userID: req.user['id'] });
    //     }
    //     else res.json({ result: false });
    // }
}