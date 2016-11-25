"use strict";
const Schema_1 = require('../Models/Schema');
const BaseController_1 = require('./BaseController');
const Db_1 = require('../Models/Db');
const co = require('co');
class FeatureController extends BaseController_1.default {
    constructor() {
        super(Schema_1.default.features, ['device']);
    }
    getByDevice(device) {
        return this.schema.findOne({ "device": Db_1.default.objectId(device) }).exec();
    }
    save(data) {
        var schema = this.schema;
        return co(function* () {
            var existingEntity = yield schema.findOne({ "device": Db_1.default.objectId(data.device) }).exec();
            if (!existingEntity) {
                var entity = new schema(data);
                return entity.save();
            }
            return schema.update({ "_id": existingEntity._id }, data).exec();
        });
    }
    createParameter(query) {
        var parameter = {};
        if (query['device'])
            parameter['device'] = Db_1.default.objectId(query['device']);
        return parameter;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new FeatureController();
//# sourceMappingURL=FeatureController.js.map