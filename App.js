"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const Db_1 = require('./Models/Db');
const Setting_1 = require('./Setting');
const Socket_1 = require('./Socket');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.listen(Setting_1.default('port'), (error) => {
    console.log('Travel Monitoring Service is running on port %s', Setting_1.default('port'));
    Db_1.default.connect(Setting_1.default('dsn'));
    console.log('Travel Monitoring DB is running');
});
app.get('/', (req, res) => {
    res.status(200).send('Hello Server');
});
new Socket_1.default('MT300');
new Socket_1.default('V01');
//# sourceMappingURL=App.js.map