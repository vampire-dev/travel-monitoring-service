import {Socket} from 'net';

export interface ICommand {
    model: string;
    serial: string;
    state: string;
    body: any[];
}

export interface IState {
    handshake: string;
    gps: string;
    lbs: string;
    linkOk: string;
    smsOk: string;
}

export interface IConnection {
    socket: Socket;
    device: any;
}