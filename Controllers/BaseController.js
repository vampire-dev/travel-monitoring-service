"use strict";
const Db_1 = require('../Models/Db');
const co = require('co');
class BaseController {
    constructor(schema, populates) {
        this.schema = schema;
        this.populates = populates;
    }
    get(id) {
        var data = this.schema.findOne({ "_id": Db_1.default.objectId(id) });
        this.populate(data);
        return data.exec();
    }
    getAll(query) {
        var parameter = this.createParameter(query);
        var data = this.schema.find(parameter);
        this.populate(data);
        if (query['skip'] && query['limit'])
            data.skip(query['skip']).limit(query['limit']);
        return data.exec();
    }
    save(data) {
        var entity = new this.schema(data);
        if (!data['_id'])
            return entity.save();
        return this.schema.update({ "_id": entity._id }, entity).exec();
    }
    delete(id) {
        return co(function* () {
            var data = yield this.schema.findOne({ "_id": Db_1.default.objectId(id) }).exec();
            if (!data)
                throw new Error('Data is not found');
            return data.remove({ "_id": data._id }).exec();
        });
    }
    createParameter(query) {
        return {};
    }
    populate(data) {
        this.populates.forEach(populate => {
            data.populate(populate);
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BaseController;
//# sourceMappingURL=BaseController.js.map