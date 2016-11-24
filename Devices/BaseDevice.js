"use strict";
const DeviceController_1 = require('../Controllers/DeviceController');
const co = require('co');
class BaseDevice {
    constructor() {
        this.connections = [];
    }
    run(connection) {
        connection.socket.on('data', (data) => {
            if (!connection.device) {
                connection.socket.emit('auth', data);
                return;
            }
            var command = this.parse(data);
            this.onDataReceived(command, connection);
        });
        connection.socket.on('auth', (data) => {
            var command = this.parse(data);
            this.auth(command, connection);
        });
        connection.socket.on('log', (message) => {
            console.log(message);
        });
        connection.socket.on('disconnected', () => {
        });
    }
    auth(command, connection) {
        var self = this;
        co(function* () {
            var device = yield DeviceController_1.default.getBySerial(command.model, command.serial);
            if (!device) {
                connection.socket.emit('log', 'Device is not authenticated');
                return;
            }
            connection.device = device;
            self.connections.push(connection);
            self.onDataReceived(command, connection);
        });
    }
    onDataReceived(command, connection) {
        switch (command.state) {
            case this.state.handshake:
                this.onHandshake(command, connection);
                break;
            case this.state.gps:
                this.onGps(command, connection);
                break;
            case this.state.lbs:
                this.onLbs(command, connection);
                break;
            case this.state.linkOk:
                this.onLinkOk(command, connection);
                break;
            case this.state.smsOk:
                this.onSmsOk(command, connection);
                break;
            default:
                connection.socket.emit('log', 'Command is not found');
        }
    }
    onHandshake(command, connection) {
        throw "Method is not implemented";
    }
    onGps(command, connection) {
        throw "Method is not implemented";
    }
    onLbs(command, connection) {
        throw "Method is not implemented";
    }
    onLinkOk(command, connection) {
        throw "Method is not implemented";
    }
    onSmsOk(command, connection) {
        throw "Method is not implemented";
    }
    parse(data) {
        throw "Method is not implemented";
    }
    find(id) {
        return this.connections.filter(e => e.device._id.toString() === id)[0];
    }
    remove(device) {
        var connectionDevice = this.connections.map(e => e.device).indexOf(device);
        if (connectionDevice)
            this.connections.splice(connectionDevice, 1);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BaseDevice;
//# sourceMappingURL=BaseDevice.js.map