import {IConnection, ICommand, IState} from './IProperties';
import DeviceController from '../Controllers/DeviceController';

const co = require('co');

export default class BaseDevice {
    connections: IConnection[];
    state: IState;

    constructor() {
        this.connections = [];
    }

    run(connection: IConnection): void {
        connection.socket.on('data', (data) => {
            if (!connection.device) {
                connection.socket.emit('auth', data);
                return;
            }

            var command = this.parse(data);
            this.onDataReceived(command, connection);
        });

        connection.socket.on('auth', (data) => {
            var command = this.parse(data);
            this.auth(command, connection);
        });

        connection.socket.on('log', (message) => {
            console.log(message);
        });

        connection.socket.on('disconnected', () => {

        });
    }

    auth(command: ICommand, connection: IConnection): void {
        var self = this;

        co(function* () {
            var device = yield DeviceController.getBySerial(command.model, command.serial);

            if (!device) {
                connection.socket.emit('log', 'Device is not authenticated');
                return;
            }

            connection.device = device;
            self.connections.push(connection);
            self.onDataReceived(command, connection);
        });
    }

    onDataReceived(command: ICommand, connection: IConnection): void {
        switch (command.state) {
            case this.state.handshake:
                this.onHandshake(command, connection);
                break;
            case this.state.gps:
                this.onGps(command, connection);
                break;
            case this.state.lbs:
                this.onLbs(command, connection);
                break;
            case this.state.linkOk:
                this.onLinkOk(command, connection);
                break;
            case this.state.smsOk:
                this.onSmsOk(command, connection);
                break;
            default:
                connection.socket.emit('log', 'Command is not found');
        }
    }

    onHandshake(command: ICommand, connection: IConnection): void {
        throw "Method is not implemented";
    }

    onGps(command: ICommand, connection: IConnection): void {
        throw "Method is not implemented";
    }

    onLbs(command: ICommand, connection: IConnection): void {
        throw "Method is not implemented";
    }

    onLinkOk(command: ICommand, connection: IConnection): void {
        throw "Method is not implemented";
    }

    onSmsOk(command: ICommand, connection: IConnection): void {
        throw "Method is not implemented";
    }

    parse(data: any): ICommand {
        throw "Method is not implemented";
    }

    find(id: any): any {
        return this.connections.filter(e => e.device._id.toString() === id)[0];
    }

    remove(device: any): void {
        var connectionDevice = this.connections.map(e => e.device).indexOf(device);

        if (connectionDevice)
            this.connections.splice(connectionDevice, 1);
    }
}