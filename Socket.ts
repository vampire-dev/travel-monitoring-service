import * as net from 'net';
import setting from './Setting';
import {IConnection} from './Devices/IProperties';
import BaseDevice from './Devices/BaseDevice';

export default class Socket {
    constructor(model: string) {
        var port = setting('device')[model];

        if (!port) {
            console.log('Device port is not found');
            return;
        }

        var device: BaseDevice = null;

        switch (model) {
            case 'MT300':
                net.createServer((socket) => {
                    var connection: IConnection = { socket: socket, device: null };
                    device.run(connection);
                }).listen(port, () => { console.log('Device MT300 is running on port %s', port) });
                break;
            case 'V01':
                net.createServer((socket) => {
                    var connection: IConnection = { socket: socket, device: null };
                    device.run(connection);
                }).listen(port, () => { console.log('Device V01 is running on port %s', port) })
                  .listen(port - 2, () => { console.log('Device V01 is running on port %s', port - 2)})
                  .listen(port + 4, () => { console.log('Device V01 is running on port %s', port + 4) })
                break;
            default:
                console.log('Device is not found');
                return;
        }
    }
}