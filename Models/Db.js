"use strict";
const mongoose = require('mongoose');
class Db {
    connect(dsn) {
        return mongoose.connect(dsn);
    }
    objectId(id) {
        return mongoose.Types.ObjectId(id);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new Db();
//# sourceMappingURL=Db.js.map