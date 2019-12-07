import * as express from "express";
import { Request, Response } from "express";
import { RegistrationService } from "../services/RegistrationService";

export class RegistrationRouter {

    constructor(private registrationService: RegistrationService) { }

    router() {
        const router = express.Router();
        router.post('/', this.uploadInfo);
        return router;
    }

    private uploadInfo = async (req: Request, res: Response) => {
        try {
            if (req.user) {
                res.json(await this.registrationService.uploadInfo);
            }
        } catch (error) {
            throw error;
        }
    }
}