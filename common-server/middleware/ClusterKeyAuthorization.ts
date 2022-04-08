import { ClusterKey as CLUSTER_KEY } from '../Config';
import {
    ExpressRequest,
    ExpressResponse,
    NextFunction,
} from '../utils/Express';

import { sendErrorResponse } from '../utils/Response';
import BadDataException from 'common/types/exception/BadDataException';

export default class ClusterKeyAuthorization {
    static async isAuthorizedService(
        req: ExpressRequest,
        res: ExpressResponse,
        next: NextFunction
    ) {
        let clusterKey;

        if (req.params && req.params['clusterKey']) {
            clusterKey = req.params['clusterKey'];
        } else if (req.query && req.query['clusterKey']) {
            clusterKey = req.query['clusterKey'];
        } else if (
            req.headers &&
            (req.headers['clusterKey'] || req.headers['clusterkey'])
        ) {
            // header keys are automatically transformed to lowercase
            clusterKey = req.headers['clusterKey'] || req.headers['clusterkey'];
        } else if (req.body && req.body.clusterKey) {
            clusterKey = req.body.clusterKey;
        } else {
            return sendErrorResponse(
                req,
                res,
                new BadDataException('Cluster key not found.')
            );
        }

        const isAuthorized = clusterKey === CLUSTER_KEY;

        if (!isAuthorized) {
            return sendErrorResponse(
                req,
                res,
                new BadDataException('Invalid cluster key provided')
            );
        }

        return next();
    }
}
