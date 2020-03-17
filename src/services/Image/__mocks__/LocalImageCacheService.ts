export class LocalImageCacheService {
    public static async init (): Promise<LocalImageCacheService> {
        return new LocalImageCacheService();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async sendMessage (obj: object): Promise<void> {
        return;
    }
}
