import {IConnection, ICommand, IState, IFeature} from './IProperties';
import BaseDevice from './BaseDevice';

export default class MT300 extends BaseDevice {
    status: any;
    mode: any;

    constructor() {
        super();

        this.state = {
            handshake: null,
            gps: 'MGV002',
            lbs: null,
            syncDevice: null,
            syncTime: null,
            syncSms: null
        }
    }

    onGps(command: ICommand, connection: IConnection): void {
        var body: any[] = command.body;
        var dateString: string = parseInt(body[2].substr(4, 2)) + 2000 + '-' + body[2].substr(2, 2) + '-'
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

        var feature: IFeature = {
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
        }

        this.savePosition(feature);
    }

    parse(data: any): ICommand {
        var commands: any[] = data.toString().split(',');
        var state = commands[0].split('$')[1];

        return {
            model: 'MT300',
            serial: commands[1],
            state: state,
            body: commands.slice(2, commands.length - 1)
        }
    }
}