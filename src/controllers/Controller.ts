import {Response} from 'express';
export class Controller {
    protected renderImage (res: Response, image: Buffer): void{
        res.writeHead(200, {
            'Content-Type': 'image',
            'Content-Length': image.length
        });
        res.end(image);
    }

    protected renderError (res: Response, error: Error): void{
        console.error(error);
        res.status(400);
        res.json({message: error.message});
    }

    protected renderJson (res: Response, object: object): void{
        res.json(object);
    }

    protected renderNotFound (res: Response): void{
        res.status(404);
        res.send();
    }
}