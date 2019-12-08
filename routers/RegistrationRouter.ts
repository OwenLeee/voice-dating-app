import * as express from "express";
import * as multer from "multer";
import * as path from "path";
import { Request, Response } from "express";
import { RegistrationService } from "../services/RegistrationService";


export class RegistrationRouter {

    constructor(private registrationService: RegistrationService) { }
    
    router() {
        const router = express.Router();

        const storage = multer.diskStorage({
            destination: "./pic-test",
            filename: function (req, file, cb) {
                cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
            }
        });

        const upload = multer({ dest:'pic-test/', storage: storage });

        router.post('/uploadInfo', upload.single("uploadIcon"), this.uploadInfo);
        
        return router;
    }

    private uploadInfo = async (req: Request, res: Response) => {
        try {
            if (req.user) {
                await this.registrationService.uploadInfo(req.user["id"], req.body.uploadInfo);
                res.json({ result: true });
                res.send({ret_code: '0'});
                console.log(req.file);
            }
        } catch (error) {
            res.status(404).json({ result: false });
            console.log(error.message);
        }
    }
}