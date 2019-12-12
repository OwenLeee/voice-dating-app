import * as express from "express";
import { Request, Response } from 'express';
import { RatingService } from '../services/RatingService';

export class RatingRouter {

    constructor(private ratingService: RatingService) { }

    router() {
        const router = express.Router();
        router.post('/give', this.rating);
        router.get('/rateScore/:to_user_id', this.rateScore);
        router.get('/result/:id', this.getAverageRating);
        return router;
    }

    private rating = async (req: Request, res: Response) => {
        try {
            if (req.user) {
                res.json({ result: true, likeStatus: await this.ratingService.rating(req.user["id"], req.body.to_user_id, req.body.score) });
            } else {
                res.status(400);
            }
        } catch (e) {
            res.json({ result: false });
            console.error('error is found in rating function...');
            console.error(e.message);
        }
    }

    private getAverageRating = async (req: Request, res: Response) => {
        try {
            res.json(await this.ratingService.countRating((req.params as any).id));
        }
        catch (e) {
            res.json({ result: false });
            console.error('error is found in getAverageRating function...');
            console.error(e.message);
        }
    }

    private rateScore = async (req: Request, res: Response) => {
        try {
            if (req.user && req.params.to_user_id) {
                res.json({result: await this.ratingService.personScore(req.user["id"], parseInt(req.params.to_user_id))})
            }else {
                res.json({ status: 400 });
            }
        }
        catch (e) {
            res.json({ result: false });
            console.error('error is found in rateScore function...');
            console.error(e.message);
        }
    }
}
