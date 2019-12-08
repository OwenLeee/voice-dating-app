import * as express from 'express';
import * as multer from 'multer'
import { Request, Response } from 'express';
import { SettingService } from "../services/SettingService";

export class PortfolioRouter {
    constructor(private settingService: SettingService) { }

    router() {
        const router = express.Router();

        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, __dirname + '/../uploads/');
            },
            filename: function (req, file, cb) {
                cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
            }
        })
        const upload = multer({ storage: storage })

        router.put('/updateName', this.updateName);
        router.put('/updateBirthday', this.updateBirthday);
        router.put('/updateDescription', this.updateDescription);
        router.post('/addPictures', upload.array('picture'), this.addPictures);
        router.delete('/deletePictures', this.deletePictures);

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
            res.status(404).json({ result: 'name not found' });
            console.error('error is found in updateName function...');
            console.error(e.message);
        }
    }

    private updateBirthday = async (req: Request, res: Response) => {
        try {
            if (req.user) {
                await this.settingService.updateBirthday(req.user["id"], req.body.date_of_birth);
                res.json({ result: true });
            }
        }
        catch (e) {
            res.status(404).json({ result: 'DOB not found' });
            console.error('error is found in updateBirthday function...');
            console.error(e.message);
        }
    }

    private updateDescription = async (req: Request, res: Response) => {
        try {
            if (req.user) {
                await this.settingService.updateDescription(req.user["id"], req.body.description);
                res.json({ result: true });
            }
        }
        catch (e) {
            res.status(404).json({ result: 'description not found' });
            console.error('error is found in updateDescription function...');
            console.error(e.message);
        }
    }

    private addPictures = async (req: Request, res: Response) => {
        try {
            if (req.user) {
                await this.settingService.addPictures(req.user["id"], req.file != null ? req.file.filename : undefined);
                res.redirect('/');
            }
        }
        catch (e) {
            res.status(404).json({ result: 'pictures not found' });
            console.error('error is found in addPictures function...');
            console.error(e.message);
        }
    }

    private deletePictures = async (req: Request, res: Response) => {
        try {
            if (req.user) {
                await this.settingService.deletePictures(req.user["id"], req.file != null ? req.file.filename : undefined);
                res.json({ result: true });
            }
        }
        catch (e) {
            res.status(404).json({ result: false });
            console.error('error is found in deletePictures function...');
            console.error(e.message);
        }
    }
}