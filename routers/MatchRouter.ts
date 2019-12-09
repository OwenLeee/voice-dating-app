import * as express from 'express';
import { Request, Response } from 'express';
import { MatchService } from "../services/MatchService";

export class MatchRouter {

    constructor(private matchService: MatchService) { }

    router() {
        const router = express.Router();
        router.post('/like', this.like);
        router.get('/getPeople', this.getPeople)
        return router;
    }

    private like = async (req: Request, res: Response) => {
        try {
            if (req.user) {
                await this.matchService.like(req.user["id"], req.body.userID);
                res.json({ result: true });
            } else {
                res.status(400);
            }
        } catch (e) {
            res.json({ result: false }).status(500);
            console.error('error is found in like function...');
            console.error(e.message);
        }
    }

    private getPeople = async (req: Request, res: Response) => {
        try {
            if (req.user){
                const randomPeople = await this.matchService.extract(req.user["id"]); 
                res.json({ result: true, randomPeople });
            } else {
                res.status(400);
            }
        } catch (e) {
            res.json({ result: false }).status(500);
            console.error('error is found in getPeople function...');
            console.error(e.message);
        }
    }
}
