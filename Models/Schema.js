"use strict";
const mongoose = require('mongoose');
const create = (schemaName, collectionName, document) => {
    return mongoose.model(schemaName, new mongoose.Schema(document, { "versionKey": null, "collection": collectionName }));
};
const deviceSchema = {
    "model": { type: String, required: true },
    "serial": { type: String, required: true },
    "number": { type: String, required: true },
    "ip": { type: String, required: true },
    "port": { type: String, required: true },
    "upload": { type: Number, default: 10 }
};
const featureSchema = {
    "device": { type: mongoose.Schema.Types.ObjectId, ref: 'Device' },
    "type": { type: String, default: 'Feature' },
    "geometry": {
        "type": { type: String, default: 'Point' },
        "coordinates": [{ type: Number, required: true }, { type: Number, required: true }]
    },
    "properties": {
        "speed": { type: Number, default: null },
        "transmissionMode": { type: String, default: null },
        "positioningMode": { type: String, default: null },
        "direction": { type: Number, default: null },
        "batteryLevel": { type: Number, default: null },
        "signalQuality": { type: Number, default: null },
        "positionType": { type: String, default: null },
        "date": { type: Date, required: true }
    }
};
const collectionSchema = {
    "device": { type: mongoose.Schema.Types.ObjectId, ref: 'Device' },
    "features": [{
            "type": { type: String, default: 'Feature' },
            "geometry": {
                "type": { type: String, default: 'Point' },
                "coordinates": [{ type: Number, required: true }, { type: Number, required: true }]
            },
            "properties": {
                "speed": { type: Number, default: null },
                "transmissionMode": { type: String, default: null },
                "positioningMode": { type: String, default: null },
                "direction": { type: Number, default: null },
                "batteryLevel": { type: Number, default: null },
                "signalQuality": { type: Number, default: null },
                "positionType": { type: String, default: null },
                "date": { type: Date, required: true }
            }
        }]
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "devices": create('Device', 'devices', deviceSchema),
    "features": create('Feature', 'features', featureSchema),
    "collections": create('Collection', 'collections', collectionSchema)
};
//# sourceMappingURL=Schema.js.map