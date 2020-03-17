"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sharp_1 = __importDefault(require("sharp"));
var fs_1 = require("fs");
var constants_1 = require("../../config/constants");
var LocalImageCacheService_1 = require("../../services/Image/LocalImageCacheService");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var rra = require('recursive-readdir-async');
var LocalImageService = /** @class */ (function () {
    function LocalImageService() {
        this.SEED_ROOT = constants_1.ROOT + "/seed/images/";
        this.IMAGE_CACHE_ROOT = constants_1.ROOT + "/cache/images/";
    }
    LocalImageService.prototype.getFullImagePath = function (imagePath) {
        return "" + this.SEED_ROOT + imagePath;
    };
    LocalImageService.prototype.getCachedFilePath = function (imagePath, resizeParams) {
        var _a = imagePath.split("."), path = _a[0], extension = _a[1];
        return "" + this.IMAGE_CACHE_ROOT + path + "/" + resizeParams.height + "x" + resizeParams.width + "." + extension;
    };
    LocalImageService.prototype.readFile = function (fullImagePath) {
        return __awaiter(this, void 0, void 0, function () {
            var imageBuffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs_1.promises.readFile(fullImagePath)
                            .catch(function () {
                            // if not found, no worries
                        })];
                    case 1:
                        imageBuffer = _a.sent();
                        return [2 /*return*/, imageBuffer || null];
                }
            });
        });
    };
    LocalImageService.prototype.handleNoResize = function (fullImagePath) {
        return __awaiter(this, void 0, void 0, function () {
            var imageBuffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readFile(fullImagePath)];
                    case 1:
                        imageBuffer = _a.sent();
                        return [2 /*return*/, { imageBuffer: imageBuffer, fromCache: false }];
                }
            });
        });
    };
    LocalImageService.prototype.handleResizedImage = function (imagePath, resizeParams) {
        return __awaiter(this, void 0, void 0, function () {
            var fullImagePath, cachedFilePath, cached, originalImageBuffer, imageBuffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fullImagePath = this.getFullImagePath(imagePath);
                        cachedFilePath = this.getCachedFilePath(imagePath, resizeParams);
                        return [4 /*yield*/, this.readFile(cachedFilePath)];
                    case 1:
                        cached = _a.sent();
                        if (cached) {
                            return [2 /*return*/, { imageBuffer: cached, fromCache: true }];
                        }
                        return [4 /*yield*/, this.readFile(fullImagePath)];
                    case 2:
                        originalImageBuffer = _a.sent();
                        if (!originalImageBuffer) {
                            return [2 /*return*/, { imageBuffer: originalImageBuffer, fromCache: false }];
                        }
                        return [4 /*yield*/, sharp_1.default(originalImageBuffer)
                                .resize(resizeParams.width, resizeParams.height)
                                .toBuffer()];
                    case 3:
                        imageBuffer = _a.sent();
                        this.enqueueImageForCache(fullImagePath, cachedFilePath, resizeParams);
                        return [2 /*return*/, { imageBuffer: imageBuffer, fromCache: false }];
                }
            });
        });
    };
    LocalImageService.prototype.enqueueImageForCache = function (fullImagePath, cachedFilePath, resizeParams) {
        return __awaiter(this, void 0, void 0, function () {
            var localImageCacheService;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, LocalImageCacheService_1.LocalImageCacheService.init()];
                    case 1:
                        localImageCacheService = _a.sent();
                        return [4 /*yield*/, localImageCacheService.sendMessage({ fullImagePath: fullImagePath, cachedFilePath: cachedFilePath, resizeParams: resizeParams })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LocalImageService.prototype.getImage = function (imagePath, resizeParams) {
        return __awaiter(this, void 0, void 0, function () {
            var fullImagePath;
            return __generator(this, function (_a) {
                fullImagePath = this.getFullImagePath(imagePath);
                // no resize, just serve the initial image
                if (!resizeParams) {
                    return [2 /*return*/, this.handleNoResize(fullImagePath)];
                }
                return [2 /*return*/, this.handleResizedImage(imagePath, resizeParams)];
            });
        });
    };
    LocalImageService.prototype.countOriginalImages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, rra.list(this.SEED_ROOT, { ignoreFolders: true })];
                    case 1:
                        list = _a.sent();
                        return [2 /*return*/, list.length];
                }
            });
        });
    };
    LocalImageService.prototype.countResizedImages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, rra.list(this.IMAGE_CACHE_ROOT, { ignoreFolders: true })];
                    case 1:
                        list = _a.sent();
                        return [2 /*return*/, list.length];
                }
            });
        });
    };
    return LocalImageService;
}());
exports.LocalImageService = LocalImageService;
