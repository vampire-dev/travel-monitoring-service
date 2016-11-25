"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const net = require('net');
const Db_1 = require('./Models/Db');
const Setting_1 = require('./Setting');
const V01_1 = require('./Devices/V01');
const MT300_1 = require('./Devices/MT300');
const Services_1 = require('./Services');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(Services_1.default);
app.listen(Setting_1.default('port'), (error) => {
    console.log('Travel Monitoring Service is running on port %s', Setting_1.default('port'));
    Db_1.default.connect(Setting_1.default('dsn'));
    console.log('Travel Monitoring DB is running');
});
app.get('/travel-monitoring-service', (req, res) => {
    res.status(200).send('Hello Server');
});
var v01port = parseInt(Setting_1.default('device').V01);
var mt300port = parseInt(Setting_1.default('device').MT300);
var createServer = (model, ports) => {
    var server = net.createServer((socket) => {
        var device = null;
        switch (model) {
            case 'V01':
                device = new V01_1.default();
                break;
            case 'MT300':
                device = new MT300_1.default();
                break;
            default:
                console.log('Device is not found');
                return;
        }
        var connection = { socket: socket, device: null };
        device.run(connection);
    });
    ports.forEach(port => {
        server.listen(port, () => { console.log('Device %s is running on port %s', model, port); });
    });
};
createServer('V01', [v01port, (v01port - 2), (v01port + 4)]);
createServer('MT300', [mt300port]);
//# sourceMappingURL=App.js.map