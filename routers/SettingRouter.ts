import * as express from 'express';
import { Request, Response } from 'express';
import { SettingService } from "../services/SettingService";
// import { cpUpload } from '../main';

export class PortfolioRouter {
    constructor(private settingService: SettingService) { }

    router() {
        const router = express.Router();
        router.get('/updateName', this.updateName);
        // router.post('/',  , this.);
        // router.get('/', cpUpload, this.);
        // router.get('/', this.);
        // router.get('/', this.);
        // router.get('/', this.);
        return router;
    }

    private updateName = async (req: Request, res: Response) => {
        try {
            if (req.user) {
                await this.settingService.updateName(req.user["id"], req.body.name);
                res.json({ result: true });
            }
        }
        catch (e) {
            res.json({ result: false }).status(500);
            console.error('error is found in updateName function...');
            console.error(e.message);
        }
    }
}