"use strict";
const net = require('net');
const Setting_1 = require('./Setting');
class Socket {
    constructor(model) {
        var port = Setting_1.default('device')[model];
        if (!port) {
            console.log('Device port is not found');
            return;
        }
        var device = null;
        switch (model) {
            case 'MT300':
                net.createServer((socket) => {
                    var connection = { socket: socket, device: null };
                    device.run(connection);
                }).listen(port, () => { console.log('Device MT300 is running on port %s', port); });
                break;
            case 'V01':
                net.createServer((socket) => {
                    var connection = { socket: socket, device: null };
                    device.run(connection);
                }).listen(port, () => { console.log('Device V01 is running on port %s', port); })
                    .listen(port - 2, () => { console.log('Device V01 is running on port %s', port - 2); })
                    .listen(port + 4, () => { console.log('Device V01 is running on port %s', port + 4); });
                break;
            default:
                console.log('Device is not found');
                return;
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Socket;
//# sourceMappingURL=Socket.js.map