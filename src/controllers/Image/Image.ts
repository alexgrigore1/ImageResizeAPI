import {Request, Response} from 'express';

import {LocalImageService} from '../../services/Image/LocalImageService';
import {ImageService} from '../../services/Image/ImageService';
import {ImageResizeParams} from '../../models/ImageResizeParams';
import {Controller} from '../Controller';
import {RenderedImage} from '../../models/RenderedImage';

export class ImageController extends Controller {
    imageService: ImageService;

    constructor () {
        super();
        this.imageService = new LocalImageService();
    }

    /**
     *
     * @param imagePath
     * @param size Width x Height eg: 100x200
     */
    private static extractResizeParams (req: Request): {imagePath: string; resizeParams: ImageResizeParams|null} {
        const {imagePath} = req.params;
        const {size} = req.query;
        let resizeParams: ImageResizeParams|null = null;
        if(size) {
            const dimensions = size.split("x");
            const width = +dimensions[0];
            const height = +dimensions[1];
            resizeParams = new ImageResizeParams(width, height); // errors handled good enough by constructor for now
        }

        return {imagePath, resizeParams};
    }

    public async resizeImage (req: Request, res: Response): Promise<void> {
        try{
            const {imagePath, resizeParams} = ImageController.extractResizeParams(req);
            const {imageBuffer, fromCache} = await this.imageService.getImage(imagePath, resizeParams);
            if(!imageBuffer) {
                this.renderNotFound(res);
                return;
            }

            await new RenderedImage(imagePath, resizeParams, fromCache).save();
            this.renderImage(res, imageBuffer);
        }catch(e) {
            this.renderError(res, e);
        }
    }
}