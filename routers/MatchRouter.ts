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
                res.json(await this.matchService.like(req.user["id"], req.body.userID));
            }
        } catch (e) {
            res.json({ result: false });
            console.error('error is found in like function...');
            console.error(e.message);
        }
    }
}
