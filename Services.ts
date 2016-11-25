import {Request, Response, Router} from 'express';
import setting from './Setting';
import DeviceController from './Controllers/DeviceController';
import FeatureController from './Controllers/FeatureController';
import CollectionController from './Controllers/CollectionController';

const router = Router();
const root = setting('service');

const parseQuery = (req: Request) => {
    return JSON.parse(req.query.query);
}

const auth = (req: Request, res: Response, next: any) => {
    var query = req.query.query ? parseQuery(req) : req.query;

    if (!query.token || query.token !== setting('token'))
        return res.status(401).send('You are not authenticated');

    return next();
};

router.get(root + 'device/get', auth, (req: Request, res: Response) => {
    DeviceController.get(req.query.id).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

router.get(root + 'device/getAll', auth, (req: Request, res: Response) => {
    var query = parseQuery(req);
    DeviceController.getAll(query).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

router.get(root + 'feature/get', auth, (req: Request, res: Response) => {
    var query = parseQuery(req);
    FeatureController.get(query.id).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

router.get(root + 'feature/getAll', auth, (req: Request, res: Response) => {
    var query = parseQuery(req);
    FeatureController.getAll(query).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

router.get(root + 'feature/getByDevice', auth, (req: Request, res: Response) => {
    var query = parseQuery(req);
    FeatureController.getByDevice(query.device).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

router.get(root + 'collection/get', auth, (req: Request, res: Response) => {
    var query = parseQuery(req);
    CollectionController.get(query.id).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

router.get(root + 'collection/getAll', auth, (req: Request, res: Response) => {
    CollectionController.getAll(parseQuery(req)).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

router.get(root + 'collection/getAggregates', auth, (req: Request, res: Response) => {
    CollectionController.getAggregates(parseQuery(req)).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

export default router;