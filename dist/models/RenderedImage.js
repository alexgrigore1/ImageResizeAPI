"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var MongoModel_1 = require("./MongoModel");
var RenderedImage = /** @class */ (function (_super) {
    __extends(RenderedImage, _super);
    function RenderedImage(imagePath, resizeParams, fromCache) {
        if (imagePath === void 0) { imagePath = ""; }
        if (resizeParams === void 0) { resizeParams = null; }
        if (fromCache === void 0) { fromCache = false; }
        var _this = _super.call(this) || this;
        _this.COLLECTION_NAME = "RenderedImages";
        _this.imagePath = imagePath;
        _this.resizeParams = resizeParams;
        _this.fromCache = fromCache;
        return _this;
    }
    return RenderedImage;
}(MongoModel_1.MongoModel));
exports.RenderedImage = RenderedImage;
