import * as express from 'express';
import { Request, Response } from 'express';
import { MatchService } from "../services/MatchService";

export class MatchRouter {

    constructor(private matchService: MatchService) { }

    router() {
        const router = express.Router();
        router.post('/like', this.like);
        return router;
    }

    private like = async (req: Request, res: Response) => {
        try {
            if (req.user) {
                this.matchService.like(req.user["id"], req.body.userID)
                res.json({ result: true })
            } else {
                res.json({ result: false })
            }
        } catch (e) {
            res.json({ result: false, message: e.message });
        }

    }
}
