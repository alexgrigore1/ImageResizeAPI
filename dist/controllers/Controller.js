"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Controller = /** @class */ (function () {
    function Controller() {
    }
    Controller.prototype.renderImage = function (res, image) {
        res.writeHead(200, {
            'Content-Type': 'image',
            'Content-Length': image.length
        });
        res.end(image);
    };
    Controller.prototype.renderError = function (res, error) {
        console.error(error);
        res.status(400);
        res.json({ message: error.message });
    };
    Controller.prototype.renderJson = function (res, object) {
        res.json(object);
    };
    Controller.prototype.renderNotFound = function (res) {
        res.status(404);
        res.send();
    };
    return Controller;
}());
exports.Controller = Controller;
