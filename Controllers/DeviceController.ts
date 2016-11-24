import schema from '../Models/Schema';
import BaseController from './BaseController';

class DeviceController extends BaseController{
    constructor() {
        super(schema.devices, []);
    }

    getBySerial(model: string, serial: string) {
        return this.schema.findOne({ "model": model, "serial": serial }).exec();
    }

    createParameter(query: any): any {
        var parameter = {};

        if (query['model'])
            parameter['model'] = new RegExp(query['model'], 'i');

        if (query['serial'])
            parameter['serial'] = new RegExp(query['serial'], 'i');

        return parameter;
    }
}

export default new DeviceController();