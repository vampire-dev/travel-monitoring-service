import {IConnection, ICommand, IState, IFeature} from './IProperties';
import DeviceController from '../Controllers/DeviceController';
import FeatureController from '../Controllers/FeatureController';
import CollectionController from '../Controllers/CollectionController';
const co = require('co');

export default class BaseDevice {
    connections: IConnection[];
    state: IState;

    constructor() {
        this.connections = [];
    }

    run(connection: IConnection): void {
        connection.socket.on('data', (data) => {
            console.log(data.toString());
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
        connection.socket.emit('log', 'Device ' + command.serial + ' has sent ' + command.body);

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
            case this.state.syncDevice:
                this.onLinkOk(command, connection);
                break;
            case this.state.syncSms:
                this.onSmsOk(command, connection);
                break;
            case this.state.syncTime:
                this.onSyncTime(command, connection);
                break;
            case this.state.terminalHeartRate:
                this.onLinkOk(command, connection);
                break;
            case this.state.transmitWifiData:
                this.onLinkOk(command, connection);
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

    onSyncTime(command: ICommand, connection: IConnection): void {
        throw "Method is not implemented";
    }

    parse(data: any): ICommand {
        throw "Method is not implemented";
    }

    savePosition(feature: IFeature): void {
        co(function* () {
            var collection = yield CollectionController.getByDevice(feature.device);

            if (collection) {
                var latestFeature = collection.features[collection.features.length - 1];

                var stationary = (latestFeature.geometry.coordinates[0] === feature.geometry.coordinates[0]
                    && latestFeature.geometry.coordinates[1] === feature.geometry.coordinates[1]);

                if (!stationary)
                    collection.features.push(feature);
            }
            else {
                collection = { device: feature.device, features: [feature] };
            }

            yield CollectionController.save(collection);
            yield FeatureController.save(feature);
        });
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