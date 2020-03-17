"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var constants_1 = require("./config/constants");
var routes_1 = require("./routes");
var LocalImageCacheService_1 = require("./services/Image/LocalImageCacheService");
var app = express_1.default();
app.use(express_1.default.json());
app.use('/image', routes_1.imageRouter);
app.use('/report', routes_1.reportRouter);
app.get('/favicon.ico', function (req, res) { return res.sendStatus(204); });
app.listen(constants_1.PORT, function () {
    console.log("Server is listening on port " + constants_1.PORT);
});
LocalImageCacheService_1.LocalImageCacheService.init();
