import Schema from '../Models/Schema';
import BaseController from './BaseController';
import Db from '../Models/Db';

const co = require('co');

class FeatureController extends BaseController {
    constructor() {
        super(Schema.Feature, ['device']);
    }

    getByDevice(device: any): Promise<any> {
        return this.schema.findOne({ "device": Db.objectId(device) }).exec();
    }

    save(data: any): Promise<any> {
        var schema = this.schema;

        return co(function* () {
            var entity = new schema(data);
            var existingEntity = yield schema.findOne({ "model": data.model, "serial": data.serial }).exec();

            if (!existingEntity)
                return entity.save();

            return this.schema.update({ "_id": existingEntity._id }, data).exec();
        });
    }

    createParameter(query: any): any {
        var parameter = {};

        if (query['device'])
            parameter['device'] = Db.objectId(query['device']);

        return parameter;
    }
}

export default new FeatureController();