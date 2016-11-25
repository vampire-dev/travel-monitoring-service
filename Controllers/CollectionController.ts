import db from '../Models/Db';
import schema from '../Models/Schema';
import BaseController from './BaseController';
const co = require('co');

class CollectionController extends BaseController {
    constructor() {
        super(schema.collections, ['device']);
    }

    getByDevice(device: any): Promise<any> {
        return this.schema.findOne({ "device": db.objectId(device) }).exec();
    }

    getAggregates(query: any): any {
        var dateBetween = {};

        if (query.from && query.to)
            dateBetween["features.properties.date"] = { "$gte": new Date(query.from), "$lte": new Date(query.to) };

        return this.schema.aggregate([
            { "$match": { "device": db.objectId(query.device) } },
            { "$unwind": "$features" },
            { "$match": dateBetween }
        ]).exec();
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