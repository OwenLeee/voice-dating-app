import { Request, Response, NextFunction } from "express";
import { userService } from "./main";

// ============================================================
// Step 5
// ============================================================
export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    next();
  } else {
    res.redirect("/login.html");
  }
}

// Guard for API
export function isLoggedInForAPI(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ "msg": "unauthorized" })
  }
}


// ============================================================
// Step 6
// ============================================================
export  function loginFlow(req: Request, res: Response, next: NextFunction) {
  console.log(req.body) //Ok, received
  return (err: Error, user: any, info: { message: string }) => {
    console.log(err, info);
    if (err) {
      res.redirect("/login.html?error=" + err.message);
    } else if (info && info.message) {
      res.redirect("/login.html?error=" + info.message);
    } else {
      req.logIn(user, async err => {
        if (err) {
          res.redirect("/login.html?error=" + "Failed to Login");
        } else if (req.user && await userService.checkRegistration(req.user['id'])){
          res.redirect("/registration.html");
        }
         else {
          res.redirect("/matching.html");
        }
      });
    }
  };
}
