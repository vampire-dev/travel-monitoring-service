import {IConnection, ICommand, IState} from './IProperties';
import BaseDevice from './BaseDevice';

export default class MT300 extends BaseDevice {
    status: any;
    mode: any;

    constructor() {
        super();

        this.state = {
            handshake: null,
            gps: 'MGV002',
            lbs: null,
            syncDevice: null,
            syncTime: null,
            syncSms: null
        }
    }

    parse(data: any): ICommand {
        var commands: any[] = data.toString().split(',');
        var state = commands[0].split('$')[1];

        return {
            model: 'MT300',
            serial: commands[1],
            state: state,
            body: commands.slice(2, commands.length - 1)
        }
    }
}