import express, {Request, Response} from 'express';
import {imageController} from '../../controllers';

export const router = express.Router();

router.get('/:imagePath*',(req: Request, res: Response) => {
    imageController.resizeImage(req, res);
});