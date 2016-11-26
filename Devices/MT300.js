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
            syncSms: null,
            terminalHeartRate: null,
            transmitWifiData: null
        };
    }
    onGps(command, connection) {
        var body = command.body;
        var dateString = parseInt(body[2].substr(4, 2)) + 2000 + '-' + body[2].substr(2, 2) + '-'
            + body[2].substr(0, 2) + ' ' + body[3].substr(0, 2) + ":" + body[3].substr(2, 2) + ":" + body[3].substr(4, 2);
        var latDeg = body[5].substr(0, 2);
        var latMin = body[5].substr(2, body[5].length);
        var lat = parseFloat(latDeg) + (parseFloat(latMin) / 60);
        if (body[6] === 'S')
            lat = lat * -1;
        var lngDeg = body[7].substr(0, 3);
        var lngMin = body[7].substr(3, body[7].length);
        var lng = parseFloat(lngDeg) + (parseFloat(lngMin) / 60);
        if (body[6] === 'W')
            lng = lng * -1;
        var feature = {
            device: connection.device._id,
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [lng, lat] },
            properties: {
                speed: body[13] === '' ? 0 : parseFloat(body[13]),
                transmissionMode: body[4] === 'S' ? 'Delayed' : 'Realtime',
                positioningMode: body[1] === 'A' ? 'Fixed' : 'Unfixed',
                batteryLevel: body[31] === '' ? 0 : parseInt(body[31]),
                direction: body[12] === '' ? 0 : parseFloat(body[12]),
                positionType: null,
                signalQuality: body[21] === '' ? 0 : parseFloat(body[21]),
                date: new Date(dateString)
            }
        };
        this.savePosition(feature);
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