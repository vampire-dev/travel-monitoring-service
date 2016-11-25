import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as net from 'net';
import db from './Models/Db';
import setting from './Setting';
import {IConnection} from './Devices/IProperties';
import BaseDevice from './Devices/BaseDevice';
import V01 from './Devices/V01';
import MT300 from './Devices/MT300';

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(setting('port'), (error) => {
    console.log('Travel Monitoring Service is running on port %s', setting('port'));
    db.connect(setting('dsn'));
    console.log('Travel Monitoring DB is running');
});

app.get('/', (req, res) => {
    res.status(200).send('Hello Server');
});

var v01port: number = parseInt(setting('device').V01);
var mt300port: number = parseInt(setting('device').MT300);

var createServer = (model: string, ports: number[]) => {
    var server = net.createServer((socket: net.Socket) => {
        var device: BaseDevice = null;

        switch (model) {
            case 'V01':
                device = new V01();
                break;
            case 'MT300':
                device = new MT300();
                break;
            default:
                console.log('Device is not found');
                return;
        }

        var connection: IConnection = { socket: socket, device: null };
        device.run(connection);
    });

    ports.forEach(port => {
        server.listen(port, () => { console.log('Device %s is running on port %s', model, port) });
    });
}

createServer('V01', [v01port, (v01port - 2), (v01port + 4)]);
createServer('MT300', [mt300port]);