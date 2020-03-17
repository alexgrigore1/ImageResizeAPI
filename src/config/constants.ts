export const PORT = process.env.PORT || 4000;
export const ROOT = process.env.PWD || "/home/alex/projects/hoxton/image-resizer";
export const MONGO_CONFIG = {
    user: 'root',
    password: 'mypass',
    host: 'mongo',
    port: 27017,
    db: "ImageResizer"
};
export const REDIS_CONFIG = {
    host:"redis",
    port: 6379,
    ns: "rsmq"
};