import express from 'express';
import { TourController } from '../controllers/TourController';
import { Recommend } from '../middleware/RecommendationSystem';

export class TourRoutes {
    router: express.Router;
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    routes() {

        // Register new tour ..route
        this.router.post('/registerTour', Recommend, async (req: any, res, next) => {
            try {
                var tour = await new TourController(res.locals.busses).RegisterTour(req.body);
                res.status(200).json(
                    {
                        Registeration_Details: tour
                    }
                ).end()
            } catch (error) {
                next(error);
            }
        });
    }
}
export const TourRoutesApi = new TourRoutes().router;