import sharp from "sharp";
import {promises as fsPromise} from "fs";
import {ROOT} from "../../config/constants";
import {ImageService} from "./ImageService";
import {ImageResizeParams} from "../../models/ImageResizeParams";
import {LocalImageCacheService} from "../../services/Image/LocalImageCacheService";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const rra = require('recursive-readdir-async');

export class LocalImageService implements ImageService {
    private SEED_ROOT = `${ROOT}/seed/images/`
    private IMAGE_CACHE_ROOT = `${ROOT}/cache/images/`

    private getFullImagePath (imagePath: string): string {
        return `${this.SEED_ROOT}${imagePath}`;
    }

    private getCachedFilePath (imagePath: string, resizeParams: ImageResizeParams): string {
        const [path, extension] = imagePath.split(".");
        return `${this.IMAGE_CACHE_ROOT}${path}/${resizeParams.height}x${resizeParams.width}.${extension}`;
    }

    private async readFile (fullImagePath: string): Promise<Buffer|null> {
        const imageBuffer = await fsPromise.readFile(fullImagePath)
            .catch(() => {
                // if not found, no worries
            });
        return imageBuffer || null;
    }

    private async handleNoResize (fullImagePath: string): Promise<{imageBuffer: Buffer|null; fromCache: boolean}> {
        const imageBuffer = await this.readFile(fullImagePath);
        return {imageBuffer, fromCache: false};
    }

    private async handleResizedImage (imagePath: string, resizeParams: ImageResizeParams): Promise<{imageBuffer: Buffer|null; fromCache: boolean}> {
        const fullImagePath = this.getFullImagePath(imagePath);
        const cachedFilePath = this.getCachedFilePath(imagePath, resizeParams);
        const cached = await this.readFile(cachedFilePath);
        if(cached) {
            return {imageBuffer: cached, fromCache: true};
        }

        // resize the image
        const originalImageBuffer = await this.readFile(fullImagePath);
        if(!originalImageBuffer) {
            return {imageBuffer: originalImageBuffer, fromCache: false};
        }
        const imageBuffer = await sharp(originalImageBuffer)
                .resize(resizeParams.width, resizeParams.height)
                .toBuffer();
        this.enqueueImageForCache(fullImagePath, cachedFilePath, resizeParams);
        return {imageBuffer, fromCache: false};
    }

    private async enqueueImageForCache (fullImagePath: string, cachedFilePath: string, resizeParams: ImageResizeParams): Promise<void> {
        const localImageCacheService = await LocalImageCacheService.init();
        await localImageCacheService.sendMessage({fullImagePath, cachedFilePath, resizeParams});
    }

    public async getImage (imagePath: string, resizeParams: ImageResizeParams|null): Promise<{ imageBuffer: Buffer|null; fromCache: boolean }> {
        const fullImagePath = this.getFullImagePath(imagePath);

        // no resize, just serve the initial image
        if(!resizeParams) {
            return this.handleNoResize(fullImagePath);
        }
        return this.handleResizedImage(imagePath, resizeParams);
    }

    public async countOriginalImages (): Promise<number> {
        const list = await rra.list(this.SEED_ROOT, {ignoreFolders: true});
        return list.length;
    }
    public async countResizedImages (): Promise<number> {
        const list = await rra.list(this.IMAGE_CACHE_ROOT, {ignoreFolders: true});
        return list.length;
    }
}