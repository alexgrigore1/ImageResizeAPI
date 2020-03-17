import {REDIS_CONFIG} from "../../config/constants";
import RSMQWorker from "rsmq-worker";
import RedisSMQ from "rsmq";
import {promises as fsPromise} from "fs";
import sharp from "sharp";


const QUEUE_NAME = "LocalImageCacheServiceQueue";

export class LocalImageCacheService {
    private worker: RSMQWorker.Client;
    private rsmq: RedisSMQ;
    private static instance: LocalImageCacheService | null;

    private constructor () {
        this.worker = new RSMQWorker( QUEUE_NAME, {...REDIS_CONFIG, interval: 0} );
        this.rsmq = new RedisSMQ( REDIS_CONFIG );
    }

    public static async init (): Promise<LocalImageCacheService> {
        if(this.instance) return this.instance;

        this.instance = new LocalImageCacheService();
        try{
            await this.instance.rsmq.createQueueAsync({qname: QUEUE_NAME});
        } catch(e) {
            // don't panic if queue already exists
        }

        this.instance.worker.on( "message", async function ( msg, next ) {
            try{
                await LocalImageCacheService.processMessage(msg);
            }catch(e) {
                console.error("error-caching-image", e);
            }
            next();
        });
        // optional error listeners
        this.instance.worker.on('error', function ( err, msg ) {
            console.log( "ERROR", err, msg.id );
        });
        this.instance.worker.on('exceeded', function ( msg ) {
            console.log( "EXCEEDED", msg.id );
        });
        this.instance.worker.on('timeout', function ( msg ) {
            console.log( "TIMEOUT", msg.id, msg.rc );
        });
        this.instance.worker.start();
        return this.instance;
    }

    private static async processMessage (message: string): Promise<void> {
        const {cachedFilePath, fullImagePath, resizeParams} = JSON.parse(message);
        // ensure dir exists
        const cachedFilePathParts = cachedFilePath.split("/");
        cachedFilePathParts.pop();
        const path = cachedFilePathParts.join("/");
        await fsPromise.mkdir(path, {recursive: true});

        const resizeImageResult = sharp(fullImagePath).resize(resizeParams.width, resizeParams.height);
        await resizeImageResult.toFile(cachedFilePath);
    }

    public async sendMessage (obj: object): Promise<void> {
        const message = JSON.stringify(obj);
        await this.rsmq.sendMessageAsync({qname: QUEUE_NAME, message});
    }

    public async qStatus (): Promise<{qLength: number}> {
        const attrs = await this.rsmq.getQueueAttributesAsync({qname: QUEUE_NAME});
        return {
            qLength: attrs.msgs
        };
    }
}
