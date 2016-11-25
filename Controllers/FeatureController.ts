import schema from '../Models/Schema';
import BaseController from './BaseController';
import db from '../Models/Db';

const co = require('co');

class FeatureController extends BaseController {
    constructor() {
        super(schema.features, ['device']);
    }

    getByDevice(device: any): Promise<any> {
        return this.schema.findOne({ "device": db.objectId(device) }).exec();
    }

    save(data: any): Promise<any> {
        var schema = this.schema;

        return co(function* () {
            var existingEntity = yield schema.findOne({ "device": db.objectId(data.device) }).exec();

            if (!existingEntity) {
                var entity = new schema(data);
                return entity.save();
            }

            return schema.update({ "_id": existingEntity._id }, data).exec();
        });
    }

    createParameter(query: any): any {
        var parameter = {};

        if (query['device'])
            parameter['device'] = db.objectId(query['device']);

        return parameter;
    }
}

export default new FeatureController();