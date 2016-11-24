"use strict";
const Schema_1 = require('../Models/Schema');
const BaseController_1 = require('./BaseController');
const Db_1 = require('../Models/Db');
const co = require('co');
class FeatureController extends BaseController_1.default {
    constructor() {
        super(Schema_1.default.Feature, ['device']);
    }
    getByDevice(device) {
        return this.schema.findOne({ "device": Db_1.default.objectId(device) }).exec();
    }
    save(data) {
        var schema = this.schema;
        return co(function* () {
            var entity = new schema(data);
            var existingEntity = yield schema.findOne({ "model": data.model, "serial": data.serial }).exec();
            if (!existingEntity)
                return entity.save();
            return this.schema.update({ "_id": existingEntity._id }, data).exec();
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