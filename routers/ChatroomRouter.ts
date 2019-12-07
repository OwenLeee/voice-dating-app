import * as express from 'express';
import { Request, Response } from 'express';
import { ChatroomService } from "../services/ChatroomService";

export class ChatroomRouter {
    constructor(private chatroomService: ChatroomService) { }


    router() {
        const router = express.Router();
        router.post('/checkMatched', this.checkMatched);
        router.get('/findChatID', this.findChatRoomID);
        return router;
    }

    private checkMatched = async (req: Request, res: Response) => {
        try {
            if (req.user) {
                await this.chatroomService.checkMatched(req.user["id"], req.body.userID)
                res.json({ result: true });
            } else {
                res.status(400);
            }
        } catch (e) {
            res.json({ result: false }).status(500);
            console.error('error is found in checkMatched function...');
            console.error(e.message);
        }
    }

    private findChatRoomID = async (req: Request, res: Response) => {
        try {
            if (req.user) {
                res.json({ result: true });
                await this.chatroomService.findChatRoomID(req.user["id"], req.body.userID);
            } else {
                res.status(400);
            }
        } catch (e) {
            res.json({ result: false }).status(500);
            console.error('error is found in findChatRoomID function...');
            console.error(e.message);
        }
    }
}