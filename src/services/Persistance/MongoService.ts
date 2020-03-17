import {MongoClient, Db} from 'mongodb';
import {MONGO_CONFIG} from '../../config/constants';

export class MongoService {
    static dbConnection: Db;
    private static async acquireDbConnection (): Promise<void> {
        if(!this.dbConnection) {
            const url = `mongodb://${MONGO_CONFIG.user}:${MONGO_CONFIG.password}@${MONGO_CONFIG.host}:${MONGO_CONFIG.port}`;
            const mongoClient = await MongoClient.connect(url, {useUnifiedTopology: true});
            this.dbConnection = mongoClient.db(MONGO_CONFIG.db);
        }
    }

    public static async find (collectionName: string, query = {}): Promise<object[]> {
        await this.acquireDbConnection();
        const cursor = this.dbConnection.collection(collectionName).find(query);
        return cursor.toArray();
    }

    public static async insertOne (collectionName: string, obj: object): Promise<void> {
        await this.acquireDbConnection();
        await this.dbConnection.collection(collectionName).insertOne(obj);
    }

    public static async count (collectionName: string, query: object): Promise<number> {
        await this.acquireDbConnection();
        return this.dbConnection.collection(collectionName).countDocuments(query);
    }
}