import express, {Request, Response} from 'express';
import {reportController} from '../../controllers';

export const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    reportController.getReport(req, res);
});