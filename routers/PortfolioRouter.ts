import * as express from 'express';
import { Request, Response } from 'express';
import { PortfolioService } from "../services/PortfolioService";

export class PortfolioRouter {
    constructor(private portfolioService: PortfolioService) { }

    router() {
        const router = express.Router();
        router.get('/allUserInfo/:id', this.getUserInfo);
        router.get('/name', this.getName);
        router.get('/birthday', this.getBirthday);
        router.get('/description', this.getDescription);
        router.get('/icon', this.getIcon);
        router.get('/pictures/:id', this.getPictures);
        router.get('/voice/:id', this.getVoice)
        return router;
    }    

    private getUserInfo = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const userId = parseInt(id);
            if (isNaN(userId)) {
                // ....
                // return
            }
            res.json(await this.portfolioService.getInfoByUserID(userId));
        }
        catch (e) {
            res.status(500).json({ result: false });
            console.error('error is found in getUserInfo function...');
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
            res.json(await this.portfolioService.getPicturesByUserID((req.params as any).id));
        }
        catch (e) {
            res.status(500).json({ result: false });
            console.error('error is found in getPictures function...');
            console.error(e.message);
        }
    }

    private getVoice = async (req: Request, res: Response) => {
        try {
            res.json(await this.portfolioService.getVoiceByUserID((req.params as any).id));
        }
        catch (e) {
            res.status(500).json({ result: false });
            console.error('error is found in getVoice function...');
            console.error(e.message);
        }
    }
}


