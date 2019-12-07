import * as express from 'express';
import { Request, Response } from 'express';
import { PortfolioService } from "../services/PortfolioService";

export class PortfolioRouter {
    constructor(private portfolioService: PortfolioService) { }

    router() {
        const router = express.Router();
        router.get('/getAllUserInfo', this.getAllUserInfo);
        router.get('/getName', this.getName);
        router.get('/getBirthday', this.getBirthday);
        router.get('/getDescription', this.getDescription);
        router.get('/getIcon', this.getIcon);
        router.get('/getPictures', this.getPictures);
        return router;
    }

    private getAllUserInfo = async (req: Request, res: Response) => {
        try {
            await this.portfolioService.getAllInfoByUserID(req.body.userID);
            res.json({ result: true });
        }
        catch (e) {
            res.json({ result: false }).status(500);
            console.error('error is found in getAllUserInfo function...');
            console.error(e.message);
        }
    }

    private getName = async (req: Request, res: Response) => {
        try {
            await this.portfolioService.getNameByUserID(req.body.userID);
            res.json({ result: true });
        }
        catch (e) {
            res.json({ result: false }).status(500);
            console.error('error is found in getName function...');
            console.error(e.message);
        }
    }

    private getBirthday = async (req: Request, res: Response) => {
        try {
            await this.portfolioService.getBirthdayByUserID(req.body.userID);
            res.json({ result: true });
        }
        catch (e) {
            res.json({ result: false }).status(500);
            console.error('error is found in getBirthday function...');
            console.error(e.message);
        }
    }

    private getDescription = async (req: Request, res: Response) => {
        try {
            await this.portfolioService.getDescriptionByUserID(req.body.userID);
            res.json({ result: true });
        }
        catch (e) {
            res.json({ result: false }).status(500);
            console.error('error is found in getDescription function...');
            console.error(e.message);
        }
    }

    private getIcon = async (req: Request, res: Response) => {
        try {
            await this.portfolioService.getIconByUserID(req.body.userID);
            res.json({ result: true });
        }
        catch (e) {
            res.json({ result: false }).status(500);
            console.error('error is found in getIcon function...');
            console.error(e.message);
        }
    }

    private getPictures = async (req: Request, res: Response) => {
        try {
            await this.portfolioService.getPicturesByUserID(req.body.userID);
            res.json({ result: true });
        }
        catch (e) {
            res.json({ result: false }).status(500);
            console.error('error is found in getPictures function...');
            console.error(e.message);
        }
    }
}