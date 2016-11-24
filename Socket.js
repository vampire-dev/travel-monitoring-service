"use strict";
const Setting_1 = require('./Setting');
class Socket {
    constructor(model) {
        var port = Setting_1.default('device')[model];
        if (!port) {
            console.log('Device port is not found');
            return;
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Socket;
//# sourceMappingURL=Socket.js.map