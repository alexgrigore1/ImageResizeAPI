"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function default_1(buffer) {
    return {
        resize: function (width, height) {
            return {
                toBuffer: function () { return "resized image"; }
            };
        }
    };
}
exports.default = default_1;
;
