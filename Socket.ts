import * as net from 'net';
import setting from './Setting';
import {IConnection} from './Devices/IProperties';

export default class Socket {
    constructor(model: string) {
        var port = setting('device')[model];

        if (!port) {
            console.log('Device port is not found');
            return;
        }
    }
}