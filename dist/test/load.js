"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var numberOfRequests = process.argv[2] || 100;
var startTime = new Date().getTime();
var _loop_1 = function (i) {
    http_1.default.get("http://localhost:4000/image/4.jpg?size=700x" + (i + 1), function () {
        var executionTime = new Date().getTime() - startTime;
        console.log("request " + i + ": " + executionTime);
    });
};
for (var i = 0; i < numberOfRequests; i++) {
    _loop_1(i);
}
console.log("STARTED " + numberOfRequests + " REQUESTS");
