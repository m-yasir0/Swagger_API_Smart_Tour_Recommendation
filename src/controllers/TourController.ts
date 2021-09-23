import CustomError from '../utills/Error';
import { Controller, SuccessResponse } from '@tsoa/runtime';
import { Post, Body, Route, Tags } from "tsoa";
import { IRegisterTourRequest } from '../types/requests/ITOURRequest';
import { IRegisterTourResponse } from '../types/responses/ITOURResponse';
import { TourClass } from '../repositories/TourRepository';
import { BussClass } from '../repositories/BussRepository';

@Route('/tour')
@Tags('Tour')
export class TourController extends Controller {
    response_alloted_busses: any;
    constructor(busses: any) {
        super()
        this.response_alloted_busses = busses;
    }

    /**
    * Register your tour request here.
    * returns registered tour
    * @summary "Open API to Register for a tour" 
    */
    @Post('/registerTour')
    @SuccessResponse(200, 'Tour registered successfully')
    async RegisterTour(@Body() tour: IRegisterTourRequest): Promise<IRegisterTourResponse> {
        var date: any;
        date = new Date(tour.TourDate);

        if (date.toString() != 'Invalid Date') {
            var available_busses = await new BussClass().GetAvailableBussesByDate(date);
            var alloted_busses = this.response_alloted_busses;

            const registered_tour: IRegisterTourResponse = <IRegisterTourResponse>await new TourClass().RegisterTour(tour, alloted_busses);
            if (!registered_tour)
                throw new CustomError(400, 'Cannot register tour', 'Bad Request');
            return <IRegisterTourResponse>registered_tour;
        }
        else
            throw new CustomError(400, 'Cannot register tour. Invalid TourDate entered', 'Bad Request')
    }


}