import {Request, Response} from 'express';

import {Controller} from '../Controller';
import {LocalImageService} from '../../services/Image/LocalImageService';
import {RenderedImage} from '../../models/RenderedImage';
import {LocalImageCacheService} from '../../services/Image/LocalImageCacheService';

export class ReportController extends Controller {
    imageService: LocalImageService;

    constructor () {
        super();
        this.imageService = new LocalImageService();
    }
    public async getReport (req: Request, res: Response): Promise<void> {
        try{
            const localImageCacheService = await LocalImageCacheService.init();
            const [
                cacheHits,
                cacheMissed,
                originalImages,
                resizedImages,
                {qLength}
            ]  = await Promise.all([
                new RenderedImage().count({'fromCache': true}),
                new RenderedImage().count({'fromCache': false}),
                this.imageService.countOriginalImages(),
                this.imageService.countResizedImages(),
                localImageCacheService.qStatus(),
            ]);
            this.renderJson(res, {originalImages, resizedImages, cacheHits,cacheMissed, caching: qLength});
        }catch(e) {
            this.renderError(res, e);
        }

    }
}