"use strict";
const express_1 = require('express');
const Setting_1 = require('./Setting');
const DeviceController_1 = require('./Controllers/DeviceController');
const FeatureController_1 = require('./Controllers/FeatureController');
const CollectionController_1 = require('./Controllers/CollectionController');
const router = express_1.Router();
const root = Setting_1.default('service');
const parseQuery = (req) => {
    return JSON.parse(req.query.query);
};
const auth = (req, res, next) => {
    var query = req.query.query ? parseQuery(req) : req.query;
    if (!query.token || query.token !== Setting_1.default('token'))
        return res.status(401).send('You are not authenticated');
    return next();
};
router.get(root + 'device/get', auth, (req, res) => {
    DeviceController_1.default.get(req.query.id).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.get(root + 'device/getAll', auth, (req, res) => {
    var query = parseQuery(req);
    DeviceController_1.default.getAll(query).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.get(root + 'feature/get', auth, (req, res) => {
    var query = parseQuery(req);
    FeatureController_1.default.get(query.id).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.get(root + 'feature/getAll', auth, (req, res) => {
    var query = parseQuery(req);
    FeatureController_1.default.getAll(query).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.get(root + 'feature/getByDevice', auth, (req, res) => {
    var query = parseQuery(req);
    FeatureController_1.default.getByDevice(query.device).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.get(root + 'collection/get', auth, (req, res) => {
    var query = parseQuery(req);
    CollectionController_1.default.get(query.id).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.get(root + 'collection/getAll', auth, (req, res) => {
    CollectionController_1.default.getAll(parseQuery(req)).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
router.get(root + 'collection/getAggregates', auth, (req, res) => {
    CollectionController_1.default.getAggregates(parseQuery(req)).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
//# sourceMappingURL=Services.js.map