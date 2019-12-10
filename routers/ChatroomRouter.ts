import * as express from 'express';
import * as socketIO from 'socket.io';
import { Request, Response } from 'express';
import { ChatroomService } from "../services/ChatroomService";

export class ChatroomRouter {
    constructor(private chatroomService: ChatroomService, private io: socketIO.Server) { }


    router() {
        const router = express.Router();
        router.post('/checkMatched', this.checkMatched);
        router.get('/findChatID', this.findChatRoomID);
        router.get('/findContactInfo', this.findContactInfo);
        router.post('/', this.addMessage);
        router.get('/me', this.getSelfInfo);
        router.get('/:id', this.getMessage);
        
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

    private findContactInfo = async (req: Request, res: Response) => {
        try {
            res.json(await this.chatroomService.getUserInfoForContactList((req.user as any).id));
        } catch (e) {
            res.json({ result: false }).status(404);
            console.error('error is found in findContactInfo function...');
            console.error(e.message);
        }
    }

    private addMessage = async (req: Request, res: Response) => {
        try {
            if (this.chatroomService.checkMatched(req.body.userID, (req.user as any).id)) {
                const chatID = await this.chatroomService.findChatRoomID((req.user as any).id, req.body.userID);

                await this.chatroomService.addMessage(req.body.message, chatID, (req.user as any).id, req.body.userID);
                res.json({ result: true });
                this.io.to('' + req.body.userID).emit('clientReceive', req.body.message)
                this.io.to('' + (req.user as any).id).emit('clientReceive', req.body.message)
            }
            // this.io.sockets.emit('clientReceive', req.body.message);
        }
        catch (e) {
            res.json({ result: false }).status(500);
            console.error('error is found in addMessage function...');
            console.error(e.message);
        }
    }

    private getMessage = async (req: Request, res: Response) => {
        try {
            res.json(await this.chatroomService.getMessageByUserID((req.user as any).id, (req.params as any).id));
        }
        catch (e) {
            res.status(500).json({ result: false });
            console.error('error is found in getMessage function...');
            console.error(e.message);
        }
    }

    private getSelfInfo = async (req: Request, res: Response) => {
        try {
            res.json(await this.chatroomService.getSelfInfo((req.user as any).id));
        }
        catch (e) {
            res.status(500).json({ result: false });
            console.error('error is found in getSelfInfo function...');
            console.error(e.message);
        }
    }

}