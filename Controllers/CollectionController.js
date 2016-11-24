"use strict";
const Schema_1 = require('../Models/Schema');
const BaseController_1 = require('./BaseController');
const co = require('co');
class CollectionController extends BaseController_1.default {
    constructor() {
        super(Schema_1.default.collections, ['device']);
    }
    createParameter(query) {
        var parameter = {};
        if (query['model'])
            parameter['model'] = new RegExp(query['model'], 'i');
        if (query['serial'])
            parameter['serial'] = new RegExp(query['serial'], 'i');
        return parameter;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new CollectionController();
//# sourceMappingURL=CollectionController.js.map