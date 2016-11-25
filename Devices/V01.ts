import {IConnection, ICommand, IState, IFeature} from './IProperties';
import BaseDevice from './BaseDevice';

export default class V01 extends BaseDevice {
    positionType: any;

    constructor() {
        super();

        this.state = {
            handshake: '#@H00@#',
            gps: '#@H02@#',
            lbs: '#@H03@#',
            syncDevice: '#@H01@#',
            syncTime: '#@H20@#',
            syncSms: '#@H06@#'
        }

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
        }
    }

    onHandshake(command: ICommand, connection: IConnection): void {
        var replyCommand = 'ServiceIP:' + connection.device.ip + ',' + connection.device.port + ';'
            + String.fromCharCode(0x01, 0x01, 0x01);

        connection.socket.write(replyCommand);
        connection.socket.emit('log', 'Server has sent ' + replyCommand);
    }

    onLinkOK(command: ICommand, connection: IConnection): void {
        var replyCommand = 'Link:OK' + String.fromCharCode(0x01, 0x01, 0x01);
        connection.socket.write(replyCommand);
        connection.socket.emit('log', 'Server has sent ' + replyCommand);
    }

    onSyncSms(command: ICommand, connection: IConnection): void {
        var replyCommand = 'SMS:OK' + String.fromCharCode(0x01, 0x01, 0x01);
        connection.socket.write(replyCommand);
        connection.socket.emit('log', 'Server has sent ' + replyCommand);
    }

    onSyncTime(command: ICommand, connection: IConnection): void {
        var date = new Date();

        var replyCommand = 'Time:' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
            + ',' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ';' + String.fromCharCode(0x01, 0x01, 0x01);

        connection.socket.write(replyCommand);
        connection.socket.emit('log', 'Server has sent ' + replyCommand);
    }

    onLbs(command: ICommand, connection: IConnection): void {
        this.onLinkOK(command, connection);
    }

    onGps(command: ICommand, connection: IConnection): void {
        var body = command.body;
        var latSign = body[7].split('N').length > 1 ? 'N' : 'S';
        var lngSign = body[8].split('E').length > 1 ? 'E' : 'W';

        var lat = latSign === 'N' ? parseFloat(body[7].split('N')[1])
            : parseFloat(body[7].split('S')[1]) * -1;

        var lng = lngSign === 'E' ? parseFloat(body[8].split('E')[1])
            : parseFloat(body[8].split('W')[1]) * -1;

        var feature: IFeature = {
            device: connection.device._id,
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [lng, lat]
            },
            properties: {
                speed: body[9] === '' ? 0 : parseFloat(body[9]),
                transmissionMode: body[6] === 0 ? 'Realtime' : 'Delayed',
                positioningMode: body[5] === 'G' ? 'GPS' : body[5] === 'L' ? 'LBS' : 'Wifi',
                batteryLevel: parseInt(body[12]) / 100,
                direction: body[10] === '' ? 0 : parseFloat(body[10]),
                positionType: this.positionType[body[14]],
                signalQuality: body[13] === '' ? parseFloat(body[13]) : 0,
                date: new Date(body[2] + ' ' + body[3])
            }
        }

        this.savePosition(feature);
        this.onLinkOK(command, connection);
    }

    parse(data: any): ICommand {
        var commands = data.toString().split(';');

        return {
            model: 'V01',
            serial: commands[1],
            state: commands[0],
            body: commands.slice(2, commands.length - 1)
        }
    }
}