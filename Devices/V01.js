"use strict";
const BaseDevice_1 = require('./BaseDevice');
class V01 extends BaseDevice_1.default {
    constructor() {
        super();
        this.state = {
            handshake: '#@H00@#',
            gps: '#@H02@#',
            lbs: '#@H03@#',
            syncDevice: '#@H01@#',
            syncTime: '#@H20@#',
            syncSms: '#@H06@#'
        };
        this.positionType = {
            0: 'First positioning',
            1: 'Cycle positioning',
            2: 'Active positioning',
            3: 'SOS positioning',
            4: 'Get position info',
            5: 'Fixed positining',
            6: 'Realtime positining',
            7: 'Shake for positioning',
            8: 'Watch removal alert',
            9: 'Photo take positioning'
        };
    }
    onHandshake(command, connection) {
        var replyCommand = 'ServiceIP:' + connection.device.ip + ',' + connection.device.port + ';'
            + String.fromCharCode(0x01, 0x01, 0x01);
        connection.socket.write(replyCommand);
        connection.socket.emit('log', 'Server has sent ' + replyCommand);
    }
    onLinkOK(command, connection) {
        var replyCommand = 'Link:OK' + String.fromCharCode(0x01, 0x01, 0x01);
        connection.socket.write(replyCommand);
        connection.socket.emit('log', 'Server has sent ' + replyCommand);
    }
    onSyncSms(command, connection) {
        var replyCommand = 'SMS:OK' + String.fromCharCode(0x01, 0x01, 0x01);
        connection.socket.write(replyCommand);
        connection.socket.emit('log', 'Server has sent ' + replyCommand);
    }
    onSyncTime(command, connection) {
        var date = new Date();
        var replyCommand = 'Time:' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
            + ',' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ';' + String.fromCharCode(0x01, 0x01, 0x01);
        connection.socket.write(replyCommand);
        connection.socket.emit('log', 'Server has sent ' + replyCommand);
    }
    parse(data) {
        var commands = data.toString().split(';');
        return {
            model: 'V01',
            serial: commands[1],
            state: commands[0],
            body: commands.slice(2, commands.length - 1)
        };
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = V01;
//# sourceMappingURL=V01.js.map