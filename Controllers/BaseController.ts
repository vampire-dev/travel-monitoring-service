import {Model, Document} from 'mongoose';
import Db from '../Models/Db';

const co = require('co');

export default class BaseController{
    schema: any;
    populates: any[];

    constructor(schema: any, populates: any[]) {
        this.schema = schema;
        this.populates = populates;
    }

    get(id: any): Promise<any> {
        var data = this.schema.findOne({ "_id": Db.objectId(id) });
        this.populate(data);
        return data.exec();
    }

    getAll(query: any): Promise<any[]> {
        var parameter = this.createParameter(query);
        var data = this.schema.find(parameter);
        this.populate(data);

        if (query['skip'] && query['limit'])
            data.skip(query['skip']).limit(query['limit']);

        return data.exec();
    }

    save(data: any): Promise<any> {
        var entity = new this.schema(data);

        if (!data['_id'])
            return entity.save();

        return this.schema.update({ "_id": entity._id }, entity).exec();
    }

    delete(id: any): Promise<any> {
        return co(function* () {
            var data = yield this.schema.findOne({ "_id": Db.objectId(id) }).exec();

            if (!data)
                throw new Error('Data is not found');

            return data.remove({ "_id": data._id }).exec();
        });
    }

    createParameter(query: any): any {
        return {};
    }

    populate(data: any): void {
        this.populates.forEach(populate => {
            data.populate(populate);
        });
    }
}