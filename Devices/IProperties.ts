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
    syncDevice: string;
    syncTime: string;
    syncSms: string;
    terminalHeartRate: string;
}

export interface IConnection {
    socket: Socket;
    device: any;
}

export interface IFeature {
    device: any;
    type: string;
    geometry: {
        type: string;
        coordinates: [number, number];
    };
    properties: {
        speed: number;
        transmissionMode: string;
        positioningMode: string;
        direction: number;
        batteryLevel: number;
        signalQuality: number;
        positionType: string;
        date: Date;
    };
}