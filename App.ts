import * as express from 'express';
import * as bodyParser from 'body-parser';
import db from './Models/Db';
import setting from './Setting';

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