"use strict";
const BaseDevice_1 = require('./BaseDevice');
class MT300 extends BaseDevice_1.default {
    constructor() {
        super();
        this.state = {
            handshake: null,
            gps: 'MGV002',
            lbs: null,
            syncDevice: null,
            syncTime: null,
            syncSms: null
        };
    }
    parse(data) {
        var commands = data.toString().split(',');
        var state = commands[0].split('$')[1];
        return {
            model: 'MT300',
            serial: commands[1],
            state: state,
            body: commands.slice(2, commands.length - 1)
        };
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MT300;
//# sourceMappingURL=MT300.js.map