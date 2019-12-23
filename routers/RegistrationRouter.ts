import * as express from "express";
import { Request, Response } from "express";
import { RegistrationService } from "../services/RegistrationService";
import { pictureAndVoiceUpload } from "../pictureAndVoiceMulter";


export class RegistrationRouter {

    constructor(private registrationService: RegistrationService) { }

    router() {
        const router = express.Router();

        router.post('/uploadInfo', pictureAndVoiceUpload.fields([
            { name: 'voiceIntro', maxCount: 1 },
            { name: 'icon', maxCount: 1 },
            { name: 'image', maxCount: 10 }
        ]), this.uploadInfo);

        return router;
    }

    private uploadInfo = async (req: Request, res: Response) => {
        try {
            if (req.user) {
                await this.registrationService.uploadInfo(req.user["id"], req.files, req.body);
                res.json({ result: true });
            } else {
                res.json({ result: false});
            }
        } catch (error) {
            res.status(500).json({ message: "" });
            console.log(error.message);
        }
    }
}