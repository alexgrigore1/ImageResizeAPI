import {ImageResizeParams} from "../../models/ImageResizeParams";

export interface ImageService{
    getImage(sourceImage: string, resizeParams: ImageResizeParams | null): Promise<{ imageBuffer: Buffer|null; fromCache: boolean }>;
    countOriginalImages (): Promise<number>;
    countResizedImages (): Promise<number>;
}