import * as mongoose from 'mongoose';
mongoose.Promise = global.Promise;

class Db {
    connect(dsn: string): mongoose.Mongoose {
        return mongoose.connect(dsn);
    }

    objectId(id: any): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId(id);
    }
}

export default new Db();