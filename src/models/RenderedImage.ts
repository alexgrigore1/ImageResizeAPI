import {ImageResizeParams} from "./ImageResizeParams";
import {MongoModel} from "./MongoModel";

export class RenderedImage extends MongoModel {
    COLLECTION_NAME = "RenderedImages";

    public imagePath: string;
    public resizeParams: ImageResizeParams | null;
    public fromCache: boolean;

    constructor (imagePath = "", resizeParams: ImageResizeParams | null = null, fromCache = false) {
        super();
        this.imagePath = imagePath;
        this.resizeParams = resizeParams;
        this.fromCache = fromCache;
    }
}