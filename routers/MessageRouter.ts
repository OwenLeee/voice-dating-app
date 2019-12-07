import * as express from 'express';
import { Request, Response } from 'express';
import { MessageService } from "../services/MessageService";

export class MessageRouter {

    constructor(private messageService: MessageService) { }

    router() {
        const router = express.Router();
        router.post('/addMessage', this.addMessage);
        router.get('/getMessage', this.getMessage);
        return router;
    }

    private addMessage = async (req: Request, res: Response) => {
        try {
            if (req.user) {
                await this.messageService.addMessage(req.body.message, req.body.chatID, req.user["id"], req.body.userID);
                res.json({ result: true });
            } else {
                res.status(400);
            };
        }
        catch (e) {
            res.json({ result: false }).status(500);
            console.error('error is found in addMessage function...');
            console.error(e.message);
        }
    }

    private getMessage = async (req: Request, res: Response) => {
        try {
            if (req.user) {
                await this.messageService.getMessageByUserID(req.user["id"], req.body.userID);
                res.json({ result: true });
            } else {
                res.status(400);
            }
        }
        catch (e) {
            res.json({ result: false }).status(500);
            console.error('error is found in getMessage function...');
            console.error(e.message);
        }
    }
}