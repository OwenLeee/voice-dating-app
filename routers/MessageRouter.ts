// import * as express from 'express';
// import { Request, Response } from 'express';
// import { MessageService } from "../services/MessageService";

// export class MessageRouter {

//     constructor(private messageService: MessageService) { }

//     router() {
//         const router = express.Router();
//         router.post('/', this.addMessage);
//         router.get('/:id', this.getMessage);
//         return router;
//     }

//     private addMessage = async (req: Request, res: Response) => {
//         try {
//             if (req.user) {
//                 await this.messageService.addMessage(req.body.message, req.body.chatID, req.user["id"], req.body.userID);
//                 res.json({ result: true });
//             } else {
//                 res.status(400);
//             };
//         }
//         catch (e) {
//             res.json({ result: false }).status(500);
//             console.error('error is found in addMessage function...');
//             console.error(e.message);
//         }
//     }

//     private getMessage = async (req: Request, res: Response) => {
//         try {
//             console.log('1', req.param);
//             console.log('2', req.params);
//             res.json(await this.messageService.getMessageByUserID((req.user as any).id, (req.params as any).id));
//         }
//         catch (e) {
//             res.json({ result: false }).status(500);
//             console.error('error is found in getMessage function...');
//             console.error(e.message);
//         }
//     }
// }