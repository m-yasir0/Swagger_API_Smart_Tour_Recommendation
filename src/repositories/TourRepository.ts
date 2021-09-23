import { BussModel } from "../models/BussModel";
import { TourModel } from "../models/TourModel";

export class TourClass {
    async RegisterTour(tour: any, alloted_busses: any) {
        tour['BussesAlloted'] = alloted_busses;
        for (var i = 0; i < alloted_busses.length; i++) {
            var buss = await BussModel.findById(alloted_busses[i]);
            buss?.BussBookingDates.push(new Date(tour.TourDate));
            await buss?.save();
        }
        return (await new TourModel(tour).save()).populate('BussesAlloted');
    }
}