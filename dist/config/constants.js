"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = process.env.PORT || 4000;
exports.ROOT = process.env.PWD || "/home/alex/projects/hoxton/image-resizer";
exports.MONGO_CONFIG = {
    user: 'root',
    password: 'mypass',
    host: 'mongo',
    port: 27017,
    db: "ImageResizer"
};
exports.REDIS_CONFIG = {
    host: "redis",
    port: 6379,
    ns: "rsmq"
};
