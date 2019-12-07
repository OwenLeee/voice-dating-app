import { Request, Response, NextFunction } from "express";

// ============================================================
// Step 5
// ============================================================
export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.user) {    
    next();
  } else {
    res.redirect("/home.html");
  }
}

// Guard for API
export function isLoggedInForAPI(req: Request, res: Response, next: NextFunction) {
  if (req.user) {    
    next();
  } else {
    res.status(401).json({"msg":"unauthorized"})
  }
}


// ============================================================
// Step 6
// ============================================================
export function loginFlow(req: Request, res: Response, next: NextFunction) {
  console.log(req.body) //Ok, received
  return (err: Error, user: any, info: { message: string }) => {
    console.log(err, info); 
    if (err) {
      res.redirect("/home.html?error=" + err.message);
    } else if (info && info.message) {
      res.redirect("/home.html?error=" + info.message);
    } else {
      req.logIn(user, err => {
        if (err) {
          res.redirect("/home.html?error=" + "Failed to Login");
        } else {
          res.redirect("/chatroom.html"); 
        }
      });
    }
  };
}
