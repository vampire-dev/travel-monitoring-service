import {Socket} from 'net';

export interface ICommand {
    model: string;
    serial: string;
    body: any[];
}

export interface IState {
    onHandshake: string;
    onGps: string;
    onLbs: string;
    onLinkOK: string;
    onsmsOK: string;
}

export interface IConnection {
    socket: Socket;
    device: any;
}