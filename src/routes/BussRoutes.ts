import express from 'express';
import { BussController } from '../controllers/BussController';

export class BussRoutes {
    router: express.Router;
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    routes() {

        //Get all busses ..route
        this.router.get('/getBusses', async (req, res, next) => {
            try {
                var busses = await new BussController().GetBusses();
                res.status(200).json(
                    {
                        Busses: busses
                    }
                ).end()
            } catch (error) {
                next(error);
            }
        });

        //Adding buss to the collection ..route
        this.router.post('/addBuss', async (req, res, next) => {
            try {
                var added_buss = await new BussController().AddBuss(req.body);
                res.status(200).json({
                    Added_Buss: added_buss
                }).end()
            } catch (error) {
                next(error);
            }
        });

        //Deleting buss from the collection ..route
        this.router.delete('/deleteBuss', async (req, res, next) => {
            try {
                var deleted_buss = await new BussController().DeleteBuss(req.body);
                res.status(200).json({
                    Deleted_Buss: deleted_buss
                }).end()
            } catch (error) {
                next(error);
            }
        });

        //Updating buss in the collection ..route
        this.router.put('/updateBuss', async (req, res, next) => {
            try {
                var updated_buss = await new BussController().UpdateBuss(req.body);
                res.status(200).json({
                    Updated_Buss: updated_buss
                }).end()
            } catch (error) {
                next(error);
            }
        });
    }
}
export const BussRoutesApi = new BussRoutes().router;