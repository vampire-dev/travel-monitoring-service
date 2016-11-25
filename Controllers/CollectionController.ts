import db from '../Models/Db';
import schema from '../Models/Schema';
import BaseController from './BaseController';
const co = require('co');

class CollectionController extends BaseController {
    constructor() {
        super(schema.collections, ['device']);
    }

    getByDevice(device: any): any {
        return this.schema.findOne({ "device": db.objectId(device) }).exec();
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

export default new CollectionController();