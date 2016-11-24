import * as mongoose from 'mongoose';

const create = (schemaName: string, collectionName: string, document) => {
    return mongoose.model(schemaName, new mongoose.Schema(document, {"versionKey": null, "collection": collectionName}));
}

const deviceSchema = {
    "model": { type: String, required: true },
    "serial": { type: String, required: true },
    "number": { type: String, required: true },
    "ip": { type: String, required: true },
    "port": { type: String, required: true },
    "upload": { type: Number, default: 10 }
}

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
}

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
}

export default {
    "Device": create('Device', 'devices', deviceSchema),
    "Feature": create('Feature', 'features', featureSchema),
    "Collection": create('Collection', 'collections', collectionSchema)
}