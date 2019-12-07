import * as express from 'express';
import { Request, Response } from 'express';
import { MatchService } from "../services/MatchService";

export class MatchRouter {

    constructor(private matchService: MatchService) { }

    router() {
        const router = express.Router();
        router.post('/like', this.like);
        router.get('/getpeople', this.getPeople)
        return router;
    }

    private like = async (req: Request, res: Response) => {
        try {
            if (req.user) {
                res.json(await this.matchService.like(req.user["id"], req.body.userID));
            } else {
                res.status(400);
            }
        } catch (e) {
            res.json({ result: false });
            console.error('error is found in like function...');
            console.error(e.message);
        }
    }

    private getPeople = async (req: Request, res: Response) => {
        
        
    }
}
