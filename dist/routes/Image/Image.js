"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../../controllers");
exports.router = express_1.default.Router();
exports.router.get('/:imagePath', function (req, res) {
    controllers_1.imageController.resizeImage(req, res);
});
