import {MongoService} from "../services/Persistance/MongoService";

export abstract class MongoModel {
    abstract COLLECTION_NAME: string;

    public created: number;

    constructor () {
        this.created = 0;
    }
    public async save (): Promise<void> {
        this.created = new Date().getTime();
        await MongoService.insertOne(this.COLLECTION_NAME, this);
    }

    public async count (query: object): Promise<number> {
        const cacheHits = await MongoService.count(this.COLLECTION_NAME, query);
        return cacheHits;
    }

}