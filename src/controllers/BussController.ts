import CustomError from '../utills/Error';
import { Controller, Delete, SuccessResponse } from '@tsoa/runtime';
import { Get, Route, Tags, Put, Post, Body } from "tsoa";
import { IGetBussResponse } from '../types/responses/IBUSSResponse';
import { BussClass } from '../repositories/BussRepository';
import { IAddBussRequest, IDeleteBussRequest, IUpdateBussRequest } from '../types/requests/IBUSSRequest';

@Route('/buss')
@Tags('Buss Crud')
export class BussController extends Controller {
    constructor() {
        super()
    }

    /**
    * Add buss in collection.
    * returns Added buss
    * @summary "Open API to Add Buss in collection" 
    */
    @Post('/addBuss')
    @SuccessResponse(200, 'Buss added successfully')
    async AddBuss(@Body() buss: IAddBussRequest): Promise<IGetBussResponse> {
        const added_buss: IGetBussResponse = <IGetBussResponse>await new BussClass().AddNewBuss(buss);
        if (!added_buss)
            throw new CustomError(400, 'Cannot add bus to collection', 'Bad Request');
        return <IGetBussResponse>added_buss;
    }

    /**
    * Get all added busses.
    * returns All busses
    * @summary "Open API to get all listed Busses" 
    */
    @Get('/getBusses')
    async GetBusses(): Promise<IGetBussResponse[]> {
        const busses: IGetBussResponse[] = <IGetBussResponse[]>await new BussClass().GetBusses();
        if (!busses || busses.length == 0)
            throw new CustomError(404, 'No listed busses in collection', 'Not Found');
        return <IGetBussResponse[]>busses;
    }

    /**
    * Update buss using buss _id.
    * returns Updated Bus
    * @summary "Open API to update Buss in collection" 
    */
    @Put('/updateBuss')
    @SuccessResponse(200, 'Buss updated successfully')
    async UpdateBuss(@Body() buss: IUpdateBussRequest): Promise<IGetBussResponse> {
        const updated_buss: IGetBussResponse = <IGetBussResponse>await new BussClass().UpdateBuss(buss);
        if (!updated_buss)
            throw new CustomError(400, 'No buss to update', 'Bad Request');
        return <IGetBussResponse>updated_buss;
    }

    /**
    * Delete buss using buss _id
    * returns deleted bus
    * @summary "Open API to Delete Buss in collection" 
    */
    @Delete('/deleteBuss')
    @SuccessResponse(200, 'Buss deleted successfully')
    async DeleteBuss(@Body() buss: IDeleteBussRequest): Promise<IGetBussResponse> {
        const deleted_buss: IGetBussResponse = <IGetBussResponse>await new BussClass().DeleteBuss(buss);
        if (!deleted_buss)
            throw new CustomError(400, 'No buss to delete', 'Bad Request');
        return <IGetBussResponse>deleted_buss;
    }

}